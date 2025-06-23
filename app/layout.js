import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { ClerkProvider } from "@clerk/nextjs";
import AskAI from "@/components/AskAI";
import Head from "next/head";

export const metadata = {
  title: "MCityX - Manchester City Fan Site",
  description:
    "Latest results, stats, trophies, news, and more about Manchester City.",
  robots: "index, follow",
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
    url: "https://mcityxs.vercel.app",
    siteName: "MCityX",
    images: [
      {
        url: "https://mcityxs.vercel.app/og-image.png",
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
    images: ["https://mcityxs.vercel.app/twitter-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          {/* Google AdSense */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8971104795657349"
            crossOrigin="anonymous"
          ></script>

          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "MCityX",
                url: "https://mcityxs.vercel.app",
                logo: "https://mcityxs.vercel.app/logo.png",
              }),
            }}
          />
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
          <AskAI />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
