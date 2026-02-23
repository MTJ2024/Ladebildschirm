# GTA V Cinematic Background Videos

Place your GTA V cinematic camera videos here as `.mp4` files.

## Required Files

| File | Description |
|------|-------------|
| `bg1.mp4` | First cinematic camera sequence (~10s) |
| `bg2.mp4` | Second cinematic camera sequence (~10s) |
| `bg3.mp4` | Third cinematic camera sequence (~10s) |

## Requirements

- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920×1080 recommended
- **Total duration**: ~30 seconds across all clips (they loop endlessly)
- **Content**: GTA V Rockstar Editor cinematic camera rotations / flyovers

## How it works

- The loading screen plays the videos in sequence with smooth crossfade transitions
- A dark haze/mist overlay is applied on top for the cinematic effect
- Your neon UI design renders on top of everything
- If no videos are found, the loading screen falls back to the dark atmosphere background

## Tips

- Use GTA V's Rockstar Editor to capture slow cinematic camera rotations
- Night scenes with city lights work best with the neon overlay
- Keep clips short (8-12 seconds each) for smooth transitions
- Avoid fast camera movements — slow pans and rotations look best

## Important

After running `npm run build`, you must copy your video files into `html/videos/` since the build clears the html directory. Alternatively, place your videos here and they will be preserved if you avoid a clean build.
