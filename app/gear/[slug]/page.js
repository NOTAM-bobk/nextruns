import { notFound } from "next/navigation";
import { getAllSlugs, getItemBySlug, getRelated } from "@/lib/content";
import NewsletterForm from "../../components/NewsletterForm";

export async function generateStaticParams() {
  return getAllSlugs("gear").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const item = getItemBySlug("gear", params.slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
  };
}

export default function GearPage({ params }) {
  const item = getItemBySlug("gear", params.slug);
  if (!item) notFound();

  const related = getRelated("gear", item, 3);

  return (
    <main className="wrap">
      <article>
        <div className="article-head">
          <div className="article-head__meta">
            <span className="badge">{item.category}</span>
            <span className="rating">★ {item.rating} / 5</span>
            {item.trending && <span className="badge badge-trail">Trending</span>}
          </div>
          <h1>{item.title}</h1>
          {item.subtitle && (
            <p style={{ color: "var(--ink-soft)", fontSize: "1.1rem" }}>{item.subtitle}</p>
          )}
        </div>

        <div className="gear-summary">
          <div className="gear-summary__box">
            <h3>What we liked</h3>
            <ul className="pros">
              {(item.pros || []).map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
          <div className="gear-summary__box">
            <h3>What could be better</h3>
            <ul className="cons">
              {(item.cons || []).map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32, flexWrap: "wrap" }}>
          <span className="gear-price">{item.price}</span>
          {item.buyUrl ? (
            <a href={item.buyUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer sponsored">
              Check price
            </a>
          ) : (
            <span style={{ fontSize: "0.85rem", color: "var(--ink-soft)" }}>
              Buy link not set yet
            </span>
          )}
        </div>

        <div className="prose" dangerouslySetInnerHTML={{ __html: item.html }} />
      </article>

      <section className="section">
        <div className="newsletter">
          <div>
            <h2>More gear, less guesswork</h2>
            <p>New reviews land in this list before they hit the blog.</p>
          </div>
          <div>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="section__head">
            <h2>Similar gear</h2>
          </div>
          <div className="grid grid-3" style={{ paddingBottom: 40 }}>
            {related.map((g) => (
              <a key={g.slug} href={`/gear/${g.slug}`} className="card">
                <div className="card__meta">
                  <span className="badge">{g.category}</span>
                  <span className="rating">★ {g.rating}</span>
                </div>
                <h3>{g.title}</h3>
                <p className="excerpt">{g.excerpt}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
