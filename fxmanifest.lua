fx_version 'cerulean'
game 'gta5'

author 'Greenzone420'
description 'GTA V Online Style Loading Screen - Greenzone420 | ESX Legacy'
version '1.0.0'

-- Loading Screen
loadscreen 'html/index.html'
loadscreen_cursor 'yes'
loadscreen_manual_shutdown 'yes'

-- Client script for ESX Legacy shutdown
client_script 'client.lua'

-- Files served via NUI
-- Images are loaded from CDN by default. To use local images instead,
-- place them in html/images/ and update the URLs in components/ImageBackground.tsx
files {
    'html/index.html',
    'html/assets/*',
    'html/images/*'
}
