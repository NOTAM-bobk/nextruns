import { getAllItems, getAllCategories } from "@/lib/content";
import CardGrid from "../components/CardGrid";
import Reveal from "../components/Reveal";

export const metadata = {
  title: "Gear Reviews",
  description: "Honest, hands-on reviews of running shoes, watches, and gear.",
};

function GearCard({ item }) {
  return (
    <a href={`/gear/${item.slug}`} className="card">
      <div className="card__meta">
        <span className="badge">{item.category}</span>
        <span className="rating">★ {item.rating}</span>
        {item.trending && <span className="badge badge-trail">Trending</span>}
      </div>
      <h3>{item.title}</h3>
      {item.subtitle && (
        <p style={{ margin: "-6px 0 10px", fontSize: "0.85rem", color: "var(--ink-soft)" }}>
          {item.subtitle}
        </p>
      )}
      <p className="excerpt">{item.excerpt}</p>
      <span className="gear-price">{item.price}</span>
    </a>
  );
}

export default function GearIndex({ searchParams }) {
  const allGear = getAllItems("gear");
  const categories = getAllCategories();
  const activeCategory = searchParams?.category;

  const gear = activeCategory
    ? allGear.filter((g) => g.category === activeCategory)
    : allGear;

  return (
    <main className="wrap">
      <Reveal>
        <div className="article-head">
          <h1>Gear Reviews</h1>
          <p style={{ color: "var(--ink-soft)", maxWidth: "56ch" }}>
            Real testing, real mileage. Shoes, watches, and hydration gear —
            reviewed for what actually matters on the run.
          </p>
        </div>
      </Reveal>

      <div className="filter-bar">
        <a href="/gear" className={`tag ${!activeCategory ? "is-active" : ""}`}>All</a>
        {categories.map((cat) => (
          <a
            key={cat}
            href={`/gear?category=${encodeURIComponent(cat)}`}
            className={`tag ${activeCategory === cat ? "is-active" : ""}`}
          >
            {cat}
          </a>
        ))}
      </div>

      <CardGrid style={{ paddingBottom: 64 }}>
        {gear.map((item) => (
          <GearCard key={item.slug} item={item} />
        ))}
      </CardGrid>
    </main>
  );
}
