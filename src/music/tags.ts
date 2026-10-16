/**
 * Reading a song file's title and artist from its tags (spec §11.4), so matching goes by
 * the real song, not the file name. The tag reader (music-metadata) is only loaded when
 * the player adds songs, so it costs nothing otherwise.
 */

export interface SongTags {
  title: string
  artist?: string
  album?: string
  seconds?: number
}

/** A best guess from the file name, for files without tags: "Artist - Title.mp3" or just "Title.mp3". */
export function tagsFromFileName(name: string): SongTags {
  const base = name.replace(/\.[a-z0-9]{2,5}$/i, '').trim()
  const parts = base.split(/\s+[-–—]\s+/)
  if (parts.length >= 2) {
    const last = parts.pop()!
    return { title: last.trim(), artist: parts.join(' - ').replace(/^\d{1,3}[\s.-]+/, '').trim() || undefined }
  }
  return { title: base }
}

export async function readTags(file: File): Promise<SongTags> {
  const fallback = tagsFromFileName(file.name)
  try {
    const { parseBlob } = await import('music-metadata')
    const { common, format } = await parseBlob(file, { duration: false, skipCovers: true })
    return {
      title: common.title?.trim() || fallback.title,
      artist: common.artist?.trim() || common.albumartist?.trim() || fallback.artist,
      album: common.album?.trim() || undefined,
      seconds: format.duration,
    }
  } catch {
    return fallback
  }
}
