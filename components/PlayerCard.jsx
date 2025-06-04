"use client";
import {
  FaFutbol,
  FaMedal,
  FaRunning,
  FaTshirt,
  FaTrophy,
} from "react-icons/fa";
import { CiMedicalCross } from "react-icons/ci";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Handshake } from "lucide-react";

const PlayerCard = ({ player }) => {
  const [activeTab, setActiveTab] = useState("season");
  const [careerStats, setCareerStats] = useState(player.careerStats);

  useEffect(() => {
    if (player.position === "GK") {
      setCareerStats({
        appearances:
          player.careerStats.appearances + player.seasonStats.appearances,
        goalsConceded:
          player.careerStats.goalsConceded + player.seasonStats.goalsConceded,
        cleanSheets:
          player.careerStats.cleanSheets + player.seasonStats.cleanSheets,
      });
    } else {
      setCareerStats({
        appearances:
          player.careerStats.appearances + player.seasonStats.appearances,
        goals: player.careerStats.goals + player.seasonStats.goals,
        assists: player.careerStats.assists + player.seasonStats.assists,
      });
    }
  }, [player]); // Depend only on `player` to prevent unnecessary re-renders
  // Dependency array triggers when seasonStats or player position changes

  return (
    <div className="bg-gradient-to-br from-[#e6f1fa] to-white dark:from-[#1a1a2e] dark:to-[#16213e] rounded-3xl shadow-2xl p-6 sm:p-8 max-w-6xl w-full mx-auto mb-10">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* Player Image */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-[#6accf5] shadow-lg mx-auto lg:mx-0">
          <Image
            src={player.image}
            alt={player.name}
            fill
            className="object-cover"
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
            <div className="flex items-center gap-2">
              <Image
                src={player.country}
                alt="country"
                width={28}
                height={20}
                className="object-contain rounded-sm"
              />
            </div>
            <div>Age: {player.age}</div>
          </div>

          {/* Rating */}
          {player.fotmobRating && (
            <div className="mt-4 inline-block bg-green-600 text-white font-bold px-4 py-2 rounded-full text-sm shadow">
              Fotmob Rating: {player.fotmobRating}
            </div>
          )}

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
        {[
          {
            label: "Season",
            value: "season",
            icon: <FaMedal className="mr-2" />,
          },
          {
            label: "Career",
            value: "career",
            icon: <FaTrophy className="mr-2" />,
          },
        ].map((tab) => (
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
      {/* Stats */}
      <div className="mt-8 px-4 max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4 text-left">
          {(player.position === "GK"
            ? [
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
                  icon: (
                    <FaFutbol className="text-red-500 dark:text-red-400 text-xl" />
                  ),
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
              ]
            : [
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
                  label: "Goals",
                  value:
                    activeTab === "career"
                      ? careerStats.goals
                      : player.seasonStats.goals,
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
              ]
          ).map((stat, index) => (
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
};

export default PlayerCard;
