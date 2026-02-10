#!/bin/bash

# Greenzone420 Loading Screen - FiveM Deployment Package Creator
# Erstellt ein sauberes Package OHNE package.json für FiveM Server

echo "=================================="
echo "FiveM Deployment Package Creator"
echo "=================================="
echo ""

# Check if dist exists
if [ ! -d "dist" ]; then
    echo "❌ ERROR: dist/ folder nicht gefunden!"
    echo "   Bitte erst builden: npm run build"
    exit 1
fi

# Check if dist/assets exists
if [ ! -d "dist/assets" ]; then
    echo "❌ ERROR: dist/assets/ nicht gefunden!"
    echo "   Bitte erst builden: npm run build"
    exit 1
fi

# Create deployment folder
DEPLOY_FOLDER="Ladebildschirm_FiveM"
echo "📦 Erstelle Deployment Package in: $DEPLOY_FOLDER/"
rm -rf "$DEPLOY_FOLDER"
mkdir -p "$DEPLOY_FOLDER"

# Copy only required files
echo "📋 Kopiere fxmanifest.lua..."
cp fxmanifest.lua "$DEPLOY_FOLDER/"

echo "📋 Kopiere dist/ folder..."
cp -r dist "$DEPLOY_FOLDER/"

echo ""
echo "✅ FERTIG! Deployment Package erstellt!"
echo ""
echo "=================================="
echo "FiveM Installation:"
echo "=================================="
echo ""
echo "1. Kopiere den Ordner '$DEPLOY_FOLDER/' nach:"
echo "   resources/$DEPLOY_FOLDER/"
echo ""
echo "2. Füge zu server.cfg hinzu:"
echo "   ensure $DEPLOY_FOLDER"
echo ""
echo "3. Server restart"
echo ""
echo "=================================="
echo "✅ Dateien im Package:"
echo "=================================="
find "$DEPLOY_FOLDER" -type f | sed 's|^|   |'
echo ""
echo "❌ KEIN package.json im Package!"
echo "❌ FiveM wird NICHT versuchen zu builden!"
echo ""
