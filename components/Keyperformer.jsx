"use client";

import { useMemo } from "react";
import {
  FaFutbol,
  FaHandsHelping,
  FaFireAlt,
  FaRunning,
  FaTshirt,
} from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { CiMedicalCross } from "react-icons/ci";
import { players } from "@/data/players";
import Image from "next/image";
import { calculateAge } from "@/utils/playerAge";

// Set of hidden player names
const HIDDEN_NAMES = new Set([
  "İlkay Gündoğan",
  "Manuel Akanji",
  "King Kev (Napoli)",
  "Jack Grealish",
  "James McAtee",
  "C. Echeverri",
  "Ederson Moraes",
]);

const Keyperformer = () => {
  // Get active players (not hidden)
  const activePlayers = useMemo(
    () => players.filter((player) => !HIDDEN_NAMES.has(player.name)),
    []
  );

  // Get top 3 goal scorers
  const topScorers = useMemo(() => {
    return [...activePlayers]
      .sort((a, b) => b.seasonStats.goals - a.seasonStats.goals)
      .slice(0, 3);
  }, [activePlayers]);

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-200 mb-6 flex items-center">
        <FaFireAlt className="mr-2 text-amber-500" />
        Top Goal Scorers
      </h2>

      {/* Top Scorers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topScorers.map((player, index) => {
          const age = calculateAge(player.age);
          // Calculate rating
          const rating = (
            7 +
            (player.seasonStats.goals * 0.2 + player.seasonStats.assists * 0.1)
          ).toFixed(1);

          return (
            <div
              key={player.name}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Header with rank */}
              <div
                className={`
                h-2 w-full
                ${
                  index === 0
                    ? "bg-amber-500"
                    : index === 1
                    ? "bg-gray-400"
                    : "bg-amber-700"
                }
              `}
              ></div>

              {/* Content */}
              <div className="p-4">
                {/* Player image and basic info */}
                <div className="flex items-center mb-4">
                  <div className="relative flex-shrink-0">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-sky-200 dark:border-sky-800">
                      <Image
                        src={player.image}
                        alt={player.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-4 rounded overflow-hidden border border-white dark:border-gray-700 shadow-sm">
                      <Image
                        src={player.country}
                        alt="Country"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div
                      className={`
                      absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm
                      ${
                        index === 0
                          ? "bg-amber-500"
                          : index === 1
                          ? "bg-gray-400"
                          : "bg-amber-700"
                      }
                    `}
                    >
                      {index + 1}
                    </div>
                  </div>

                  <div className="ml-3">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                      {player.name}
                    </h3>
                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-300 mt-1 space-x-2">
                      <span className="flex items-center">
                        <FaTshirt className="mr-1 text-sky-600 dark:text-sky-400" />
                        {player.number}
                      </span>
                      <span>{player.position}</span>
                      <span>{age} yrs</span>
                    </div>
                  </div>
                </div>

                {/* Season Stats */}
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  {/* Rating */}
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow">
                      {rating}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Rating
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-10 w-px bg-gray-200 dark:bg-gray-600"></div>

                  {/* Stats */}
                  <div className="flex space-x-3">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center text-amber-500 font-bold">
                        <FaFutbol className="mr-1" />
                        {player.seasonStats.goals}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Goals
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex items-center text-green-500 font-bold">
                        <FaHandsHelping className="mr-1" />
                        {player.seasonStats.assists}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Assists
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex items-center text-blue-500 font-bold">
                        <FaRunning className="mr-1" />
                        {player.seasonStats.appearances}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Apps
                      </span>
                    </div>
                  </div>
                </div>

                {/* Injury Status - Only show if injured */}
                {player.injured && (
                  <div className="mt-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg p-2 text-xs">
                    <div className="flex items-center text-red-600 dark:text-red-400">
                      <CiMedicalCross className="mr-1" />
                      <span className="font-medium">
                        {player.injuryDetails.type}
                      </span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 mt-1 text-xs">
                      Return: {player.injuryDetails.recoveryTime}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Keyperformer;
