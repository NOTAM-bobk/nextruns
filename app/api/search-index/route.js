import { NextResponse } from "next/server";
import { getAllItems } from "@/lib/content";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllItems("posts").map((p) => ({
    type: "posts",
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    tags: p.tags || [],
    date: p.date,
  }));

  const gear = getAllItems("gear").map((g) => ({
    type: "gear",
    slug: g.slug,
    title: g.title,
    subtitle: g.subtitle || "",
    excerpt: g.excerpt || "",
    tags: [g.category].filter(Boolean),
    date: g.date,
  }));

  return NextResponse.json([...posts, ...gear]);
}
