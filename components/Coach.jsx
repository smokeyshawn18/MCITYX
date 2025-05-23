"use client"
import { FaTrophy, FaRegHandshake, FaTimesCircle } from "react-icons/fa";

import Guardiola from "../assets/images/pepp.jpg";
import Image from "next/image";
import Link from "next/link";


export default function CoachProfile() {
  // Define individual stats
  const wins = 379; 
  const draws = 67; 
  const losses = 82; 
  const totalTrophies = 18; 

 

  // Calculate total matches and win percentage
  const totalMatches = wins + draws + losses;

   const ppg = ((wins*3 + draws)/totalMatches).toFixed(2)

  // Data array for stats
  const data = [
    {
      type: "stat",
      icon: <FaTrophy className="text-teal-600 w-6 h-6" />,
      label: "Wins",
      value: wins,
    },
    {
      type: "stat",
      icon: <FaRegHandshake className="text-blue-400 w-6 h-6" />,
      label: "Draws",
      value: draws,
    },
    {
      type: "stat",
      icon: <FaTimesCircle className="text-rose-400 w-6 h-6" />,
      label: "Losses",
      value: losses,
    },
    {
      type: "stat",
      icon: <FaTrophy className="text-yellow-500 w-6 h-6" />,
      label: "Total Trophies Won:",
      value: totalTrophies,
    },
  ];

  return (
  <div className="w-full min-h-screen bg-sky-100 dark:bg-gray-900 transition-colors duration-500 flex justify-center items-center px-6 py-12">
  <div className="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-xl shadow-xl p-10 flex flex-col lg:flex-row items-center lg:items-start gap-10">
    {/* Left: Coach Image and Basic Info */}
    <div className="flex flex-col items-center lg:items-start space-y-6 flex-shrink-0">
      <div className="relative rounded-full border-8 border-sky-300 dark:border-sky-500 shadow-lg overflow-hidden w-48 h-48">
        <Image
          src={Guardiola}
          alt="Pep Guardiola"
          className="object-cover w-full h-full"
        />
      </div>
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-wide">
        Pep Guardiola
      </h2>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        2016/07/01 - Present
      </h3>
      <p className="italic text-gray-600 dark:text-gray-400 text-center lg:text-left max-w-xs">
        Manager of <span className="text-sky-600 dark:text-sky-400 font-semibold">Manchester City</span>
      </p>
    </div>

    {/* Right: Stats and Philosophy */}
    <div className="flex-1 flex flex-col space-y-8">
      {/* Stats Summary */}
      <div className="bg-sky-50 dark:bg-gray-700 rounded-lg p-6 shadow-inner">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Stats For Man City
        </h3>

        {/* Matches and PPG */}
        <div className="flex justify-center gap-12 mb-8 text-gray-700 dark:text-gray-300 font-semibold text-lg">
          <div className="text-center">
            <p className="text-4xl text-sky-600 dark:text-sky-400">{totalMatches}</p>
            <p>Matches</p>
          </div>
          <div className="text-center">
            <p className="text-4xl text-sky-600 dark:text-sky-400">{ppg}</p>
            <p>Points Per Game</p>
          </div>
        </div>

        {/* Win/Draw/Loss Percentages */}
        <div className="grid grid-cols-3 gap-6 text-center">
          {/* Win */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <p className="text-xl font-bold text-sky-600 dark:text-sky-400">{((wins / totalMatches) * 100).toFixed(1)}%</p>
            <p className="text-gray-700 dark:text-gray-300 mt-1 font-semibold">Wins</p>
            <div className="mt-3 h-4 w-full bg-sky-300 dark:bg-sky-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-600 dark:bg-sky-400 rounded-full transition-all duration-500"
                style={{ width: `${(wins / totalMatches) * 100}%` }}
              />
            </div>
          </div>

          {/* Draw */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <p className="text-xl font-bold text-blue-500 dark:text-blue-400">{((draws / totalMatches) * 100).toFixed(1)}%</p>
            <p className="text-gray-700 dark:text-gray-300 mt-1 font-semibold">Draws</p>
            <div className="mt-3 h-4 w-full bg-blue-300 dark:bg-blue-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${(draws / totalMatches) * 100}%` }}
              />
            </div>
          </div>

          {/* Loss */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <p className="text-xl font-bold text-red-500 dark:text-red-400">{((losses / totalMatches) * 100).toFixed(1)}%</p>
            <p className="text-gray-700 dark:text-gray-300 mt-1 font-semibold">Losses</p>
            <div className="mt-3 h-4 w-full bg-red-300 dark:bg-red-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 dark:bg-red-400 rounded-full transition-all duration-500"
                style={{ width: `${(losses / totalMatches) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Coaching Philosophy */}
      <div className="bg-sky-50 dark:bg-gray-700 rounded-lg p-6 shadow-inner text-gray-800 dark:text-white">
        <h4 className="text-2xl font-semibold mb-3">Coaching Philosophy</h4>
        <p className="leading-relaxed">
          Guardiola emphasizes ball possession, tactical flexibility, and high-intensity pressing, transforming Manchester City into one of the most formidable teams in Europe.
        </p>
      </div>

      {/* Explore More Button */}
      <div className="text-center">
        <Link
          href="https://www.mancity.com/players/pep-guardiola"
          target="_blank"
          className="inline-block px-10 py-3 bg-sky-600 dark:bg-sky-500 text-white font-semibold rounded-full shadow-lg hover:bg-sky-700 dark:hover:bg-sky-600 transition"
        >
          Explore More
        </Link>
      </div>
    </div>
  </div>
</div>

  );
}
