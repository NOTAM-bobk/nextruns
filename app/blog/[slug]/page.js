import { notFound } from "next/navigation";
import { getAllSlugs, getItemBySlug, getRelated } from "@/lib/content";
import NewsletterForm from "../../components/NewsletterForm";

export async function generateStaticParams() {
  return getAllSlugs("posts").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = getItemBySlug("posts", params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostPage({ params }) {
  const post = getItemBySlug("posts", params.slug);
  if (!post) notFound();

  const related = getRelated("posts", post, 3);

  return (
    <main className="wrap">
      <article>
        <div className="article-head">
          <div className="article-head__meta">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
          <h1>{post.title}</h1>
          <div className="article-head__tags">
            {(post.tags || []).map((t) => (
              <a key={t} href={`/blog?tag=${encodeURIComponent(t)}`} className="tag">{t}</a>
            ))}
          </div>
        </div>

        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <section className="section">
        <div className="newsletter">
          <div>
            <h2>Enjoyed this one?</h2>
            <p>Get new posts and gear reviews once a week.</p>
          </div>
          <div>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="section__head">
            <h2>Related reading</h2>
          </div>
          <div className="grid grid-3" style={{ paddingBottom: 40 }}>
            {related.map((p) => (
              <a key={p.slug} href={`/blog/${p.slug}`} className="card">
                <div className="card__meta">
                  <span>{formatDate(p.date)}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="excerpt">{p.excerpt}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
