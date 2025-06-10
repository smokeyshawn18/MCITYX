import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AskAI from "@/components/AskAI";

export const metadata = {
  title: "MCityX - Manchester City Fan Site",
  description:
    "Latest results, stats, trophies, news, and more about Manchester City.",
  verification: {
    other: {
      "google-adsense-account": "ca-pub-8971104795657349",
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "MCityX - Manchester City Fan Site",
    description:
      "Latest results, stats, trophies, news, and more about Manchester City.",
    url: "https://mcityx.vercel.app",
    siteName: "MCityX",
    images: [
      {
        url: "https://mcityx.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "MCityX Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@MCityX",
    title: "MCityX - Manchester City Fan Site",
    description:
      "Latest results, stats, trophies, news, and more about Manchester City.",
    image: "https://mcityx.vercel.app/twitter-image.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />

          {/* Adsense verification */}
          <meta
            name="google-adsense-account"
            content={metadata.verification.other["google-adsense-account"]}
          />

          {/* Open Graph */}
          <meta property="og:title" content={metadata.openGraph.title} />
          <meta
            property="og:description"
            content={metadata.openGraph.description}
          />
          <meta property="og:url" content={metadata.openGraph.url} />
          <meta property="og:site_name" content={metadata.openGraph.siteName} />
          <meta property="og:locale" content={metadata.openGraph.locale} />
          <meta property="og:type" content={metadata.openGraph.type} />
          <meta
            property="og:image"
            content={metadata.openGraph.images[0].url}
          />
          <meta
            property="og:image:width"
            content={metadata.openGraph.images[0].width.toString()}
          />
          <meta
            property="og:image:height"
            content={metadata.openGraph.images[0].height.toString()}
          />
          <meta
            property="og:image:alt"
            content={metadata.openGraph.images[0].alt}
          />

          {/* Twitter Card */}
          <meta name="twitter:card" content={metadata.twitter.card} />
          <meta name="twitter:site" content={metadata.twitter.site} />
          <meta name="twitter:title" content={metadata.twitter.title} />
          <meta
            name="twitter:description"
            content={metadata.twitter.description}
          />
          <meta name="twitter:image" content={metadata.twitter.image} />

          {/* Favicon */}
          <link rel="icon" href={metadata.icons.icon} />

          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8971104795657349"
            crossorigin="anonymous"
          />

          {/* Structured Data JSON-LD for Google Search */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "MCityX",
                url: "https://mcityx.vercel.app",
                logo: "https://mcityx.vercel.app/logo.png",
              }),
            }}
          />
        </head>
        <body
          className="antialiased font-sans"
          style={{
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Noto Sans JP', 'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif",
          }}
        >
          <ScrollToTop />
          <Navbar />
          <AskAI />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
