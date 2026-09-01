import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const svgPath = path.join(process.cwd(), "public", "favicon.svg");
const svg = readFileSync(svgPath);

const sizes = [16, 32, 48, 64];
const pngs = [];
for (const size of sizes) {
  const png = await sharp(svg, { density: 300 }).resize(size, size).png().toBuffer();
  pngs.push({ size, png });
}

// ICO container: 6-byte reserved+type, 2-byte count, then directory entries.
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);

const entries = [];
let offset = 6 + 16 * pngs.length;
const bodyParts = [];
for (const { size, png } of pngs) {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0); // width
  entry.writeUInt8(size === 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(offset, 12);
  entries.push(entry);
  bodyParts.push(png);
  offset += png.length;
}

const ico = Buffer.concat([header, ...entries, ...bodyParts]);
writeFileSync(path.join(process.cwd(), "public", "favicon.ico"), ico);
console.log(`wrote public/favicon.ico (${sizes.join(", ")})`);
