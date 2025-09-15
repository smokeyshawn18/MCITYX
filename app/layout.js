import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { ClerkProvider } from "@clerk/nextjs";
import InstallPrompt from "@/components/InstallPrompt";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

import Head from "next/head";

export const metadata = {
  title: {
    default: "MCityX - Manchester City News, Results, Stats & Transfer Updates",
    template: "%s | MCityX - Manchester City Fan Site",
  },
  description:
    "Your ultimate Manchester City fan destination. Get latest Man City news, live match results, player stats, transfer rumors, fixtures, Premier League standings, Champions League updates, and exclusive City content.",
  keywords: [
    "Manchester City",
    "Man City",
    "MCFC",
    "Mcityx",
    "Manchester City news",
    "Man City results",
    "Manchester City fixtures",
    "Premier League",
    "Champions League",
    "Manchester City transfers",
    "Man City stats",
    "Pep Guardiola",
    "Etihad Stadium",
    "Manchester City players",
    "City fan site",
    "Manchester City live score",
    "Man City match highlights",
    "Manchester City squad",
    "City news today",
    "Manchester City tickets",
    "Man City merchandise",
  ].join(", "),
  authors: [{ name: "MCityX Team" }],
  creator: "MCityX",
  publisher: "MCityX",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
    other: {
      "google-adsense-account": "ca-pub-8971104795657349",
    },
  },
  alternates: {
    canonical: "https://mcityx.vercel.app",
  },
  category: "Sports",
  classification: "Football News and Information",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#6CABDD" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "MCityX - Manchester City Fan Site",
    title: "MCityX - Manchester City News, Results, Stats & Transfer Updates",
    description:
      "Your ultimate Manchester City fan destination. Get latest Man City news, live match results, player stats, transfer rumors, fixtures, and exclusive City content.",
    url: "https://mcityx.vercel.app",
    locale: "en_US",
    images: [
      {
        url: "https://mcityx.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "MCityX - Manchester City Fan Site Logo",
        type: "image/png",
      },
      {
        url: "https://mcityx.vercel.app/og-image-square.png",
        width: 800,
        height: 800,
        alt: "MCityX Square Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MCityX",
    creator: "@MCityX",
    title: "MCityX - Manchester City News, Results & Transfer Updates",
    description:
      "Your ultimate Manchester City fan destination. Latest Man City news, live results, player stats, transfer rumors, and exclusive City content.",
    images: [
      {
        url: "https://mcityx.vercel.app/twitter-image.png",
        alt: "MCityX - Manchester City Fan Site",
      },
    ],
  },
  appleWebApp: {
    title: "MCityX",
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        url: "/apple-startup-image.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL("https://mcityx.vercel.app"),
};

export default function RootLayout({ children }) {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: "MCityX",
    alternateName: "MCityX - Manchester City Fan Site",
    url: "https://mcityx.vercel.app",
    logo: {
      "@type": "ImageObject",
      url: "https://mcityx.vercel.app/logo.png",
      width: 300,
      height: 300,
    },
    description:
      "Your ultimate Manchester City fan destination with latest news, results, stats, and transfer updates.",
    sameAs: [
      "https://twitter.com/MCityX",
      "https://facebook.com/MCityX",
      "https://instagram.com/MCityX",
    ],
    sport: "Football",
    memberOf: {
      "@type": "SportsLeague",
      name: "Premier League",
    },
    about: {
      "@type": "SportsTeam",
      name: "Manchester City",
      alternateName: ["Man City", "MCFC", "City"],
      sport: "Football",
      memberOf: {
        "@type": "SportsLeague",
        name: "Premier League",
      },
      location: {
        "@type": "Place",
        name: "Manchester, England",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Manchester",
          addressCountry: "GB",
        },
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://mcityx.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mcityx.vercel.app",
      },
    ],
  };

  return (
    <ClerkProvider>
      <html lang="en-GB">
        <Head>
          {/* Enhanced Meta Tags */}
          <meta name="theme-color" content="#6CABDD" />
          <meta name="msapplication-TileColor" content="#6CABDD" />
          <meta name="application-name" content="MCityX" />
          <meta name="apple-mobile-web-app-title" content="MCityX" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />

          {/* Geographic Tags */}
          <meta name="geo.region" content="GB-MAN" />
          <meta name="geo.placename" content="Manchester, England" />
          <meta name="geo.position" content="53.4808;-2.2426" />
          <meta name="ICBM" content="53.4808, -2.2426" />

          {/* Enhanced Content Tags */}
          <meta
            name="news_keywords"
            content="Manchester City, Man City, MCFC, Premier League, Champions League, football news, soccer news, Pep Guardiola, Etihad Stadium"
          />
          <meta
            name="article:publisher"
            content="https://facebook.com/MCityX"
          />
          <meta name="article:author" content="MCityX Team" />

          {/* Google AdSense */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8971104795657349"
            crossOrigin="anonymous"
          ></script>

          {/* Enhanced JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLdData),
            }}
          />

          {/* Breadcrumb Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbJsonLd),
            }}
          />

          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
          <link rel="preconnect" href="https://www.google-analytics.com" />

          {/* DNS prefetch for better performance */}
          <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
          <link rel="dns-prefetch" href="//ajax.googleapis.com" />

          {/* Canonical URL */}
          <link rel="canonical" href="https://mcityx.vercel.app" />
        </Head>

        <body
          className="antialiased font-sans"
          style={{
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Noto Sans JP', 'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif",
          }}
        >
          <ScrollToTop />
          <Navbar />
          <ServiceWorkerRegister />
          <InstallPrompt />

          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
          >
            Skip to main content
          </a>

          <main id="main-content" role="main">
            {children}
          </main>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
