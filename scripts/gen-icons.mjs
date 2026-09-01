import sharp from "sharp";
import { readFileSync } from "node:fs";
import path from "node:path";

const svgPath = path.join(process.cwd(), "public", "favicon.svg");
const svg = readFileSync(svgPath);

const targets = [
  ["public/favicon-16.png", 16],
  ["public/favicon-32.png", 32],
  ["public/apple-touch-icon.png", 180],
  ["public/icon-192.png", 192],
  ["public/icon-512.png", 512],
];

for (const [out, size] of targets) {
  await sharp(svg, { density: 300 }).resize(size, size).png().toFile(out);
  console.log(`wrote ${out} (${size}x${size})`);
}
