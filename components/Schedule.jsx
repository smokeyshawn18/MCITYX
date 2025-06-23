"use client";

import React, { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";

const matches = [
  {
    id: 1,
    homeTeam: {
      name: "Man City",
      logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    },
    awayTeam: {
      name: "Wydad Casablanca",
      logo: "/assets/images/wydad.png",
    },
    kickoff: "2025-06-18T16:00:00Z",
    stage: "Group Stage - Round 1",
    venue: "Lincoln Financial Field, Philadelphia",
  },
  {
    id: 2,
    homeTeam: {
      name: "Man City",
      logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    },
    awayTeam: {
      name: "Al Ain",
      logo: "/assets/images/alalyn.png",
    },
    kickoff: "2025-06-23T01:00:00Z",
    stage: "Group Stage - Round 2",
    venue: "Mercedes-Benz Stadium, Atlanta",
  },
  {
    id: 3,
    homeTeam: {
      name: "Juventus",
      logo: "/assets/images/juv.jpg",
    },
    awayTeam: {
      name: "Man City",
      logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    },
    kickoff: "2025-06-26T19:00:00Z",
    stage: "Group Stage - Round 3",
    venue: "Camping World Stadium, Orlando",
  },
];

const daysToGo = (kickoff) => {
  const now = new Date();
  const kickoffDate = new Date(kickoff);
  const diff = kickoffDate - now;
  return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
};

export default function FifaCwcSchedule() {
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  useEffect(() => {
    const filtered = matches.filter(
      (match) => new Date(match.kickoff) > new Date()
    );
    setUpcomingMatches(filtered);
  }, []);

  return (
    <section className="min-h-screen bg-sky-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-sky-900 dark:text-white flex items-center justify-center gap-2">
          <CalendarDays size={30} className="text-sky-600 dark:text-white" />
          FIFA Club World Cup Schedule
        </h1>

        {upcomingMatches.map((match) => {
          const kickoffDate = new Date(match.kickoff);
          const daysLeft = daysToGo(match.kickoff);

          return (
            <div
              key={match.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center border border-sky-300 dark:border-gray-600"
            >
              {/* VS Section */}
              <div className="flex items-center justify-center gap-8 sm:gap-16 mb-6">
                {/* Team A */}
                <div className="flex flex-col items-center w-28">
                  <img
                    src={match.homeTeam.logo}
                    alt={match.homeTeam.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                  />
                  <p className="mt-3 text-lg sm:text-lg text-sky-900 dark:text-white font-extrabold text-center truncate max-w-[120px]">
                    {match.homeTeam.name}
                  </p>
                </div>

                {/* VS Text */}
                <div className="text-3xl sm:text-4xl font-extrabold text-sky-700 dark:text-white select-none">
                  vs
                </div>

                {/* Team B */}
                <div className="flex flex-col items-center w-28">
                  <img
                    src={match.awayTeam.logo}
                    alt={match.awayTeam.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                  />
                  <p className="mt-3 text-lg sm:text-lg text-sky-900 dark:text-white font-extrabold text-center truncate max-w-[120px]">
                    {match.awayTeam.name}
                  </p>
                </div>
              </div>

              {/* Match Info */}
              <div className="mb-6">
                <p className="text-lg font-bold text-sky-800 dark:text-gray-300 mb-2">
                  {match.stage}
                </p>
                <div className="text-gray-800 dark:text-gray-300 text-base font-semibold flex justify-center gap-4 items-center mb-2">
                  <Clock size={20} />
                  {kickoffDate.toLocaleString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-gray-800 dark:text-gray-300 text-base flex justify-center gap-3 items-center mb-3">
                  <MapPin size={20} />
                  {match.venue}
                </div>
                <span
                  className={`inline-block px-4 py-2 text-sm font-bold rounded-full ${
                    daysLeft <= 3
                      ? "bg-red-200 text-red-800 dark:bg-red-700 dark:text-white"
                      : "bg-green-200 text-green-800 dark:bg-green-700 dark:text-white"
                  }`}
                >
                  {daysLeft === 0
                    ? "Today"
                    : `${daysLeft} day${daysLeft > 1 ? "s" : ""} to go`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
