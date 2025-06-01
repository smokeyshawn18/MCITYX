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
    <div className="bg-gradient-to-br from-[#e6f1fa] to-white dark:from-[#1a1a2e] dark:to-[#16213e] rounded-3xl shadow-2xl p-8 max-w-6xl w-full mx-auto mb-10">
      {/* Top section: Image & Name */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
        {/* Player Image */}
        <div className="relative w-24 h-24 mx-auto mt-4 rounded-full overflow-hidden bg-[#6accf5] shadow-lg clip-star">
          <Image
            src={player.image}
            alt={player.name}
            quality={100}
            fill
            className="object-cover"
          />
        </div>

        {/* Player Info */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-xl lg:text-xl font-extrabold text-[#1e3a8a] dark:text-white uppercase tracking-wide mb-4">
            {player.name}
          </h1>

          <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-lg text-gray-800 dark:text-gray-200 font-medium">
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
            Age: {player.age}
          </div>

          {/* Rating Badge */}
          {player.fotmobRating && (
            <div className="mt-4 inline-block bg-green-600 text-white font-bold px-4 py-2 rounded-full shadow-md text-sm">
              Fotmob Rating: {player.fotmobRating}
            </div>
          )}

          {/* Injury */}
          {player.injured && (
            <div className="bg-red-100 dark:bg-red-900 mt-4 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <CiMedicalCross className="text-red-600 text-xl" />
                <span className="text-red-700 dark:text-red-400 font-semibold text-base">
                  {player.injuryDetails.type} / {player.injuryDetails.tm}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Expected return: {player.injuryDetails.recoveryTime}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center lg:justify-start gap-4 mt-8">
        <button
          className={`px-6 py-2 rounded-xl text-lg font-semibold transition ${
            activeTab === "season"
              ? "bg-[#1e3a8a] text-white shadow-lg"
              : "bg-gray-100 dark:bg-gray-700 text-[#1e3a8a] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={() => setActiveTab("season")}
        >
          <FaMedal className="inline mr-2" />
          Season
        </button>
        <button
          className={`px-6 py-2 rounded-xl text-lg font-semibold transition ${
            activeTab === "career"
              ? "bg-[#1e3a8a] text-white shadow-lg"
              : "bg-gray-100 dark:bg-gray-700 text-[#1e3a8a] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={() => setActiveTab("career")}
        >
          <FaTrophy className="inline mr-2" />
          Career
        </button>
      </div>

      <div className="mt-8 px-4 max-w-screen-sm mx-auto">
        <div
          className="
      grid 
      grid-cols-3 
      gap-x-4 
      text-center
      items-center
    "
        >
          {/* Matches */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col items-center justify-center">
            <FaRunning className="text-black dark:text-white text-xl mb-2" />

            <p className="text-xl font-semibold text-sky-900 dark:text-sky-100">
              {activeTab === "career"
                ? careerStats.appearances
                : player.seasonStats.appearances}
            </p>
            <h3 className="text-lg font-bold text-sky-900 dark:text-sky-100">
              <span className="block md:hidden">M</span>
              <span className="hidden md:block">Matches</span>
            </h3>
          </div>

          {/* Goals */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col items-center justify-center">
            <FaFutbol className="text-2xl mb-2" />

            <p className="text-xl font-semibold text-sky-900 dark:text-sky-100">
              {activeTab === "career"
                ? careerStats.goals
                : player.seasonStats.goals}
            </p>
            <h3 className="text-lg font-bold text-sky-900 dark:text-sky-100">
              <span className="block md:hidden">G</span>
              <span className="hidden md:block">Goals</span>
            </h3>
          </div>

          {/* Assists */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col items-center justify-center">
            <Handshake className="text-black dark:text-white text-2xl mb-2" />

            <p className="text-xl font-semibold text-sky-900 dark:text-sky-100">
              {activeTab === "career"
                ? careerStats.assists
                : player.seasonStats.assists}
            </p>
            <h3 className="text-lg font-bold text-sky-900 dark:text-sky-100">
              <span className="block md:hidden">A</span>
              <span className="hidden md:block">Assists</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
