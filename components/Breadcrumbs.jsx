"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs({ items }) {
  const breadcrumbList = [{ name: "Home", href: "/", icon: Home }, ...items];

  return (
    <>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          {breadcrumbList.map((item, index) => {
            const isLast = index === breadcrumbList.length - 1;
            const Icon = item.icon;

            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                )}
                {isLast ? (
                  <span className="flex items-center text-sky-600 dark:text-sky-400 font-medium">
                    {Icon && <Icon className="h-4 w-4 mr-1" />}
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {Icon && <Icon className="h-4 w-4 mr-1" />}
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Structured Data for Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbList.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: `https://mcityx.vercel.app${item.href}`,
            })),
          }),
        }}
      />
    </>
  );
}
