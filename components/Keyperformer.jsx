"use client";

import { useMemo } from "react";
import {
  FaFutbol,
  FaHandsHelping,
  FaFireAlt,
  FaTshirt,
  FaRunning,
  FaCalendarAlt,
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
    <div className="bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg p-6 max-w-6xl mx-auto overflow-x-auto">
      <h2 className="text-3xl font-extrabold text-sky-800 dark:text-sky-200 mb-6 flex items-center justify-center md:justify-start">
        <FaFireAlt className="mr-3 text-amber-500 text-2xl" />
        Top Goal Scorers
      </h2>

      <table className="min-w-full table-auto  border-spacing-y-2 border-spacing-x-0  border border-transparent">
        <thead className="bg-sky-200 dark:bg-sky-800 font-extrabold text-sky-900 dark:text-sky-200 uppercase rounded-lg">
          <tr>
            {[
              "#",
              "Player",
              "Position",
              "Age",
              "Apps",
              "Goals",
              "Assists",
              "Value",
              "Rating",
              "Country",
            ].map((header) => (
              <th
                key={header}
                className={`p-3 text-left ${
                  ["Goals", "Assists", "Apps", "Value"].includes(header)
                    ? "text-right"
                    : ""
                } ${header === "#" ? "w-8" : "w-auto"}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {topScorers.map((player, index) => {
            const age = calculateAge(player.age);
            const rating = ratePlayer(player);

            return (
              <tr
                key={player.name}
                className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition mb-2`}
              >
                {/* Rank */}
                <td className="pl-4 pr-2 py-3 font-extrabold text-sky-700 dark:text-sky-400 text-center">
                  {index + 1}
                </td>

                {/* Player + Image */}
                <td className="flex items-center space-x-3 p-3 font-semibold text-gray-900 dark:text-white max-w-[180px] truncate">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-sky-300 dark:border-sky-600 shadow-lg flex-shrink-0">
                    <Image
                      src={player.image}
                      alt={player.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span title={player.name} className="truncate">
                    {player.name}
                  </span>
                </td>

                {/* Position */}
                <td className="p-3 font-semibold text-sky-700 dark:text-sky-400">
                  {player.position}
                </td>

                {/* Age */}
                <td className="p-3 font-semibold text-sky-700 dark:text-sky-400">
                  {age}
                </td>
                {/* Apps */}
                <td className="p-3 font-extrabold text-blue-800 dark:text-blue-400 text-right">
                  {player.seasonStats.appearances}
                </td>

                {/* Goals */}
                <td className="p-3 font-extrabold text-black dark:text-amber-400 text-right">
                  {player.seasonStats.goals}
                </td>

                {/* Assists */}
                <td className="p-3 font-extrabold text-green-600 dark:text-green-400 text-right">
                  {player.seasonStats.assists}
                </td>

                {/* Value */}
                <td className="p-3 font-extrabold text-gray-900 dark:text-white text-right">
                  ${player.value}M
                </td>

                {/* Rating */}
                <td className="p-3 font-extrabold text-green-800 dark:text-yellow-300 text-center">
                  {rating}
                </td>

                {/* Country */}
                <td className="p-3 text-center">
                  <div className="relative w-6 h-4 rounded overflow-hidden mx-auto">
                    <Image
                      src={player.country}
                      alt="Country"
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Keyperformer;
