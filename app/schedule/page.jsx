"use client";

import { useState, useEffect, useMemo } from "react";
import { Calendar, Loader2, RotateCcw } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

// Import modular components
import MatchCard from "./components/MatchCard";
import { manualMatches, tabs, getDaysToGo } from "./components/manualMatches";
import { formatDate, TIME_FORMATS, TimeToggle } from "./components/timeUtils";

const Schedule = () => {
  const [apiMatches, setApiMatches] = useState([]);
  const [selectedTab, setSelectedTab] = useState("fifa");
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [timeFormat, setTimeFormat] = useState(TIME_FORMATS.LOCAL_12);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("/api/matches");
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${data.message || 'Failed to fetch'}`);
        }

        const upcoming = Array.isArray(data?.matches)
          ? data.matches.filter((m) => m.status === "TIMED")
          : [];
        
        upcoming.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));
        setApiMatches(upcoming);
        setApiError(false);
        
        if (upcoming.length > 0) {
          toast.success(`Loaded ${upcoming.length} matches from API`);
        }
      } catch (error) {
        console.error("API Error:", error);
        setApiMatches([]);
        setApiError(true);
        toast.error("Could not connect to matches API");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Categorize API matches by competition
  const categorizeApiMatches = useMemo(() => {
    const categorized = {
      premier: [],
      champions: []
    };

    apiMatches.forEach(match => {
      const compName = match.competition.name.toLowerCase();
      if (compName.includes("premier") || compName.includes("pl") || compName.includes("epl")) {
        categorized.premier.push(match);
      } else if (compName.includes("champions") || compName.includes("ucl") || compName.includes("cl")) {
        categorized.champions.push(match);
      }
    });

    return categorized;
  }, [apiMatches]);

  // Get matches for current tab
  const getCurrentMatches = () => {
    switch (selectedTab) {
      case "fifa":
        return manualMatches;
      case "prem":
        return categorizeApiMatches.premier;
      case "champ":
        return categorizeApiMatches.champions;
      default:
        return [];
    }
  };

  const currentMatches = getCurrentMatches();

  const renderEmptyState = () => {
    const currentTab = tabs.find(t => t.key === selectedTab);
    
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-6xl mb-4">📅</div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No matches scheduled
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
          {selectedTab === "fifa" 
            ? "FIFA Club World Cup matches will appear here when scheduled."
            : `${currentTab?.description} matches will appear here when available from the API.`
          }
        </p>
        {(selectedTab === "prem" || selectedTab === "champ") && (
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-sky-600 hover:bg-sky-700 text-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        )}
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
            <Calendar className="w-10 h-10 text-sky-600" />
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

        {/* Enhanced Tabs */}
        <div className="flex justify-center gap-2 sm:gap-6 mb-8 overflow-x-auto pb-2">
          {tabs.map(({ key, label, img, color, description }) => {
            const isActive = selectedTab === key;
            const hasData = key === "fifa" ? manualMatches.length > 0 : 
                           key === "prem" ? categorizeApiMatches.premier.length > 0 :
                           categorizeApiMatches.champions.length > 0;
            
            return (
              <button
                key={key}
                onClick={() => setSelectedTab(key)}
                className={`group flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 min-w-[120px] ${
                  isActive
                    ? `bg-gradient-to-br ${color} text-white shadow-xl scale-105`
                    : "bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:scale-102 hover:shadow-lg text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className={`relative ${isActive ? 'scale-110' : 'group-hover:scale-105'} transition-transform duration-300`}>
                  <Image
                    src={img}
                    alt={label}
                    width={48}
                    height={48}
                    className="object-contain"
                    unoptimized
                  />
                  {hasData && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="text-center">
                  <span className="text-sm font-bold">{label}</span>
                  {!hasData && (key === "prem" || key === "champ") && !loading && (
                    <div className="text-xs opacity-75 mt-1">No data</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-sky-600 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading matches...</p>
          </div>
        ) : currentMatches.length > 0 ? (
          <>
            <div className="text-center mb-6">
              <span className="inline-block bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 px-4 py-2 rounded-full text-sm font-semibold">
                {currentMatches.length} {currentMatches.length === 1 ? 'match' : 'matches'} found
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {currentMatches.map(match => (
                <MatchCard 
                  key={match.id}
                  match={match}
                  formatDate={(date) => formatDate(date, timeFormat)}
                  getDaysToGo={getDaysToGo}
                />
              ))}
            </div>
          </>
        ) : (
          renderEmptyState()
        )}

        {/* API Status Footer */}
        {apiError && (selectedTab === "prem" || selectedTab === "champ") && (
          <div className="mt-8 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg text-center">
            <p className="text-orange-700 dark:text-orange-400 text-sm">
              ⚠️ Unable to load matches from API. Please check your connection and try again.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Schedule;