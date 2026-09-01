#!/bin/sh
# Renders the PNG icon set from public/favicon.svg.
# Uses rsvg-convert when available, then ImageMagick, then Inkscape.
# Run as: sh ./scripts/gen-icons.sh   (uploads lose the executable bit)
set -e
cd "$(dirname "$0")/.."
SVG=public/favicon.svg

render() {
  # $1 = output, $2 = size
  if command -v rsvg-convert >/dev/null 2>&1; then
    rsvg-convert -w "$2" -h "$2" "$SVG" -o "$1"
  elif command -v magick >/dev/null 2>&1; then
    magick -background none "$SVG" -resize "$2x$2" "$1"
  elif command -v convert >/dev/null 2>&1; then
    convert -background none "$SVG" -resize "$2x$2" "$1"
  elif command -v inkscape >/dev/null 2>&1; then
    inkscape "$SVG" --export-type=png --export-width="$2" --export-height="$2" --export-filename="$1"
  else
    echo "No SVG rasterizer found (rsvg-convert, ImageMagick, or Inkscape required)." >&2
    exit 1
  fi
}

render public/favicon-16.png 16
render public/favicon-32.png 32
render public/apple-touch-icon.png 180
render public/icon-192.png 192
render public/icon-512.png 512
# Multi-size .ico for legacy browsers (ImageMagick only)
if command -v magick >/dev/null 2>&1 || command -v convert >/dev/null 2>&1; then
  IM=$(command -v magick || command -v convert)
  "$IM" -background none "$SVG" -define icon:auto-resize=16,32,48 public/favicon.ico
fi
echo "Icon set rendered."
