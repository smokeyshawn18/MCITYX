"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";

function Happening() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const PAGE_SIZE = 6;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/news?page=${page}&pageSize=${PAGE_SIZE}`);
        const data = await res.json();
        setNews(data.articles || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
      setLoading(false);
    };

    fetchNews();
  }, [page]);

  return (
    <ProtectedRoute>
      <div className="bg-sky-50 dark:bg-gray-950 px-4 sm:px-8 lg:px-16 py-10 min-h-screen">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-sky-900 dark:text-white mb-14 uppercase tracking-widest">
          Latest News
        </h1>

        {loading ? (
          <p className="text-center text-gray-700 dark:text-gray-300 text-xl">
            Loading...
          </p>
        ) : (
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item, idx) => (
              <article
                key={idx}
                className="bg-white dark:bg-gray-900 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="w-full h-56 sm:h-64 relative">
                  <img
                    src={item.urlToImage || "/fallback.jpg"}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-xl font-bold text-sky-900 dark:text-white leading-tight mb-3 line-clamp-2">
                      {item.title}
                    </h2>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {item.description || "No description available."}
                    </p>
                  </div>

                  <div className="text-sm text-sky-600 dark:text-sky-400 font-medium mt-auto pt-4 border-t border-sky-100 dark:border-gray-700">
                    {new Date(item.publishedAt).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-16 space-x-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-5 py-2 rounded-lg text-gray-700 font-semibold bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-5 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Happening;
