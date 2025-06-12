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
      <div className="bg-sky-100 dark:bg-sky-950 dark:text-white p-8 sm:p-12   mx-0 max-w-full">
        <h1 className="text-4xl sm:text-5xl font-bold text-sky-900  mb-10 text-center uppercase tracking-widest">
          News
        </h1>

        {loading ? (
          <p className="text-center text-gray-700 text-xl">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 transform hover:shadow-2xl h-full"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1b3c42] mb-6 text-center uppercase tracking-wide">
                  {item.title}
                </h2>
                <div className="flex items-center justify-center w-full h-64 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={item.urlToImage || "/fallback.jpg"}
                    alt={item.title}
                    className="max-w-full max-h-full object-cover"
                  />
                </div>
                <div className="mt-6 bg-sky-600 text-white text-lg font-semibold px-4 py-2 rounded-md shadow-md text-center">
                  {new Date(item.publishedAt).toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Buttons */}
        <div className="flex justify-center mt-10 space-x-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="bg-blue-600 text-white font-bold px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Happening;
