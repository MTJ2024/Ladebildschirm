<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Greenzone420 - Die Blüte des Feuers

FiveM Loading Screen for Greenzone420 Server

View your app in AI Studio: https://ai.studio/apps/drive/19zx446wW67vi-4Vx9zPwOnWRH2oX4Ya8

## FiveM Installation

1. Build the loading screen:
   ```bash
   npm install
   npm run build
   ```

2. Copy this entire folder to your FiveM `resources` directory

3. Add to your `server.cfg`:
   ```
   ensure Ladebildschirm
   ```

4. Restart your FiveM server

## Run Locally for Development

**Prerequisites:** Node.js (npm only, no yarn needed)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key (optional for quotes)

3. Run the dev server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Features

- Modern, bold design with large visual elements
- Fire-themed ritual circle animation
- Progressive loading stages
- FiveM compatible loadscreen
- No yarn required - npm only
