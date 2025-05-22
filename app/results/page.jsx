"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Loader2, Award, MapPin, User, Users } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ManCityStandings from "@/components/PointsTable";

export default function Results() {
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
    <section className="min-h-screen bg-sky-100 dark:bg-gray-950 dark:text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-800 dark:text-sky-200 text-center mb-12 flex items-center justify-center gap-3">
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
                const goalScorers = details?.match?.scorers ?? details?.scorers ?? [];
                const motm = details?.match?.motm ?? details?.motm ?? null;
                const venue = details?.match?.venue ?? details?.venue ?? "Unknown";
                const referee = details?.match?.referee ?? details?.referees?.[0]?.name ?? null;
                const attendance = details?.match?.attendance ?? null;

                return (
                  <div
                    key={id}
                    className="bg-sky-100 dark:bg-gray-900 rounded-2xl p-6 border border-[#1A4268]/30 hover:border-[#1A4268]/70 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 flex justify-center">
                          <Image
                            src={homeTeam.crest}
                            alt={homeTeam.name}
                            width={80}
                            height={80}
                            className="object-contain rounded-full border-2 border-[#1A4268]/50"
                            unoptimized={homeTeam.crest.startsWith("http") ? false : true}
                          />
                        </div>
                        <div className="text-center">
                          <span className="text-[#1A4268] dark:text-sky-200 font-bold text-3xl md:text-4xl">
                            {homeScore} - {awayScore}
                          </span>
                          <p className="text-black dark:text-white text-sm mt-1 font-semibold">
                            Final Score
                          </p>
                        </div>
                        <div className="flex-1 flex justify-center">
                          <Image
                            src={awayTeam.crest}
                            alt={awayTeam.name}
                            width={80}
                            height={80}
                            className="object-contain rounded-full border-2 border-[#1A4268]/50"
                            unoptimized={awayTeam.crest.startsWith("http") ? false : true}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-3">
                          <Image
                            src={competition.emblem}
                            alt={competition.name}
                            width={80}
                            height={80}
                            className="object-contain rounded-xl"
                            unoptimized={competition.emblem.startsWith("http") ? false : true}
                          />
                          <span className="text-black dark:text-white font-semibold uppercase tracking-wider">
                            | {competition.name}
                          </span>
                        </div>

                        <div className="flex items-center justify-center gap-3">
                          <Clock className="w-5 h-5 text-[#1A4268] dark:text-sky-300" />
                          <span className="text-black dark:text-white text-sm md:text-base font-medium">
                            {formatDate(utcDate)}
                          </span>
                        
                        </div>
                          {referee && (
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-[#1A4268]" />
                                <span className="text-sm text-black dark:text-white">
                                  Referee: <strong>{referee}</strong>
                                </span>
                              </div>
                            )}

                        {goalScorers.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-[#1A4268] dark:text-sky-200">
                              Goal Scorers:
                            </h4>
                            <ul className="list-disc list-inside text-sm dark:text-white">
                              {goalScorers.map((scorer, idx) => (
                                <li key={idx}>
                                  {scorer.player?.name || scorer.name} (
                                  {scorer.team?.name || "Unknown Team"}) - {scorer.minute}'
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {motm && (
                          <div className="flex items-center gap-2 mt-2">
                            <Award className="w-5 h-5 text-yellow-400" />
                            <span className="font-semibold text-[#1A4268] dark:text-sky-200">
                              Man of the Match: {motm.name}
                            </span>
                          </div>
                        )}

                        {/* Extra Match Info */}
                        {details && (
                          <div className="space-y-2 pt-3 border-t border-[#1A4268]/20">
                            {/* <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-[#1A4268]" />
                              <span className="text-sm text-black dark:text-white">
                                Venue: <strong>{venue}</strong>
                              </span>
                            </div> */}
                            
                            {attendance && (
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-[#1A4268]" />
                                <span className="text-sm text-black dark:text-white">
                                  Attendance: <strong>{attendance.toLocaleString()}</strong>
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <Button
                        disabled={loadingDetailsId === id}
                        onClick={() => fetchMatchDetails(id)}
                        className="w-full bg-[#1E90FF] dark:bg-[#3A6EA5] hover:bg-[#1A4268] dark:hover:bg-[#103554] text-white py-2 px-4 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loadingDetailsId === id ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
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

            <div className="flex justify-center items-center mt-10 gap-4">
              <Button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="bg-[#1A4268] hover:bg-[#103554] text-white px-4 py-2 rounded"
              >
                Previous
              </Button>
              <span className="text-[#1A4268] dark:text-sky-300 font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="bg-[#1A4268] hover:bg-[#103554] text-white px-4 py-2 rounded"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>

<div className="mt-6">
    <ManCityStandings/>
</div>

    </section>
  );
}
