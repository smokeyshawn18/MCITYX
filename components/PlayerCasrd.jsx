"use client"
import {
  FaFutbol,
  FaMedal,
  FaRegFutbol,
  FaRunning,
  FaFlag,
  FaTshirt,
  FaTrophy,
} from "react-icons/fa";
import { CiMedicalCross } from "react-icons/ci";
import { useState, useEffect } from "react";
import Image from "next/image";

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
  <div className="relative bg-white dark:bg-gray-950 shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-3xl duration-300 ease-in-out">
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
  <div className="p-6 bg-white dark:bg-gray-950">
    <h2 className="text-2xl sm:text-3xl md:text-3xl font-extrabold text-[#2ea9cb] dark:text-white mb-2 text-center uppercase tracking-widest">
      {player.name}
    </h2>

    {/* Player Rating */}
    {player.fotmobRating && (
      <div className="text-center mb-2">
        <span className="inline-block bg-[#31f448] text-white text-base font-bold py-1 px-3 rounded-full shadow-lg">
          Fotmob Rating: {player.fotmobRating}
        </span>
      </div>
    )}

    <p className="font-bold text-3xl text-center mt-2 mb-4 text-black dark:text-white flex items-center justify-center gap-2">
      <FaTshirt className="text-[#702020] text-4xl" />
      {player.number}
    </p>
    <p className="font-bold text-2xl text-center mt-2 mb-4 text-blue-900 dark:text-white flex items-center justify-center gap-2">
      ${player.value}M
    </p>

    <p className="text-[#000000] dark:text-white mb-4 text-xl font-bold text-center">
      {player.position}
    </p>

    <Image
  src={player.country}
  alt={player.country}
  width={40}
  height={32}
  className="mx-auto mb-4 object-contain"
