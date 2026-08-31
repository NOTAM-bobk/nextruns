import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function dirFor(type) {
  return path.join(CONTENT_ROOT, type);
}

function readSlugs(type) {
  const dir = dirFor(type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function estimateReadTime(markdown) {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Reads one content item (a blog post or a gear review) by its slug.
 * `type` is "posts" or "gear" — matches the folder name under /content.
 */
export function getItemBySlug(type, slug) {
  const filePath = path.join(dirFor(type), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const html = marked.parse(content);

  const item = {
    slug,
    type,
    html,
    readTime: estimateReadTime(content),
    ...data,
  };

  if (type === "gear" && !item.tags && item.category) {
    item.tags = [item.category];
  }

  return item;
}

/** All items of a type, newest first (posts) or alphabetical (gear). */
export function getAllItems(type) {
  const items = readSlugs(type)
    .map((slug) => getItemBySlug(type, slug))
    .filter(Boolean);

  if (type === "posts") {
    return items.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  return items.sort((a, b) => a.title.localeCompare(b.title));
}

export function getAllSlugs(type) {
  return readSlugs(type);
}

export function getTrending(limit = 4) {
  const posts = getAllItems("posts").filter((p) => p.trending);
  const gear = getAllItems("gear").filter((g) => g.trending);
  return [...posts, ...gear]
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, limit);
}

export function getAllTags(type) {
  const items = getAllItems(type);
  const tags = new Set();
  items.forEach((item) => (item.tags || []).forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function getAllCategories() {
  const items = getAllItems("gear");
  const cats = new Set();
  items.forEach((item) => item.category && cats.add(item.category));
  return Array.from(cats).sort();
}

/** Related items sharing at least one tag, excluding the item itself. */
export function getRelated(type, item, limit = 3) {
  const all = getAllItems(type).filter((i) => i.slug !== item.slug);
  const tags = new Set(item.tags || []);
  const scored = all
    .map((i) => ({
      item: i,
      score: (i.tags || []).filter((t) => tags.has(t)).length,
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.item);
}
