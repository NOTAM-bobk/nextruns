import Script from "next/script";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export const metadata = {
  title: {
    default: "Tempo & Trail",
    template: "%s · Tempo & Trail",
  },
  description:
    "Training advice, race prep, and honest gear reviews for runners who'd rather run than scroll.",
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
