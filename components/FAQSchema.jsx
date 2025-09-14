"use client";

export default function FAQSchema({ faqs }) {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqStructuredData),
      }}
    />
  );
}

// Example usage component
export function ManCityFAQ() {
  const faqs = [
    {
      question: "When is Manchester City's next match?",
      answer:
        "You can check Manchester City's latest match schedule and fixtures on our Schedule page. We provide real-time updates for Premier League, Champions League, FA Cup, and Carabao Cup matches.",
    },
    {
      question: "Who are Manchester City's top goal scorers?",
      answer:
        "Our Key Performers section showcases Manchester City's top goal scorers with detailed statistics including goals, assists, appearances, and performance ratings for the current season.",
    },
    {
      question: "What is Manchester City's current league position?",
      answer:
        "Check our Results page for Manchester City's current Premier League standings, match results, and detailed statistics for all competitions.",
    },
    {
      question: "How can I get Manchester City news updates?",
      answer:
        "Visit our News section for the latest Manchester City news, transfer rumors, player updates, and exclusive content from the Etihad Stadium.",
    },
    {
      question: "Where can I find Manchester City player statistics?",
      answer:
        "Our Player Card section provides comprehensive statistics for all Manchester City players including ratings, season stats, career stats, and detailed performance metrics.",
    },
  ];

  return <FAQSchema faqs={faqs} />;
}
