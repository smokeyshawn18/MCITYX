"use client";
import { FaTrophy, FaMedal, FaCrown, FaStar } from "react-icons/fa";
import Guardiola from "../assets/images/pepp.jpg";
import Image from "next/image";
import Link from "next/link";

// Trophy data for Pep Guardiola at Manchester City (as of May 2025)
const trophies = [
  {
    name: "Premier League",
    count: 6,
    icon: <FaCrown className="text-yellow-500 w-6 h-6" />,
    years: "2017–18, 2018–19, 2020–21, 2021–22, 2022–23, 2023–24",
  },
  {
    name: "FA Cup",
    count: 2,
    icon: <FaMedal className="text-red-500 w-6 h-6" />,
    years: "2018–19, 2022–23",
  },
  {
    name: "EFL Cup",
    count: 4,
    icon: <FaTrophy className="text-blue-400 w-6 h-6" />,
    years: "2017–18, 2018–19, 2019–20, 2020–21",
  },
  {
    name: "FA Community Shield",
    count: 2,
    icon: <FaStar className="text-sky-500 w-6 h-6" />,
    years: "2018, 2019",
  },
  {
    name: "UEFA Champions League",
    count: 1,
    icon: <FaTrophy className="text-purple-600 w-6 h-6" />,
    years: "2022–23",
  },
  {
    name: "UEFA Super Cup",
    count: 1,
    icon: <FaTrophy className="text-green-600 w-6 h-6" />,
    years: "2023",
  },
  {
    name: "FIFA Club World Cup",
    count: 1,
    icon: <FaTrophy className="text-amber-500 w-6 h-6" />,
    years: "2023",
  },
];

export default function CoachProfile() {
  const wins = 379;
  const draws = 67;
  const losses = 82;
  const totalTrophies = trophies.reduce((sum, t) => sum + t.count, 0);
  const totalMatches = wins + draws + losses;
  const ppg = ((wins * 3 + draws) / totalMatches).toFixed(2);

  return (
    <div className="min-h-screen w-full bg-sky-100 dark:bg-gray-900 transition-colors duration-500 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left: Coach Profile */}
        <div className="flex flex-col items-center lg:items-start gap-4 flex-shrink-0 w-full lg:w-72">
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full border-8 border-sky-300 dark:border-sky-500 shadow-lg overflow-hidden">
            <Image src={Guardiola} alt="Pep Guardiola" className="object-cover w-full h-full" priority />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white text-center lg:text-left">
            Pep Guardiola
          </h2>
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 text-center lg:text-left">
            2016/07/01 - Present
          </h3>
          <p className="italic text-gray-600 dark:text-gray-400 text-center lg:text-left max-w-xs">
            Manager of <span className="text-sky-600 dark:text-sky-400 font-semibold">Manchester City</span>
          </p>
        </div>

        {/* Right: Stats, Trophies, and Philosophy */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Stats Summary */}
          <div className="bg-sky-50 dark:bg-gray-700 rounded-xl p-4 sm:p-6 shadow-inner">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              Stats For Man City
            </h3>
            <div className="flex flex-wrap justify-center gap-8 text-gray-700 dark:text-gray-300 font-semibold text-base sm:text-lg mb-6">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl text-sky-600 dark:text-sky-400">{totalMatches}</p>
                <p>Matches</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl text-sky-600 dark:text-sky-400">{wins}</p>
                <p>Wins</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl text-sky-600 dark:text-sky-400">{losses}</p>
                <p>Losses</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl text-sky-600 dark:text-sky-400">{ppg}</p>
                <p>Points Per Game</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {/* Win */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
                <p className="text-lg font-bold text-sky-600 dark:text-sky-400">
                  {((wins / totalMatches) * 100).toFixed(1)}%
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-semibold">Wins</p>
                <div className="mt-2 h-3 w-full bg-sky-200 dark:bg-sky-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-600 dark:bg-sky-400 rounded-full"
                    style={{ width: `${(wins / totalMatches) * 100}%` }}
                  />
                </div>
              </div>
              {/* Draw */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
                <p className="text-lg font-bold text-blue-500 dark:text-blue-400">
                  {((draws / totalMatches) * 100).toFixed(1)}%
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-semibold">Draws</p>
                <div className="mt-2 h-3 w-full bg-blue-200 dark:bg-blue-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
                    style={{ width: `${(draws / totalMatches) * 100}%` }}
                  />
                </div>
              </div>
              {/* Loss */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
                <p className="text-lg font-bold text-red-500 dark:text-red-400">
                  {((losses / totalMatches) * 100).toFixed(1)}%
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-semibold">Losses</p>
                <div className="mt-2 h-3 w-full bg-red-200 dark:bg-red-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 dark:bg-red-400 rounded-full"
                    style={{ width: `${(losses / totalMatches) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Trophy Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-inner">
            <h4 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-white text-center">
              Trophy Cabinet <span className="ml-2 text-yellow-500">{totalTrophies}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trophies.map((trophy) => (
                <div
                  key={trophy.name}
                  className="flex items-start gap-3 bg-sky-50 dark:bg-gray-700 rounded-lg p-3 shadow"
                >
                  <div className="mt-1">{trophy.icon}</div>
                  <div>
                    <div className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      {trophy.name}
                      <span className="inline-block bg-sky-200 dark:bg-sky-600 text-sky-800 dark:text-white text-xs font-semibold px-2 py-0.5 rounded ml-2">
                        {trophy.count}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Years:</span> {trophy.years}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coaching Philosophy */}
          <div className="bg-sky-50 dark:bg-gray-700 rounded-xl p-4 sm:p-6 shadow-inner text-gray-800 dark:text-white">
            <h4 className="text-xl sm:text-2xl font-semibold mb-2">Coaching Philosophy</h4>
            <p className="leading-relaxed text-base sm:text-lg">
              Guardiola emphasizes ball possession, tactical flexibility, and high-intensity pressing,
              transforming Manchester City into one of the most formidable teams in Europe.
            </p>
          </div>

          {/* Explore More Button */}
          <div className="text-center mt-4">
            <Link
              href="https://www.mancity.com/players/pep-guardiola"
              target="_blank"
              className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300"
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
