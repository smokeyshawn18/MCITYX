"use client";
import { FaTrophy, FaMedal, FaCrown, FaStar } from "react-icons/fa";

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
  const wins = 403;
  const draws = 68;
  const losses = 88;
  const totalTrophies = trophies.reduce((sum, t) => sum + t.count, 0);
  const totalMatches = wins + draws + losses;
  const ppg = ((wins * 3 + draws) / totalMatches).toFixed(2);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 sm:p-10 flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Left: Coach Profile */}
        <div className="flex flex-col items-center lg:items-start gap-5 flex-shrink-0 w-full lg:w-72">
          <div className="relative w-48 h-48 rounded-full border-8 border-sky-400 dark:border-sky-600 shadow-lg overflow-hidden">
            <Image
              src="/assets/images/pepp.jpg"
              alt="Pep Guardiola"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Pep Guardiola
            </h2>
            <h3 className="text-sm sm:text-lg font-medium text-gray-600 dark:text-gray-300 mt-1">
              2016/07/01 - Present
            </h3>
            <p className="italic text-gray-600 dark:text-gray-400 mt-2">
              Manager of{" "}
              <span className="text-sky-600 dark:text-sky-400 font-semibold">
                Manchester City
              </span>
            </p>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Stats */}
          <div className="bg-sky-50 dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <h3 className="text-lg font-bold text-center text-gray-800 dark:text-white mb-4">
              Stats For Man City
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                  {totalMatches}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">
                  Matches
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                  {wins}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">
                  Wins
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                  {draws}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">
                  Draws
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                  {losses}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">
                  Losses
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                  {ppg}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">
                  Pts/Game
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Wins", color: "sky", value: wins },
                { label: "Draws", color: "blue", value: draws },
                { label: "Losses", color: "red", value: losses },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm"
                >
                  <p
                    className={`text-lg font-bold text-${stat.color}-500 dark:text-${stat.color}-400`}
                  >
                    {((stat.value / totalMatches) * 100).toFixed(1)}%
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold mt-1">
                    {stat.label}
                  </p>
                  <div
                    className={`mt-2 h-1.5 w-full bg-${stat.color}-200 dark:bg-${stat.color}-700 rounded-full overflow-hidden`}
                  >
                    <div
                      className={`h-full bg-${stat.color}-500 dark:bg-${stat.color}-400`}
                      style={{ width: `${(stat.value / totalMatches) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trophy Cabinet */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <h4 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">
              Trophy Cabinet{" "}
              <span className="ml-2 text-yellow-500">{totalTrophies}</span>
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {trophies.map((trophy) => (
                <div
                  key={trophy.name}
                  className="flex items-start gap-3 bg-sky-100 dark:bg-gray-700 rounded-lg p-3 shadow-sm"
                >
                  <div className="mt-1">{trophy.icon}</div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                      {trophy.name}
                      <span className="inline-block bg-sky-200 dark:bg-sky-600 text-sky-800 dark:text-white text-xs font-semibold px-2 py-0.5 rounded">
                        {trophy.count}
                      </span>
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      <span className="font-medium">Years:</span> {trophy.years}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coaching Philosophy */}
          <div className="bg-sky-50 dark:bg-gray-800 rounded-2xl p-6 shadow-inner">
            <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              Coaching Philosophy
            </h4>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Guardiola emphasizes ball possession, tactical flexibility, and
              high-intensity pressing, transforming Manchester City into one of
              the most formidable teams in Europe.
            </p>
          </div>

          {/* Explore More */}
          <div className="text-center">
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
