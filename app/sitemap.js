import { getAllItems } from "@/lib/content";

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const posts = getAllItems("posts");
  const gear = getAllItems("gear");

  const staticRoutes = ["", "/blog", "/gear", "/search"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
  }));

  const gearRoutes = gear.map((g) => ({
    url: `${base}/gear/${g.slug}`,
    lastModified: g.date ? new Date(g.date) : new Date(),
  }));

  return [...staticRoutes, ...postRoutes, ...gearRoutes];
}
