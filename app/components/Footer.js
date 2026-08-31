import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__row" style={{ marginBottom: 28 }}>
          <div>
            <strong style={{ color: "var(--ink)" }}>Get the weekly recap</strong>
            <p style={{ margin: "4px 0 0" }}>New posts and gear reviews, once a week.</p>
          </div>
          <div style={{ minWidth: 320 }}>
            <NewsletterForm compact />
          </div>
        </div>
        <div className="footer__row">
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Tempo &amp; Trail. Training smarter,
            one mile at a time.
          </p>
          <ul className="footer__links">
            <li><a href="/blog">Blog</a></li>
            <li><a href="/gear">Gear</a></li>
            <li><a href="/search">Search</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
