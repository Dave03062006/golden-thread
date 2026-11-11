# Records the story's narration with Kokoro, a free neural voice (Apache-2.0), one MP3 per line.
#
#   EXPORT=1 npx vitest run src/screens/story/narration.export.test.ts   # lists the lines
#   python scripts/narrate.py                                            # records what's missing
#
# Needs: pip install kokoro-onnx soundfile, ffmpeg, and the model files kokoro-v1.0.onnx and
# voices-v1.0.bin (github.com/thewh1teagle/kokoro-onnx, release model-files-v1.0) in the folder
# named by KOKORO_MODELS (default: ~/kokoro). Lines already recorded are skipped, so it can be
# stopped and run again. The files go to media/voice/, uploaded with the music.
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

import soundfile as sf
from kokoro_onnx import Kokoro

VOICE = "am_michael"
SPEED = 0.9
MODELS = Path(os.environ.get("KOKORO_MODELS", Path.home() / "kokoro"))
OUT = Path("media/voice")

lines = json.loads((OUT / "lines.json").read_text(encoding="utf-8"))
todo = {name: text for name, text in lines.items() if not (OUT / f"{name}.mp3").exists()}
print(f"{len(lines)} lines, {len(todo)} to record", flush=True)
kokoro = Kokoro(str(MODELS / "kokoro-v1.0.onnx"), str(MODELS / "voices-v1.0.bin"))

with tempfile.TemporaryDirectory() as tmp:
    for i, (name, text) in enumerate(todo.items(), 1):
        samples, rate = kokoro.create(text, voice=VOICE, speed=SPEED, lang="en-us")
        wav = Path(tmp) / f"{name}.wav"
        sf.write(wav, samples, rate)
        # Mono MP3 at 48 kbps: clear speech, about 6 KB a second.
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav), "-ac", "1", "-b:a", "48k", str(OUT / f"{name}.mp3")], check=True)
        if i % 50 == 0 or i == len(todo):
            print(f"{i} of {len(todo)}", flush=True)
sys.exit(0)
