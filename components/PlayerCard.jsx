"use client";

import {
  FaFutbol,
  FaMedal,
  FaRunning,
  FaTshirt,
  FaTrophy,
} from "react-icons/fa";
import { CiMedicalCross } from "react-icons/ci";
import Image from "next/image";
import { Handshake } from "lucide-react";
import { useState, useMemo } from "react";
import { ratePlayer } from "@/utils/ratePlayer";
import { calculateAge } from "@/utils/playerAge";

const HIDDEN_NAMES = new Set(["King Kev (Napoli)", "Jack Grealish"]);

const TABS = [
  { label: "Season", value: "season", icon: <FaMedal className="mr-2" /> },
  { label: "Career", value: "career", icon: <FaTrophy className="mr-2" /> },
];

export default function PlayerCard({ player }) {
  // Skip rendering completely for hidden players
  if (HIDDEN_NAMES.has(player.name)) return null;

  const [activeTab, setActiveTab] = useState("season");

  // Memoized player rating
  const rating = useMemo(() => ratePlayer(player), [player]);

  // Memoized combined career stats
  const careerStats = useMemo(() => {
    if (player.position === "GK") {
      return {
        appearances:
          player.careerStats.appearances + player.seasonStats.appearances,
        goalsConceded:
          player.careerStats.goalsConceded + player.seasonStats.goalsConceded,
        cleanSheets:
          player.careerStats.cleanSheets + player.seasonStats.cleanSheets,
      };
    }
    return {
      appearances:
        player.careerStats.appearances + player.seasonStats.appearances,
      goals: player.careerStats.goals + player.seasonStats.goals,
      assists: player.careerStats.assists + player.seasonStats.assists,
    };
  }, [player]);

  // Memoized stat list for rendering
  const statList = useMemo(() => {
    if (player.position === "GK") {
      return [
        {
          label: "Matches",
          value:
            activeTab === "career"
              ? careerStats.appearances
              : player.seasonStats.appearances,
          icon: (
            <FaRunning className="text-sky-600 dark:text-sky-300 text-xl" />
          ),
        },
        {
          label: "Goals Conceded",
          value:
            activeTab === "career"
              ? careerStats.goalsConceded
              : player.seasonStats.goalsConceded,
          icon: <FaFutbol className="text-red-500 dark:text-red-400 text-xl" />,
        },
        {
          label: "Clean Sheets",
          value:
            activeTab === "career"
              ? careerStats.cleanSheets
              : player.seasonStats.cleanSheets,
          icon: (
            <FaTrophy className="text-green-500 dark:text-green-300 text-xl" />
          ),
        },
      ];
    }
    return [
      {
        label: "Matches",
        value:
          activeTab === "career"
            ? careerStats.appearances
            : player.seasonStats.appearances,
        icon: <FaRunning className="text-sky-600 dark:text-sky-300 text-xl" />,
      },
      {
        label: "Goals",
        value:
          activeTab === "career" ? careerStats.goals : player.seasonStats.goals,
        icon: (
          <FaFutbol className="text-yellow-500 dark:text-yellow-300 text-xl" />
        ),
      },
      {
        label: "Assists",
        value:
          activeTab === "career"
            ? careerStats.assists
            : player.seasonStats.assists,
        icon: (
          <Handshake className="text-green-600 dark:text-green-300 text-xl" />
        ),
      },
    ];
  }, [activeTab, careerStats, player]);

  return (
    <div className="bg-gradient-to-br from-[#e6f1fa] to-white dark:from-[#1a1a2e] dark:to-[#16213e] rounded-3xl shadow-2xl p-6 sm:p-8 max-w-6xl w-full mx-auto mb-10">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* Player Image */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-3">
          <Image
            src={player.image}
            fill
            alt={player.name}
            className="w-full h-full rounded-full object-cover shadow-md"
          />
          <Image
            src={player.country}
            width={10}
            height={10}
            alt={`${player.name} country`}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-lg border-2 border-white object-cover shadow"
          />
        </div>

        {/* Player Info */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-2xl font-extrabold text-[#1e3a8a] dark:text-white uppercase tracking-wide mb-3">
            {player.name}
          </h1>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-gray-800 dark:text-gray-200 text-base font-medium">
            <div className="flex items-center gap-2">
              <FaTshirt className="text-[#6CABDD]" />#{player.number}
            </div>
            <div className="flex items-center gap-2">💰 ${player.value}M</div>
            <div className="flex items-center gap-2">🧭 {player.position}</div>
            <div>Age: {calculateAge(player.age)}</div>
          </div>

          {/* Player Rating */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-800 dark:bg-sky-200 text-white dark:text-sky-900 text-lg font-extrabold shadow-lg">
              {rating}
            </div>
            <div>
              <span className="text-base tracking-wide text-sky-900 dark:text-sky-200 font-semibold">
                Player Rating
              </span>
            </div>
          </div>

          {/* Injury Info */}
          {player.injured && (
            <div className="bg-red-100 dark:bg-red-900 mt-4 p-4 rounded-xl shadow-md">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-semibold">
                <CiMedicalCross className="text-xl" />
                {player.injuryDetails.type} / {player.injuryDetails.tm}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Expected return: {player.injuryDetails.recoveryTime}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center lg:justify-start gap-4 mt-6 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            className={`flex items-center px-5 py-2 rounded-xl text-lg font-semibold transition ${
              activeTab === tab.value
                ? "bg-[#1e3a8a] text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-700 text-[#1e3a8a] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-8 px-4 max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4 text-left">
          {statList.map((stat, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b last:border-none pb-2 text-lg font-medium text-gray-700 dark:text-gray-200"
            >
              <div className="flex items-center gap-2">
                {stat.icon}
                <span>{stat.label}</span>
              </div>
              <span className="font-bold text-[#1e3a8a] dark:text-white">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
