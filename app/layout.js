import Script from "next/script";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://tempoandtrail.com"
  ),
  title: {
    default: "Tempo & Trail",
    template: "%s · Tempo & Trail",
  },
  description:
    "Training advice, race prep, and honest gear reviews for runners who'd rather run than scroll.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#2f6f4e",
};

export default function RootLayout({ children }) {
  const popadsSiteId = process.env.NEXT_PUBLIC_POPADS_SITE_ID;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {popadsSiteId ? (
          <Script id="popads-tag" strategy="afterInteractive">
            {`(function(s){s.dataset.zone='${popadsSiteId}';s.src='https://cdn.popads.net/pop.js'})(([document.documentElement,document.body].filter(Boolean).pop()).appendChild(document.createElement('script')));`}
          </Script>
        ) : null}
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
