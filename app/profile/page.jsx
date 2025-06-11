"use client";

import { useEffect, useState, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import {
  MdOutlineDelete,
  MdModeEdit,
  MdAdd,
  MdOutlineSportsSoccer,
} from "react-icons/md";

const PAGE_SIZE = 5;

export default function ProfilePage() {
  const { user, isSignedIn } = useUser();
  const [lineups, setLineups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!user) return;
    async function fetchLineups() {
      setLoading(true);
      try {
        const res = await fetch(`/api/lineups/user?user_id=${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setLineups(data);
          setCurrentPage(1);
        }
      } catch {
        // Handle error silently or show message
      } finally {
        setLoading(false);
      }
    }
    fetchLineups();
  }, [user]);

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this lineup?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/lineups/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({})); // Handle JSON parse errors
        alert(err.error || "Failed to delete lineup");
        return;
      }
      setLineups((prev) => prev.filter((lineup) => lineup.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting lineup");
    } finally {
      setDeletingId(null);
    }
  }

  const filteredLineups = useMemo(() => {
    let filtered = lineups.filter((lineup) =>
      lineup.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filtered.sort((a, b) => {
      if (sortKey === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortKey === "created_at") {
        return sortOrder === "asc"
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);
      }
      return 0;
    });
    return filtered;
  }, [lineups, searchTerm, sortKey, sortOrder]);

  const totalPages = Math.ceil(filteredLineups.length / PAGE_SIZE);
  const paginatedLineups = filteredLineups.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-6">
        <Image
          src="/logo.png"
          alt="MCITYX Logo"
          width={64}
          height={64}
          className="mb-6 rounded-full"
        />
        <p className="mb-6 text-lg font-semibold">
          Please sign in to view your profile.
        </p>
        <Link
          href="/sign-in"
          className="px-6 py-3 bg-sky-600 rounded-lg hover:bg-sky-700 transition font-semibold"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-4 sm:px-8 py-8 bg-sky-200 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-500">
      {/* Header */}
      <header className="max-w-5xl mx-auto rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white dark:bg-gray-800 transition-colors duration-500">
        <div className="flex items-center gap-5">
          <Image
            src="/logo.png"
            alt="MCITYX Logo"
            width={56}
            height={56}
            className="rounded-full border-4 border-sky-600 dark:border-sky-500 shadow transition-colors duration-500"
          />
          <div>
            <h1 className="text-3xl font-extrabold flex items-center gap-2 text-gray-900 dark:text-sky-300 transition-colors duration-500">
              Welcome, {user.firstName || user.email}
              <MdOutlineSportsSoccer className="w-8 h-8 text-sky-600 dark:text-sky-400" />
            </h1>
            <p className="mt-1 text-sm text-sky-700 dark:text-sky-400 transition-colors duration-500">
              Manage your football lineups and account details.
            </p>
          </div>
        </div>
        <Link
          href="/lineup/create"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold transition"
        >
          <MdAdd className="w-6 h-6" />
          Create New Lineup
        </Link>
      </header>

      {/* Controls */}
      <section className="max-w-5xl mx-auto mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <input
          type="search"
          placeholder="Search your lineups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow max-w-md rounded-xl bg-white dark:bg-gray-800 border border-sky-300 dark:border-sky-700 px-5 py-3 text-gray-900 dark:text-white placeholder-sky-500 dark:placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow transition-colors duration-500"
          aria-label="Search lineups"
        />
        <div className="flex items-center gap-4">
          <label
            htmlFor="sortKey"
            className="text-sky-700 dark:text-sky-400 font-semibold select-none transition-colors duration-500"
          >
            Sort by:
          </label>
          <select
            id="sortKey"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="rounded-lg bg-white dark:bg-gray-800 border border-sky-300 dark:border-sky-700 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-500"
          >
            <option value="created_at">Date Created</option>
            <option value="name">Name</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            aria-label={`Change sort order to ${
              sortOrder === "asc" ? "descending" : "ascending"
            }`}
            className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-sky-300 dark:border-sky-700 text-gray-900 dark:text-white hover:bg-sky-200 dark:hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-500"
          >
            {sortOrder === "asc" ? "⬆️" : "⬇️"}
          </button>
        </div>
      </section>

      {/* Lineups Heading */}
      <section className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-6 border-b border-sky-300 dark:border-sky-700 pb-2 text-sky-700 dark:text-sky-300 transition-colors duration-500">
          Your Lineups
        </h2>

        {/* Lineups List */}
        <div className="grid gap-6">
          {loading ? (
            <p className="text-center py-12 text-sky-600 dark:text-sky-400 transition-colors duration-500">
              Loading your lineups...
            </p>
          ) : paginatedLineups.length === 0 ? (
            <p className="text-center py-12 text-sky-700 dark:text-sky-500 transition-colors duration-500">
              No lineups found.{" "}
              <Link
                href="/lineup/create"
                className="underline font-semibold text-sky-700 dark:text-sky-400 transition-colors duration-500"
              >
                Create one now
              </Link>
              .
            </p>
          ) : (
            paginatedLineups.map((lineup, index) => (
              <div
                key={lineup.id}
                className="rounded-xl shadow flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 gap-4 border bg-white dark:bg-gray-800 border-sky-300 dark:border-sky-700 transition-colors duration-500"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono font-semibold text-lg min-w-[24px] text-center text-sky-600 dark:text-sky-500 transition-colors duration-500">
                    {(currentPage - 1) * PAGE_SIZE + index + 1}.
                  </span>
                  <Link
                    href={`/lineup/${lineup.id}`}
                    className="text-xl font-bold text-sky-700 hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-400 transition"
                  >
                    {lineup.name}
                  </Link>
                </div>
                <p className="text-sm mt-1 sm:mt-0 font-semibold text-sky-700 dark:text-sky-500 transition-colors duration-500">
                  Created:{" "}
                  {new Date(lineup.created_at).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="flex gap-3">
                  <Link
                    href={`/lineup/${lineup.id}`}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 font-semibold transition"
                  >
                    <MdModeEdit className="w-5 h-5" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(lineup.id)}
                    disabled={deletingId === lineup.id}
                    className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition ${
                      deletingId === lineup.id
                        ? "bg-red-400 cursor-not-allowed text-white"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                    aria-disabled={deletingId === lineup.id}
                    aria-label={`Delete lineup ${lineup.name}`}
                  >
                    <MdOutlineDelete className="w-5 h-5" />
                    {deletingId === lineup.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="max-w-5xl mx-auto mt-8 flex justify-center items-center gap-4"
          aria-label="Pagination"
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-sky-200 dark:hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-500"
            aria-disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Prev
          </button>
          <span className="font-semibold text-sky-700 dark:text-sky-300 transition-colors duration-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-sky-200 dark:hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-500"
            aria-disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </nav>
      )}

      {/* Account Info */}
      <section className="max-w-5xl mx-auto mt-5 mb-8 rounded-xl shadow px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white dark:bg-gray-800 border border-sky-300 dark:border-sky-700 transition-colors duration-500">
        <div>
          <h2 className="text-xl font-bold mb-2 text-sky-700 dark:text-sky-300 transition-colors duration-500">
            Account Details
          </h2>
          <p className="text-xl text-sky-700 dark:text-sky-400 transition-colors duration-500">
            <strong>Email:</strong> {user.emailAddresses?.[0]?.emailAddress}
          </p>
          <p className="text-xl text-sky-700 dark:text-sky-400 transition-colors duration-500">
            <strong>User Name:</strong> {user.fullName}
          </p>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Link
            href="/settings"
            className="px-5 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold transition"
          >
            Account Settings
          </Link>

          <a
            href="mailto:shudarsanpoudel25@gmail.com"
            className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold transition"
          >
            Contact Support
          </a>
        </div>
      </section>
    </main>
  );
}
