"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";

function ResultCard({ item }) {
  const href = `/${item.type === "posts" ? "blog" : "gear"}/${item.slug}`;
  return (
    <a href={href} className="card">
      <div className="card__meta">
        <span className="badge">{item.type === "posts" ? "Article" : "Gear"}</span>
      </div>
      <h3>{item.title}</h3>
      <p className="excerpt">{item.excerpt}</p>
      <div className="card__tags">
        {(item.tags || []).slice(0, 3).map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </a>
  );
}

function SearchInner() {
  const params = useSearchParams();
  const initialQuery = params.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [index, setIndex] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/search-index")
      .then((r) => r.json())
      .then((data) => {
        setIndex(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: ["title", "excerpt", "tags", "subtitle"],
        threshold: 0.35,
      }),
    [index]
  );

  const results = query.trim()
    ? fuse.search(query).map((r) => r.item)
    : index;

  return (
    <main className="wrap">
      <div className="article-head">
        <h1>Search</h1>
        <p style={{ color: "var(--ink-soft)" }}>
          Find articles and gear reviews by keyword, topic, or tag.
        </p>
      </div>

      <form
        className="search-box"
        onSubmit={(e) => e.preventDefault()}
        role="search"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try “marathon”, “trail shoes”, “recovery”…"
          autoFocus
        />
      </form>

      {!loaded && <p className="search-empty">Loading…</p>}

      {loaded && results.length === 0 && (
        <p className="search-empty">
          No results for “{query}”. Try a different word, or browse the{" "}
          <a href="/blog" style={{ color: "var(--trail-dark)" }}>blog</a> and{" "}
          <a href="/gear" style={{ color: "var(--trail-dark)" }}>gear</a> pages.
        </p>
      )}

      {results.length > 0 && (
        <div className="grid grid-3" style={{ paddingBottom: 64 }}>
          {results.map((item) => (
            <ResultCard key={`${item.type}-${item.slug}`} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<main className="wrap"><p style={{ padding: "48px 0" }}>Loading…</p></main>}>
      <SearchInner />
    </Suspense>
  );
}
