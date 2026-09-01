import { getAllItems, getTrending } from "@/lib/content";
import NewsletterForm from "./components/NewsletterForm";
import Reveal from "./components/Reveal";
import CardGrid from "./components/CardGrid";

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function TrendingCard({ item }) {
  const isGear = item.type === "gear";
  const href = `/${isGear ? "gear" : "blog"}/${item.slug}`;
  return (
    <a href={href} className="card">
      <div className="card__meta">
        <span className="badge badge-trail">Trending</span>
        <span>{isGear ? item.category : formatDate(item.date)}</span>
      </div>
      <h3>{item.title}</h3>
      <p className="excerpt">{item.excerpt}</p>
      {isGear && <span className="rating">★ {item.rating}</span>}
    </a>
  );
}

function PostCard({ post }) {
  return (
    <a href={`/blog/${post.slug}`} className="card">
      <div className="card__meta">
        <span>{formatDate(post.date)}</span>
        <span>·</span>
        <span>{post.readTime} min read</span>
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

function GearCard({ item }) {
  return (
    <a href={`/gear/${item.slug}`} className="card">
      <div className="card__meta">
        <span className="badge">{item.category}</span>
        <span className="rating">★ {item.rating}</span>
      </div>
      <h3>{item.title}</h3>
      <p className="excerpt">{item.excerpt}</p>
      <span className="gear-price">{item.price}</span>
    </a>
  );
}

export default function Home() {
  const posts = getAllItems("posts").slice(0, 3);
  const gear = getAllItems("gear").slice(0, 3);
  const trending = getTrending(4);

  return (
    <main className="wrap">
      <section className="hero">
        <div>
          <h1>Run more, guess less.</h1>
          <p>
            Training advice that survives contact with a real week, gear
            reviews written after the miles, not the press release — and no
            hype in either.
          </p>
          <div className="hero__actions">
            <a href="/blog" className="btn btn-primary">Read the blog</a>
            <a href="/gear" className="btn btn-outline">Browse gear reviews</a>
          </div>
        </div>
        <svg
          className="hero__art"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="An abstract winding route line"
        >
          <path
            d="M20 250 C 90 250, 90 180, 150 180 S 210 100, 270 100 S 320 40, 380 40"
            stroke="#2f6f4e"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="20" cy="250" r="7" fill="#16231d" />
          <circle cx="380" cy="40" r="7" fill="#a8552e" />
          <path
            d="M20 250 C 90 250, 90 180, 150 180 S 210 100, 270 100 S 320 40, 380 40"
            stroke="#2f6f4e"
            strokeWidth="1"
            strokeDasharray="1 10"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </section>

      {trending.length > 0 && (
        <section className="section">
          <div className="section__head">
            <h2>Trending now</h2>
            <a href="/blog?trending=1" className="more">See all trending →</a>
          </div>
          <CardGrid>
            {trending.map((item) => (
              <TrendingCard key={`${item.type}-${item.slug}`} item={item} />
            ))}
          </CardGrid>
        </section>
      )}

      <section className="section">
        <div className="section__head">
          <h2>Latest from the blog</h2>
          <a href="/blog" className="more">View all posts →</a>
        </div>
        <CardGrid>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </CardGrid>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Gear we're testing</h2>
          <a href="/gear" className="more">View all reviews →</a>
        </div>
        <CardGrid>
          {gear.map((item) => (
            <GearCard key={item.slug} item={item} />
          ))}
        </CardGrid>
      </section>

      <Reveal>
        <section className="section" style={{ borderTop: "none", paddingTop: 0 }}>
          <div className="newsletter">
            <div>
              <h2>Don't miss the next one</h2>
              <p>Weekly training tips and new gear reviews, straight to your inbox.</p>
            </div>
            <div>
              <NewsletterForm />
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
