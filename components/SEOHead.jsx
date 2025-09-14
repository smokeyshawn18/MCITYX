"use client";

import { useEffect } from "react";
import Head from "next/head";

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData,
  noindex = false,
  article,
}) {
  useEffect(() => {
    // Update meta tags dynamically if needed
    if (typeof window !== "undefined") {
      // Update canonical URL
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink && canonical) {
        canonicalLink.href = canonical;
      }

      // Update Open Graph image
      const ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (ogImageMeta && ogImage) {
        ogImageMeta.content = ogImage;
      }
    }
  }, [canonical, ogImage]);

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta
        property="og:site_name"
        content="MCityX - Manchester City Fan Site"
      />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@MCityX" />
      <meta name="twitter:creator" content="@MCityX" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Article specific meta tags */}
      {article && (
        <>
          <meta
            property="article:author"
            content={article.author || "MCityX Team"}
          />
          <meta
            property="article:publisher"
            content="https://facebook.com/MCityX"
          />
          <meta
            property="article:section"
            content={article.section || "Sports"}
          />
          {article.tags &&
            article.tags.map((tag) => (
              <meta key={tag} property="article:tag" content={tag} />
            ))}
          {article.publishedTime && (
            <meta
              property="article:published_time"
              content={article.publishedTime}
            />
          )}
          {article.modifiedTime && (
            <meta
              property="article:modified_time"
              content={article.modifiedTime}
            />
          )}
        </>
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="author" content="MCityX Team" />
      <meta name="publisher" content="MCityX" />
      <meta name="language" content="en-GB" />
      <meta name="geo.region" content="GB-MAN" />
      <meta name="geo.placename" content="Manchester, England" />
      <meta name="geo.position" content="53.4808;-2.2426" />
      <meta name="ICBM" content="53.4808, -2.2426" />

      {/* Mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#6CABDD" />
      <meta name="msapplication-TileColor" content="#6CABDD" />

      {/* Performance hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
      <link rel="dns-prefetch" href="//ajax.googleapis.com" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  );
}

// Predefined SEO configurations for common pages
export const seoConfigs = {
  home: {
    title: "MCityX - Manchester City News, Results, Stats & Transfer Updates",
    description:
      "Your ultimate Manchester City fan destination. Get latest Man City news, live match results, player stats, transfer rumors, fixtures, Premier League standings, Champions League updates, and exclusive City content.",
    keywords:
      "Manchester City, Man City, MCFC, MCityX, Manchester City news, Man City results, Manchester City fixtures, Premier League, Champions League, Manchester City transfers, Man City stats, Pep Guardiola, Etihad Stadium",
  },

  schedule: {
    title: "Manchester City Match Schedule & Fixtures | MCityX",
    description:
      "View Manchester City's complete match schedule, fixtures, and results for Premier League, Champions League, FA Cup, and Carabao Cup. Get live match updates and fixture information.",
    keywords:
      "Manchester City schedule, Man City fixtures, Premier League fixtures, Champions League schedule, FA Cup matches, Carabao Cup fixtures, Manchester City matches, City fixtures 2024",
  },

  news: {
    title: "Latest Manchester City News & Transfer Updates | MCityX",
    description:
      "Get the latest Manchester City news, transfer rumors, player updates, and exclusive City content. Breaking news, analysis, and insider information from the Etihad.",
    keywords:
      "Manchester City news, Man City transfers, City news today, Manchester City rumors, Pep Guardiola news, Etihad news, Premier League news, Champions League news",
  },

  players: {
    title: "Manchester City Player Stats & Squad Information | MCityX",
    description:
      "Complete Manchester City squad statistics, player profiles, ratings, and performance data. Get detailed stats for all City players including Haaland, De Bruyne, and more.",
    keywords:
      "Manchester City players, Man City squad, player stats, Manchester City ratings, City players, Premier League players, football statistics, soccer stats",
  },

  results: {
    title: "Manchester City Match Results & Scores | MCityX",
    description:
      "View Manchester City's latest match results, scores, and detailed statistics for Premier League, Champions League, FA Cup, and Carabao Cup matches.",
    keywords:
      "Manchester City results, Man City scores, match results, Premier League results, Champions League results, FA Cup results, Carabao Cup results",
  },
};
