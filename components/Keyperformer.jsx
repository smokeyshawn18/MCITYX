"use client";

import { useMemo } from "react";
import {
  FaFutbol,
  FaHandsHelping,
  FaFireAlt,
  FaTshirt,
  FaStar,
  FaRunning,
  FaCalendarAlt,
  FaEuroSign,
} from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { CiMedicalCross } from "react-icons/ci";
import { players } from "@/data/players";
import Image from "next/image";
import { calculateAge } from "@/utils/playerAge";
import { ratePlayer } from "@/utils/ratePlayer";

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
    <div className="bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-sky-800 dark:text-sky-200 mb-8 flex items-center">
        <FaFireAlt className="mr-3 text-amber-500 text-2xl" />
        Top Goal Scorers
      </h2>

      {/* Top Scorers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {topScorers.map((player, index) => {
          const age = calculateAge(player.age);
          // Calculate rating using the same system as PlayerCard
          const rating = ratePlayer(player);

          return (
            <div
              key={player.name}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-sky-100 dark:border-sky-800"
            >
              {/* Header with rank */}
              <div
                className={`
                h-4 w-full
                ${
                  index === 0
                    ? "bg-gradient-to-r from-sky-400 to-sky-600"
                    : index === 1
                    ? "bg-gradient-to-r from-blue-300 to-blue-500"
                    : "bg-gradient-to-r from-sky-600 to-blue-800"
                }
              `}
              ></div>

              {/* Content */}
              <div className="p-8">
                {/* Player image and basic info */}
                <div className="flex items-center mb-8">
                  <div className="relative flex-shrink-0">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-sky-300 dark:border-sky-600 shadow-xl">
                      <Image
                        src={player.image}
                        alt={player.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-10 h-7 rounded overflow-hidden border-2 border-white dark:border-gray-700 shadow-lg">
                      <Image
                        src={player.country}
                        alt="Country"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div
                      className={`
                      absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg
                      ${
                        index === 0
                          ? "bg-gradient-to-br from-amber-400 to-amber-600"
                          : index === 1
                          ? "bg-gradient-to-br from-gray-300 to-gray-500"
                          : "bg-gradient-to-br from-amber-600 to-amber-800"
                      }
                    `}
                    >
                      {index + 1}
                    </div>
                  </div>

                  <div className="ml-6 flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-2xl mb-2">
                      {player.name}
                    </h3>
                    <div className="flex items-center text-base text-gray-700 dark:text-gray-200 space-x-4 mb-3">
                      <span className="flex items-center">
                        <FaTshirt className="mr-2 text-sky-600 dark:text-sky-400" />
                        {player.number}
                      </span>
                      <span className="font-semibold">{player.position}</span>
                      <span className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-green-600 dark:text-green-400" />
                        {age} yrs
                      </span>
                    </div>
                    <div className="flex items-center text-base text-gray-700 dark:text-gray-200">
                      <span className="font-bold text-lg">
                        ${player.value}M
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="flex justify-center mb-8">
                  <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-full px-6 py-3 flex items-center text-white font-bold text-lg shadow-xl">
                    <MdStars className="mr-3 text-yellow-300 text-xl" />
                    {rating} Rating
                  </div>
                </div>

                {/* Season Stats */}
                <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/30 rounded-2xl p-6 mb-6 border border-sky-200 dark:border-sky-700">
                  <h4 className="text-lg font-bold text-sky-800 dark:text-sky-200 mb-4 text-center">
                    2025/26 Season Stats
                  </h4>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center text-amber-600 dark:text-amber-400 font-bold text-2xl">
                        <FaFutbol className="mr-2 text-xl" />
                        {player.seasonStats.goals}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300 mt-2 font-medium">
                        Goals
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex items-center text-green-600 dark:text-green-400 font-bold text-2xl">
                        <FaHandsHelping className="mr-2 text-xl" />
                        {player.seasonStats.assists}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300 mt-2 font-medium">
                        Assists
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-bold text-2xl">
                        <FaRunning className="mr-2 text-xl" />
                        {player.seasonStats.appearances}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300 mt-2 font-medium">
                        Apps
                      </span>
                    </div>
                  </div>
                </div>

                {/* Career Highlights */}
                <div className="bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/40 dark:to-blue-900/40 rounded-xl p-4 mb-6 border border-sky-300 dark:border-sky-600">
                  <h4 className="text-base font-bold text-sky-900 dark:text-sky-100 mb-3 text-center">
                    Career Totals
                  </h4>
                  <div className="flex justify-between text-sm text-gray-700 dark:text-gray-200 font-medium">
                    <span>
                      Goals:{" "}
                      {player.careerStats.goals + player.seasonStats.goals}{" "}
                    </span>
                    <span>
                      Assists:{" "}
                      {player.careerStats.assists + player.seasonStats.assists}
                    </span>
                    <span>
                      Apps:{" "}
                      {player.careerStats.appearances +
                        player.seasonStats.appearances}
                    </span>
                  </div>
                </div>

                {/* Injury Status - Only show if injured */}
                {player.injured && (
                  <div className="mt-6 bg-red-50 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 rounded-xl p-4">
                    <div className="flex items-center text-red-700 dark:text-red-300 mb-2">
                      <CiMedicalCross className="mr-3 text-xl" />
                      <span className="font-bold text-base">
                        {player.injuryDetails.type}
                      </span>
                    </div>
                    <div className="text-gray-700 dark:text-gray-200 text-sm font-medium">
                      Expected return: {player.injuryDetails.recoveryTime}
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
