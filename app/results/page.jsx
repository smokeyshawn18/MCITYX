"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Loader2,
  Award,
  MapPin,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ManCityStandings from "@/components/PointsTable";
import { useUser } from "@clerk/nextjs";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Results() {
  const { isSignedIn } = useUser();
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [loadingDetailsId, setLoadingDetailsId] = useState(null);
  const [matchDetailsMap, setMatchDetailsMap] = useState({});
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 6;

  useEffect(() => {
    async function fetchMatches() {
      setError(null);
      setLoadingMatches(true);
      try {
        const res = await fetch("/api/matches");
        if (!res.ok) throw new Error("Failed to fetch matches");
        const data = await res.json();

        if (data.matches && Array.isArray(data.matches)) {
          const finishedMatches = data.matches.filter(
            (m) => m.status === "FINISHED"
          );
          finishedMatches.sort(
            (a, b) => new Date(b.utcDate) - new Date(a.utcDate)
          );
          setMatches(finishedMatches);
        } else {
          setError("Unexpected data format.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingMatches(false);
      }
    }

    fetchMatches();
  }, []);

  async function fetchMatchDetails(id) {
    if (matchDetailsMap[id]) return;
    setLoadingDetailsId(id);
    try {
      const res = await fetch(`/api/matches/${id}`, { cache: "no-store" });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch match details: ${text}`);
      }
      const data = await res.json();
      setMatchDetailsMap((prev) => ({ ...prev, [id]: data }));
    } catch (err) {
      alert(err.message);
    } finally {
      setLoadingDetailsId(null);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalPages = Math.ceil(matches.length / matchesPerPage);
  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <ProtectedRoute>
      <section className="min-h-screen bg-sky-100 dark:bg-gray-950 dark:text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-sky-800 dark:text-sky-200 text-center mb-12 flex items-center justify-center gap-3">
            <Calendar className="w-8 h-8 text-[#1A4268] dark:text-sky-300" />
            Recent Results
          </h1>

          {loadingMatches ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <Loader2 className="w-12 h-12 text-[#1A4268] dark:text-white animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 dark:text-red-400 py-20">
              <p className="text-lg font-medium">{error}</p>
            </div>
          ) : matches.length === 0 ? (
            <div className="text-center text-black/80 dark:text-white/80 py-20">
              <p className="text-lg font-medium">
                No recent results available.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentMatches.map((match) => {
                  const {
                    homeTeam,
                    awayTeam,
                    score,
                    utcDate,
                    competition,
                    id,
                  } = match;
                  const homeScore = score?.fullTime?.home ?? 0;
                  const awayScore = score?.fullTime?.away ?? 0;

                  const details = matchDetailsMap[id];
                  const goalScorers = details?.scorers || [];
                  const motm = details?.motm || null;
                  const referee = details?.referee || null;
                  const attendance = details?.attendance || null;

                  return (
                    // Manchester City Match Card Component
                    <div
                      key={id}
                      className="group relative bg-gradient-to-br from-sky-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 border-2 border-sky-200/50 dark:border-slate-700/50 hover:border-sky-400 dark:hover:border-sky-600 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-200/20 dark:hover:shadow-sky-900/20 hover:-translate-y-2 backdrop-blur-sm"
                    >
                      {/* Decorative accent */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600 rounded-t-3xl"></div>

                      <div className="space-y-6">
                        {/* Team vs Team Header */}
                        <div className="flex items-center justify-between">
                          {/* Home Team */}
                          <div className="flex flex-col items-center space-y-2 flex-1">
                            <div className="relative">
                              <Image
                                src={homeTeam.crest}
                                alt={homeTeam.name}
                                width={64}
                                height={64}
                                className="rounded-full shadow-lg ring-4 ring-sky-100 dark:ring-slate-700 transition-transform group-hover:scale-105"
                                unoptimized={!homeTeam.crest.startsWith("/")}
                              />
                            </div>
                            <div className="text-center">
                              <p className="font-bold text-sky-800 dark:text-sky-200 text-sm leading-tight">
                                {homeTeam.shortName || homeTeam.name}
                              </p>
                            </div>
                          </div>

                          {/* Score Section */}
                          <div className="flex flex-col items-center space-y-2 px-6">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl px-6 py-4 shadow-lg border border-sky-100 dark:border-slate-600">
                              <div className="text-center">
                                <div className="text-4xl font-black text-sky-800 dark:text-sky-200 mb-1">
                                  {homeScore} - {awayScore}
                                </div>
                                <div className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                                  Final Score
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Away Team */}
                          <div className="flex flex-col items-center space-y-2 flex-1">
                            <div className="relative">
                              <Image
                                src={awayTeam.crest}
                                alt={awayTeam.name}
                                width={64}
                                height={64}
                                className="rounded-full shadow-lg ring-4 ring-sky-100 dark:ring-slate-700 transition-transform group-hover:scale-105"
                                unoptimized={!awayTeam.crest.startsWith("/")}
                              />
                            </div>
                            <div className="text-center">
                              <p className="font-bold text-sky-800 dark:text-sky-200 text-sm leading-tight">
                                {awayTeam.shortName || awayTeam.name}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Competition & Date Info */}
                        <div className="space-y-4">
                          {/* Competition */}
                          <div className="flex items-center justify-center space-x-3 p-3 bg-white/80 dark:bg-slate-800/80 rounded-2xl backdrop-blur-sm border border-sky-100 dark:border-slate-700">
                            <Image
                              src={competition.emblem}
                              alt={competition.name}
                              width={40}
                              height={40}
                              className="rounded-lg shadow-sm"
                              unoptimized={!competition.emblem.startsWith("/")}
                            />
                            <span className="font-bold text-sky-800 dark:text-sky-200 text-sm tracking-wide">
                              {competition.name}
                            </span>
                          </div>

                          {/* Match Date */}
                          <div className="flex items-center justify-center space-x-2 p-2 bg-sky-100/70 dark:bg-slate-700/70 rounded-xl">
                            <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                            <span className="text-sm font-semibold text-sky-700 dark:text-sky-300">
                              {formatDate(utcDate)}
                            </span>
                          </div>
                        </div>

                        {/* Match Details */}
                        <div className="space-y-3">
                          {referee && (
                            <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                              <div className="w-8 h-8 bg-sky-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                              </div>
                              <span className="text-sm font-medium text-sky-800 dark:text-sky-200">
                                <span className="text-sky-600 dark:text-sky-400">
                                  Referee:
                                </span>{" "}
                                {referee}
                              </span>
                            </div>
                          )}

                          {attendance && (
                            <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                              <div className="w-8 h-8 bg-sky-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                                <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                              </div>
                              <span className="text-sm font-medium text-sky-800 dark:text-sky-200">
                                <span className="text-sky-600 dark:text-sky-400">
                                  Attendance:
                                </span>{" "}
                                <span className="font-bold">
                                  {attendance.toLocaleString()}
                                </span>
                              </span>
                            </div>
                          )}

                          {goalScorers.length > 0 && (
                            <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-4">
                              <h4 className="font-bold text-sky-800 dark:text-sky-200 mb-3 text-sm flex items-center space-x-2">
                                <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                                <span>Goal Scorers</span>
                              </h4>
                              <div className="space-y-2">
                                {goalScorers.map((scorer, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center space-x-3"
                                  >
                                    <div className="w-6 h-6 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                      {scorer.minute}'
                                    </div>
                                    <span className="text-sm font-medium text-sky-800 dark:text-sky-200">
                                      {scorer.player?.name || scorer.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {motm && (
                            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                                  <Award className="w-5 h-5 text-yellow-900" />
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 uppercase tracking-wide">
                                    Man of the Match
                                  </p>
                                  <p className="font-bold text-yellow-800 dark:text-yellow-200">
                                    {motm.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        <Button
                          onClick={() => fetchMatchDetails(id)}
                          disabled={loadingDetailsId === id}
                          className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 dark:from-sky-700 dark:to-blue-700 dark:hover:from-sky-800 dark:hover:to-blue-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {loadingDetailsId === id ? (
                            <div className="flex items-center justify-center space-x-2">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Loading Details...</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center space-x-2">
                              <span>View Match Details</span>
                              <div className="w-2 h-2 bg-white rounded-full opacity-75"></div>
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center mt-10 gap-6">
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="font-medium text-[#1A4268] dark:text-sky-200">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
}