/>

    <p className="text-[#10252b] dark:text-white mb-6 text-2xl font-bold text-center uppercase">
      {player.age}
    </p>

    {/* Injured Section */}
    {player.injured && (
      <div className="text-center mb-3 mt-[-1em]">
        <div className="inline-block bg-white dark:bg-gray-950 text-red-600 p-2">
          <CiMedicalCross className="text-4xl" />
        </div>
        <span className="block font-extrabold text-[#e11d48] dark:text-red-500 text-lg mb-2">
          {player.injuryDetails.type} / {player.injuryDetails.tm}
        </span>
        <p className="text-gray-700 dark:text-gray-300 font-bold">
          Expected return: {player.injuryDetails.recoveryTime}
        </p>
      </div>
    )}

    {/* Tab Navigation */}
    <div className="flex justify-center mb-4 space-x-2">
      <button
        className={`px-4 py-2 mx-1 font-bold text-sm uppercase tracking-wider rounded-full flex items-center ${
          activeTab === "season"
            ? "bg-[#1e3a8a] text-white shadow-md"
            : "bg-[#f0f4f8] dark:bg-gray-700 text-[#1e3a8a] dark:text-white hover:bg-[#e2e8f0] dark:hover:bg-gray-600"
        } transition-colors duration-300 ease-in-out`}
        onClick={() => setActiveTab("season")}
      >
        <FaMedal className="mr-2" />
        This Season
      </button>
      <button
        className={`px-4 py-2 mx-1 font-bold text-sm uppercase tracking-wider rounded-full flex items-center ${
          activeTab === "career"
            ? "bg-[#1e3a8a] text-white shadow-md"
            : "bg-[#f0f4f8] dark:bg-gray-700 text-[#1e3a8a] dark:text-white hover:bg-[#e2e8f0] dark:hover:bg-gray-600"
        } transition-colors duration-300 ease-in-out`}
        onClick={() => setActiveTab("career")}
      >
        <FaTrophy className="mr-2" />
        Career Stats
      </button>
    </div>

    {/* Tab Content */}
    <div className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
      {activeTab === "career" ? (
        <div className="space-y-4 text-gray-900 dark:text-white">
          <div className="flex items-center justify-between">
            <FaRunning className="mr-2 text-[#1e3a8a] dark:text-[#93c5fd]" />
            <span className="flex-1 text-lg text-[#1e3a8a] dark:text-[#93c5fd] font-extrabold">
              <strong className="text-green-600 dark:text-green-400">Matches:</strong>{" "}
              {careerStats.appearances}
            </span>
          </div>

          {player.position === "GK" ? (
            <>
              <div className="flex items-center justify-between">
                <FaFutbol className="mr-2 text-[#1e3a8a] dark:text-[#93c5fd]" />
                <span className="flex-1 text-lg text-[#1e3a8a] dark:text-[#93c5fd] font-extrabold">
                  <strong className="text-red-600 dark:text-red-400">Goals Conceded:</strong>{" "}
                  {careerStats.goalsConceded}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <FaRegFutbol className="mr-2 text-[#1e3a8a] dark:text-[#93c5fd]" />
                <span className="flex-1 text-lg text-[#1e3a8a] dark:text-[#93c5fd] font-extrabold">
                  <strong className="text-purple-600 dark:text-purple-400">Clean Sheets:</strong>{" "}
                  {careerStats.cleanSheets}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <FaFutbol className="mr-2 text-[#1e3a8a] dark:text-[#93c5fd]" />
                <span className="flex-1 text-lg text-[#1e3a8a] dark:text-[#93c5fd] font-extrabold">
                  <strong className="text-pink-600 dark:text-pink-400">Goals:</strong>{" "}
                  {careerStats.goals}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <FaRegFutbol className="mr-2 text-[#1e3a8a] dark:text-[#93c5fd]" />
                <span className="flex-1 text-lg text-[#1e3a8a] dark:text-[#93c5fd] font-extrabold">
                  <strong className="text-purple-600 dark:text-purple-400">Assists:</strong>{" "}
                  {careerStats.assists}
                </span>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4 text-gray-900 dark:text-white">
          <div className="flex items-center justify-between">
            <FaFlag className="mr-2 text-[#272373] dark:text-[#cbd5e1]" />
            <span className="flex-1 text-lg text-[#24205e] dark:text-[#cbd5e1] font-extrabold">
              <strong className="text-green-700 dark:text-green-400">Matches:</strong>{" "}
              {player.seasonStats.appearances}
            </span>
          </div>

          {player.position === "GK" ? (
            <>
              <div className="flex items-center justify-between">
                <FaFutbol className="mr-2 text-[#272465] dark:text-[#cbd5e1]" />
                <span className="flex-1 text-lg text-[#29266a] dark:text-[#cbd5e1] font-extrabold">
                  <strong className="text-red-700 dark:text-red-400">Goals Conceded:</strong>{" "}
                  {player.seasonStats.goalsConceded}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <FaRegFutbol className="mr-2 text-[#25225b] dark:text-[#cbd5e1]" />
                <span className="flex-1 text-lg text-[#272468] dark:text-[#cbd5e1] font-extrabold">
                  <strong className="text-purple-700 dark:text-purple-400">Clean Sheets:</strong>{" "}
                  {player.seasonStats.cleanSheets}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <FaFutbol className="mr-2 text-[#272465] dark:text-[#cbd5e1]" />
                <span className="flex-1 text-lg text-[#29266a] dark:text-[#cbd5e1] font-extrabold">
                  <strong className="text-pink-700 dark:text-pink-400">Goals:</strong>{" "}
                  {player.seasonStats.goals}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <FaRegFutbol className="mr-2 text-[#25225b] dark:text-[#cbd5e1]" />
                <span className="flex-1 text-lg text-[#272468] dark:text-[#cbd5e1] font-extrabold">
                  <strong className="text-purple-700 dark:text-purple-400">Assists:</strong>{" "}
                  {player.seasonStats.assists}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  </div>
</div>

  );
};



export default PlayerCard;
