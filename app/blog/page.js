import { getAllItems, getAllTags } from "@/lib/content";
import CardGrid from "../components/CardGrid";
import Reveal from "../components/Reveal";

export const metadata = {
  title: "Blog",
  description: "Training advice, race prep, and running science without the hype.",
};

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function PostCard({ post }) {
  return (
    <a href={`/blog/${post.slug}`} className="card">
      <div className="card__meta">
        <span>{formatDate(post.date)}</span>
        <span>·</span>
        <span>{post.readTime} min read</span>
        {post.trending && <span className="badge badge-trail">Trending</span>}
      </div>
      <h3>{post.title}</h3>
      <p className="excerpt">{post.excerpt}</p>
      <div className="card__tags">
        {(post.tags || []).map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </a>
  );
}

export default function BlogIndex({ searchParams }) {
  const allPosts = getAllItems("posts");
  const tags = getAllTags("posts");

  const activeTag = searchParams?.tag;
  const trendingOnly = searchParams?.trending === "1";

  let posts = allPosts;
  if (trendingOnly) posts = posts.filter((p) => p.trending);
  if (activeTag) posts = posts.filter((p) => (p.tags || []).includes(activeTag));

  return (
    <main className="wrap">
      <Reveal>
        <div className="article-head">
          <h1>The Blog</h1>
          <p style={{ color: "var(--ink-soft)", maxWidth: "56ch" }}>
            Training plans, race-day prep, and the occasional myth-busting —
            written for runners training around real jobs and real schedules.
          </p>
        </div>
      </Reveal>

      <div className="filter-bar">
        <a href="/blog" className={`tag ${!activeTag && !trendingOnly ? "is-active" : ""}`}>All</a>
        <a href="/blog?trending=1" className={`tag ${trendingOnly ? "is-active" : ""}`}>Trending</a>
        {tags.map((tag) => (
          <a
            key={tag}
            href={`/blog?tag=${encodeURIComponent(tag)}`}
            className={`tag ${activeTag === tag ? "is-active" : ""}`}
          >
            {tag}
          </a>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="search-empty">No posts match that filter yet.</p>
      ) : (
        <CardGrid style={{ paddingBottom: 64 }}>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </CardGrid>
      )}
    </main>
  );
}
