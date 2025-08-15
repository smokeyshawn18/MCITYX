"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Calendar, Loader2, RotateCcw } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

import MatchCard from "./components/MatchCard";
import { manualMatches, tabs, getDaysToGo } from "./components/manualMatches";
import { formatDate, TIME_FORMATS, TimeToggle } from "./components/timeUtils";

const Schedule = () => {
  const [apiMatches, setApiMatches] = useState({
    prem: [],
    champ: [],
  });
  const [selectedTab, setSelectedTab] = useState("fifa");
  const [apiLoading, setApiLoading] = useState({ prem: false, champ: false });
  const [apiError, setApiError] = useState({ prem: false, champ: false });
  const [timeFormat, setTimeFormat] = useState(TIME_FORMATS.LOCAL_12);
  const [apiDataFetched, setApiDataFetched] = useState({
    prem: false,
    champ: false,
  });

  // Fetch matches for a specific tab: prem or champ
  const fetchApiMatches = useCallback(
    async (tabKey, forceRefresh = false) => {
      if (!forceRefresh && apiDataFetched[tabKey]) return;

      setApiLoading((loading) => ({ ...loading, [tabKey]: true }));
      setApiError((error) => ({ ...error, [tabKey]: false }));

      try {
        const response = await fetch("/api/matches");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch");
        }

        const upcoming = Array.isArray(data?.matches)
          ? data.matches.filter((m) => m.status === "TIMED")
          : [];

        // Sort by date
        upcoming.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));

        // Categorize matches for prem or champ
        const filteredMatches = upcoming.filter((match) => {
          const compName = match.competition.name.toLowerCase();
          if (tabKey === "prem") {
            return (
              compName.includes("premier") ||
              compName.includes("pl") ||
              compName.includes("epl")
            );
          } else if (tabKey === "champ") {
            return (
              compName.includes("champions") ||
              compName.includes("ucl") ||
              compName.includes("cl")
            );
          }
          return false;
        });

        setApiMatches((prev) => ({ ...prev, [tabKey]: filteredMatches }));
        setApiDataFetched((fetched) => ({ ...fetched, [tabKey]: true }));

        toast.success(
          `Loaded ${filteredMatches.length} upcoming ${
            tabKey === "prem" ? "Premier League" : "Champions League"
          } matches!`
        );
      } catch (error) {
        console.error("API Error:", error);
        setApiMatches((prev) => ({ ...prev, [tabKey]: [] }));
        setApiError((error) => ({ ...error, [tabKey]: true }));
        toast.error(
          `Could not get the ${
            tabKey === "prem" ? "Premier League" : "Champions League"
          } matches.`
        );
      } finally {
        setApiLoading((loading) => ({ ...loading, [tabKey]: false }));
      }
    },
    [apiDataFetched]
  );

  // Fetch API data when user switches tabs
  useEffect(() => {
    if (selectedTab === "prem" || selectedTab === "champ") {
      fetchApiMatches(selectedTab);
    }
  }, [selectedTab, fetchApiMatches]);

  // Determine current matches based on selected tab
  const currentMatches = useMemo(() => {
    switch (selectedTab) {
      case "fifa":
        return manualMatches.filter((m) => m.competition.name.includes("Fifa"));
      case "fa":
        return manualMatches.filter((m) =>
          m.competition.name.includes("FA Cup")
        );
      case "carabao":
        return manualMatches.filter((m) =>
          m.competition.name.includes("Carabao")
        );
      case "prem":
      case "champ":
        return apiMatches[selectedTab];
      default:
        return [];
    }
  }, [selectedTab, apiMatches]);

  // Loading and error states for current tab
  const isCurrentTabLoading = apiLoading[selectedTab] || false;
  const hasCurrentTabError = apiError[selectedTab] || false;

  // Memoized date formatter
  const memoizedFormatDate = useCallback(
    (date) => formatDate(date, timeFormat),
    [timeFormat]
  );

  // Handle tab selection change
  const handleTabChange = useCallback((tabKey) => setSelectedTab(tabKey), []);

  // Handle refresh by refetching current tab API data if necessary
  const handleRefresh = useCallback(() => {
    if (selectedTab === "fifa") {
      toast.success("Carabao Cup  matches are up to date!");
      return;
    }
    fetchApiMatches(selectedTab, true);
  }, [selectedTab, fetchApiMatches]);

  const renderEmptyState = () => {
    const currentTab = tabs.find((t) => t.key === selectedTab);

    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-6xl mb-4">📅</div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No matches scheduled
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
          {selectedTab === "fifa"
            ? "Carabao Cup matches will appear here when scheduled."
            : `${currentTab?.description} matches will appear here when available.`}
        </p>
        <Button
          onClick={handleRefresh}
          className="mt-4 bg-sky-600 hover:bg-sky-700 text-white"
          disabled={isCurrentTabLoading}
        >
          <RotateCcw
            className={`w-4 h-4 mr-2 ${
              isCurrentTabLoading ? "animate-spin" : ""
            }`}
          />
          {isCurrentTabLoading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-700 to-sky-900 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
            <Calendar className="w-10 h-10 text-sky-900" />
            Match Schedule
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Stay updated with upcoming matches across all competitions
          </p>
        </div>

        {/* Time Toggle */}
        <div className="flex justify-end mb-6">
          <TimeToggle timeFormat={timeFormat} setTimeFormat={setTimeFormat} />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 sm:gap-6 mb-8 overflow-x-auto pb-2">
          {tabs.map(({ key, label, img, color, description }) => {
            const isActive = selectedTab === key;
            const isLoading = apiLoading[key] || false;
            const hasData =
              key === "fifa"
                ? manualMatches.length > 0
                : apiMatches[key]?.length > 0;
            const hasError = apiError[key] || false;

            return (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                disabled={isLoading}
                className={`group flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 min-w-[120px] ${
                  isActive
                    ? `bg-gradient-to-br ${color} text-white shadow-xl scale-105`
                    : "bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:scale-102 hover:shadow-lg text-gray-700 dark:text-gray-300"
                } ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                <div
                  className={`relative ${
                    isActive ? "scale-110" : "group-hover:scale-105"
                  } transition-transform duration-300`}
                >
                  {isLoading ? (
                    <Loader2 className="w-12 h-12 animate-spin" />
                  ) : (
                    <Image
                      src={img}
                      alt={label}
                      width={48}
                      height={48}
                      className="object-contain"
                      unoptimized
                      priority={isActive}
                    />
                  )}
                  {!isLoading && hasData && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                  {!isLoading && hasError && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="text-center">
                  <span className="text-sm font-bold">{label}</span>
                  {isLoading && (
                    <div className="text-xs opacity-75 mt-1">Loading...</div>
                  )}
                  {!isLoading && !hasData && key !== "fifa" && (
                    <div className="text-xs opacity-75 mt-1">Click to view</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {isCurrentTabLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-sky-600 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading matches...
            </p>
          </div>
        ) : currentMatches.length > 0 ? (
          <>
            <div className="text-center mb-6">
              <span className="inline-block bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 px-4 py-2 rounded-full text-sm font-semibold">
                {currentMatches.length}{" "}
                {currentMatches.length === 1 ? "match" : "matches"} found
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {currentMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  formatDate={memoizedFormatDate}
                  getDaysToGo={getDaysToGo}
                />
              ))}
            </div>
          </>
        ) : (
          renderEmptyState()
        )}

        {/* API Error Notice */}
        {hasCurrentTabError &&
          (selectedTab === "prem" || selectedTab === "champ") && (
            <div className="mt-8 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg text-center">
              <p className="text-orange-700 dark:text-orange-400 text-sm mb-2">
                ⚠️ Unable to load matches from API. Please check your connection
                and try again.
              </p>
              <Button
                onClick={handleRefresh}
                className="bg-orange-600 hover:bg-orange-700 text-white"
                disabled={isCurrentTabLoading}
              >
                <RotateCcw
                  className={`w-4 h-4 mr-2 ${
                    isCurrentTabLoading ? "animate-spin" : ""
                  }`}
                />
                {isCurrentTabLoading ? "Retrying..." : "Retry"}
              </Button>
            </div>
          )}
      </div>
    </section>
  );
};

export default Schedule;
