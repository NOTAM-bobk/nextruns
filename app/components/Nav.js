export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav__row">
        <a href="/" className="nav__brand">
          Tempo<span>&</span>Trail
        </a>
        <ul className="nav__links nav__mobile-hide">
          <li><a href="/blog">Blog</a></li>
          <li><a href="/gear">Gear</a></li>
          <li><a href="/blog?trending=1">Trending</a></li>
        </ul>
        <form action="/search" method="GET" className="nav__search">
          <input
            type="text"
            name="q"
            placeholder="Search articles & gear"
            aria-label="Search"
          />
          <button type="submit" aria-label="Search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
}
