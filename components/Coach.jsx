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
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-sky-100 to-blue-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8 transition-transform transform hover:scale-105 hover:shadow-2xl">
        {/* Coach Image */}
        <div className="flex align-middle justify-center relative mb-6 w-full">
          <Image
            src={Guardiola}
            alt="Pep Guardiola"
            className="w-80 h-70 object-cover rounded-full border-4 border-blue-300 shadow-lg transition-transform transform hover:scale-110"
          />
        </div>

        {/* Coach Name and Role */}
        <h2 className="text-4xl font-bold text-center text-gray-800 hover:text-blue-600 transition duration-300">
          Pep Guardiola
        </h2>
        <h3 className="text-lg font-semibold text-center text-gray-600 mt-1">
          2016/07/01 - Present
        </h3>
        <p className="text-lg text-center text-gray-600 italic mt-2">
          Manager of{" "}
          <span className="text-blue-300 font-bold ">Manchester City</span>
        </p>

        {/* Career Stats Section */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Stats For Man City:
          </h3>
          <h4 className="font-bold text-xl mb-4 text-center uppercase tracking-wider">
            Matches for Man City: {totalMatches}
          </h4>
            <h4 className="font-bold text-xl mb-4 text-center uppercase tracking-wider">
            Points Per Game: {ppg}
          </h4>
          {data.map((stat, index) => (
            <div key={index} className="mb-6">
              <div className="flex items-center mb-2 space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">{stat.icon}</div>
                <p className="text-lg font-bold text-gray-700">{stat.label}</p>
                <p className="text-lg font-semibold text-gray-800 ml-auto">
                  {stat.value}
                </p>
              </div>
              {/* Unique Stat Bar */}
              {stat.label !== "Win :" &&
                stat.label !== "Total Trophies Won:" && (
                  <div className="w-full bg-gray-200 rounded-full h-6 relative">
                    <div
                      className={`h-full rounded-full absolute top-0 left-0 text-center text-xs font-bold text-white flex items-center justify-center overflow-hidden ${
                        stat.label === "Wins"
                          ? "bg-teal-400"
                          : stat.label === "Draws"
                          ? "bg-blue-400"
                          : "bg-rose-400"
                      }`}
                      style={{
                        width: `${
                          stat.label === "Wins"
                            ? (wins / totalMatches) * 100
                            : stat.label === "Draws"
                            ? (draws / totalMatches) * 100
                            : (losses / totalMatches) * 100
                        }%`,
                      }}
                    >
                      {(stat.label === "Wins"
                        ? (wins / totalMatches) * 100
                        : stat.label === "Draws"
                        ? (draws / totalMatches) * 100
                        : (losses / totalMatches) * 100
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>

        {/* Other Sections */}
        <div className="mt-6 bg-blue-50 rounded-lg p-6">
          <h4 className="text-2xl font-semibold text-gray-700 mb-4">
            Coaching Philosophy:
          </h4>
          <p className="text-gray-700">
            Guardiola emphasizes ball possession, tactical flexibility, and
            high-intensity pressing, transforming Manchester City into one of
            the most formidable teams in Europe.
          </p>
        </div>

        {/* Closing Section */}
        <div className="mt-6 text-center">
          <Link
            href={"https://www.mancity.com/players/pep-guardiola"}
            target={"_blank"}
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            Explore More
          </Link>
        </div>
      </div>
    </div>
  );
}
