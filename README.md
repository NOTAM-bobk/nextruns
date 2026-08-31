# Tempo & Trail

A running blog and gear-review site: Next.js + markdown content, built to
push to GitHub and deploy on Vercel with no database and no CMS to manage.

## What's in here

- **Blog** (`/blog`) — training articles, filterable by tag or trending
- **Gear reviews** (`/gear`) — shoe/watch/gear reviews with ratings, pros/cons, filterable by category
- **Search** (`/search`) — fuzzy search across everything, plus a search box in the nav
- **Trending** — any post or review flagged `trending: true` shows up on the homepage and under Blog → Trending
- **Email list** — a signup form in the footer and after every article, wired to a real API route
- A PopAds pop-under tag (from the earlier version of this site), still wired up and optional

Six starter blog posts and four gear reviews are included so the site launches
with real, readable content instead of empty pages — see "About the starter
content" below before you publish.

## Adding a new blog post

Create a new file in `content/posts/`, named `your-post-slug.md`:

```markdown
---
title: "Your Post Title"
date: "2026-09-01"
excerpt: "One or two sentences shown on cards and in search results."
tags: ["training", "marathon"]
trending: false
---
Your post content in regular markdown. Headings, lists, bold, links —
all supported.
```

Commit, push, and Vercel rebuilds the site with the new post included
automatically — nothing else to touch. The filename becomes the URL
(`content/posts/my-post.md` → `/blog/my-post`).

## Adding a new gear review

Same idea, in `content/gear/`:

```markdown
---
title: "Product Name"
category: "Shoes"          # groups reviews on the /gear filter bar
subtitle: "Daily Trainer Review"
date: "2026-09-01"
rating: 4.5                # out of 5
price: "$140"
pros:
  - "First thing you liked"
  - "Second thing"
cons:
  - "First drawback"
excerpt: "One sentence for cards and search."
buyUrl: "https://example.com/product"   # leave blank to hide the button
trending: false
---
Full review body in markdown.
```

## About the starter content

The included gear reviews use invented product names ("Aerostride Glide 3",
"PulseWatch GPS 7," etc.) rather than real branded products — that's
deliberate. I can't verify real, current specs or test real gear, so rather
than put fabricated claims about actual products on your site, the starter
reviews are written as realistic examples showing the structure (rating,
pros/cons, verdict) for you to replace with your own testing and opinions of
real gear. Same goes for `buyUrl`, left blank throughout — drop in your real
retailer or affiliate links once you've picked real products to review.

The six blog posts are original, general training content and are fine to
keep, edit, or replace as-is.

## Environment variables

Copy `.env.example` to `.env.local` for local testing, and set the real
values in Vercel under **Project Settings → Environment Variables**.

| Variable | Required? | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Used to build the sitemap |
| `NEXT_PUBLIC_POPADS_SITE_ID` | Optional | Site ID from popads.net |
| `MAILCHIMP_API_KEY` / `MAILCHIMP_SERVER_PREFIX` / `MAILCHIMP_AUDIENCE_ID` | Optional | Connects the newsletter form to a real Mailchimp audience |
| `NEWSLETTER_WEBHOOK_URL` | Optional | Alternative to Mailchimp — any endpoint accepting `{ email }` |

**Important distinction from the ad-tag variables:** the Mailchimp API key is
a genuine secret — set it as a plain environment variable, never with the
`NEXT_PUBLIC_` prefix, or it would ship to every visitor's browser. Everything
prefixed `NEXT_PUBLIC_` in this project (site URL, PopAds ID) is already
public-facing by nature, so there's no harm in that prefix for those.

If neither newsletter option is configured, the signup form still works —
it shows a friendly "not connected yet" message instead of failing silently,
so you'll know at a glance if you forgot to wire it up.

## Deploy

```
git init && git add . && git commit -m "Launch site"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

Then import the repo at [vercel.com/new](https://vercel.com/new) — Vercel
auto-detects Next.js. Add the environment variables above, deploy, done.

## Local development

```
npm install
cp .env.example .env.local   # optional, fill in what you have
npm run dev
```
