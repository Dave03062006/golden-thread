# Hosting the music on Cloudflare R2

The game's music isn't kept in git: it's too big, and it changes separately from the
code. `npm run media` prepares it into the `media/` folder on your computer. For the
finished game, those files live on **Cloudflare R2**, a file host that charges nothing for
downloads. The game finds them through `VITE_MEDIA_URL`.

Level 1's music is about 120 MB. R2's free tier covers 10 GB of storage and millions of
downloads a month, so the game should stay free to host for a long time.

You only need to do steps 1 to 5 once.

## 1. Make a Cloudflare account and turn on R2

1. Sign up at [dash.cloudflare.com](https://dash.cloudflare.com/sign-up) (free).
2. In the left menu, open **R2 Object Storage** and choose **Purchase R2 Plan**.
   Cloudflare asks for a card even for the free tier. You're only charged if you go past
   the free allowance, which this game won't come close to.

## 2. Create the bucket

1. In **R2**, choose **Create bucket**.
2. Name it `golden-thread-media` (or another name; see step 5).
3. Leave the location on **Automatic** and create it.

## 3. Let browsers read it

The bucket is private at first. Make it readable by anyone:

1. Open the bucket, then **Settings**.
2. Under **Public access**, either:
   - **R2.dev subdomain → Allow**: the quickest way. You get an address like
     `https://pub-xxxx.r2.dev`. Cloudflare limits how fast it can serve, so it's for
     testing; or
   - **Custom Domains → Connect Domain**: the way to go for the real game, if you have a
     domain on Cloudflare (for example `media.yourgame.com`).
3. Copy the address. This is your `VITE_MEDIA_URL`.

## 4. Allow the game's website to play it (CORS)

The game sends the music through the browser's audio system, so the bucket must say which
websites may do that. In the bucket's **Settings → CORS policy**, choose **Add CORS
policy** and paste this, putting your game's address in place of the example:

```json
[
  {
    "AllowedOrigins": ["https://your-game-site.example", "http://localhost:4173", "http://localhost:5173"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["Range"],
    "ExposeHeaders": ["Content-Length", "Content-Range", "Accept-Ranges"],
    "MaxAgeSeconds": 86400
  }
]
```

The two `localhost` addresses let you try it from your own computer (`npm run preview`
and `npm run dev`).

## 5. Tell the project about it

Copy `.env.example` to two files (git ignores both):

- `.env.local`, with the bucket's name: `R2_BUCKET=golden-thread-media`
- `.env.production`, with its address: `VITE_MEDIA_URL=https://pub-xxxx.r2.dev`

## Uploading the music

Sign in to Cloudflare from the terminal once (it opens your browser):

```
npx wrangler login
```

Then, whenever the music changes:

```
npm run media             # prepare any new tracks
npm run media:upload      # send new or changed files to R2
```

`npm run media:upload -- --dry-run` lists what it would send without sending anything.
The upload only sends files that are new or changed, and it remembers what it sent in
`media/uploaded.json`.

## Checking it works

1. Open `VITE_MEDIA_URL` followed by `/music/creation-chaos.webm` in your browser. The
   music should play.
2. Run `npm run build` then `npm run preview`, open the game, and start Episode 1: the
   music should play. If it's silent, open the browser's console (F12). A message about
   **CORS** means step 4 needs your site's address added.
