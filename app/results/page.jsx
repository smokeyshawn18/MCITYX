"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Loader2, Award, MapPin, User, Users } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ManCityStandings from "@/components/PointsTable";
import { useUser } from "@clerk/nextjs";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Results() {
  const {isSignedIn} = useUser()
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
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

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
            <p className="text-lg font-medium">No recent results available.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentMatches.map((match) => {
                const { homeTeam, awayTeam, score, utcDate, competition, id } = match;
                const homeScore = score?.fullTime?.home ?? 0;
                const awayScore = score?.fullTime?.away ?? 0;

                const details = matchDetailsMap[id];
                const goalScorers = details?.scorers || [];
                const motm = details?.motm || null;
                const referee = details?.referee || null;
                const attendance = details?.attendance || null;

                return (
                  <div
                    key={id}
                    className="bg-sky-100 dark:bg-gray-900 rounded-2xl p-6 border border-[#1A4268]/30 hover:border-[#1A4268]/70 transition-all hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center justify-between gap-4">
                        <Image
                          src={homeTeam.crest}
                          alt={homeTeam.name}
                          width={60}
                          height={60}
                          className="rounded-full border-2 border-[#1A4268]/50"
                          unoptimized={!homeTeam.crest.startsWith("/")}
                        />
                        <div className="text-center">
                          <span className="text-[#1A4268] dark:text-sky-200 font-bold text-3xl">
                            {homeScore} - {awayScore}
                          </span>
                          <p className="text-sm mt-1 font-semibold text-black dark:text-white">
                            Final Score
                          </p>
                        </div>
                        <Image
                          src={awayTeam.crest}
                          alt={awayTeam.name}
                          width={60}
                          height={60}
                          className="rounded-full border-2 border-[#1A4268]/50"
                          unoptimized={!awayTeam.crest.startsWith("/")}
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2">
                          <Image
                            src={competition.emblem}
                            alt={competition.name}
                            width={60}
                            height={60}
                            className="rounded-xl"
                            unoptimized={!competition.emblem.startsWith("/")}
                          />
                          <span className="font-semibold uppercase tracking-wider dark:text-white text-black">
                            | {competition.name}
                          </span>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                          <Clock className="w-4 h-4 text-[#1A4268] dark:text-sky-300" />
                          <span className="text-sm font-medium dark:text-white text-black">
                            {formatDate(utcDate)}
                          </span>
                        </div>

                        {referee && (
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-[#1A4268]" />
                            <span className="text-sm dark:text-white text-black">
                              Referee: <strong>{referee}</strong>
                            </span>
                          </div>
                        )}

                        {goalScorers.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-[#1A4268] dark:text-sky-200">Goal Scorers:</h4>
                            <ul className="list-disc list-inside text-sm dark:text-white">
                              {goalScorers.map((scorer, idx) => (
                                <li key={idx}>
                                  {scorer.player?.name || scorer.name} - {scorer.minute}'
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {motm && (
                          <div className="flex items-center gap-2 mt-1">
                            <Award className="w-5 h-5 text-yellow-400" />
                            <span className="font-semibold text-[#1A4268] dark:text-sky-200">
                              Man of the Match: {motm.name}
                            </span>
                          </div>
                        )}

                        {attendance && (
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#1A4268]" />
                            <span className="text-sm dark:text-white text-black">
                              Attendance: <strong>{attendance.toLocaleString()}</strong>
                            </span>
                          </div>
                        )}
                      </div>

                      <Button
                        onClick={() => fetchMatchDetails(id)}
                        disabled={loadingDetailsId === id}
                        className="w-full bg-[#1E90FF] dark:bg-[#3A6EA5] hover:bg-[#1A4268] dark:hover:bg-[#103554] text-white py-2 px-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                      >
                        {loadingDetailsId === id ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          "Match Details"
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="font-medium text-[#1A4268] dark:text-sky-200">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
