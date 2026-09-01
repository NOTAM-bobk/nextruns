# Content folder

Everything in this folder is picked up by the site automatically — no code changes needed.

## Adding a blog post

Drop a new `.md` file into `content/posts/`:

```
content/posts/my-new-post.md
```

The filename becomes the URL. `my-new-post.md` → `/blog/my-new-post`.

## Adding a gear review

Drop a new `.md` file into `content/gear/`:

```
content/gear/my-gear-review.md
```

`my-gear-review.md` → `/gear/my-gear-review`.

## Required front matter

Blog post (`content/posts/`):

```markdown
---
title: "My Post Title"
date: "2026-09-01"
excerpt: "One or two sentences shown on cards and in search."
tags: ["training", "beginner"]
trending: true   # optional — shows in the Trending row on the homepage
---

Body in markdown. `##` headings become sections.
```

Gear review (`content/gear/`):

```markdown
---
title: "Product Name"
category: "Shoes"          # Shoes | Watches | Hydration | Apparel | Accessories
subtitle: "Short Review Kicker"
date: "2026-09-01"
rating: 4.5                # 0–5
price: "$140"
pros:
  - "Pro one"
  - "Pro two"
cons:
  - "Con one"
excerpt: "One or two sentences shown on cards and in search."
buyUrl: ""                 # optional — when set, a "Check price" button renders
trending: true             # optional
---

Body in markdown. Suggested sections: The ride / Fit / Durability / Who it's for / Verdict.
```

## Behavior notes

- Posts are listed newest-first; gear is listed alphabetically.
- Read time is estimated automatically from word count.
- Related-content rails and tag filters update themselves.
- The search index (`/api/search-index`) rebuilds on the next deploy.
- Slugs must be unique within their folder; renaming a file changes its URL.
