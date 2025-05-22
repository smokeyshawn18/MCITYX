"use client"
import {
  FaCalendarAlt,
  FaHandsHelping,
  FaAngleDown,
  FaAngleUp,
  FaBolt,
} from "react-icons/fa";

import { GoGoal } from "react-icons/go";
// import Croatia from "../assets/images/cro.png";
import England from "../assets/images/eng.png";
import Norway from "../assets/images/norway.webp";
// import Belgium from "../assets/images/belgium.png";
// import Portugal from "../assets/images/portugal.webp";
import player1Image from "../assets/images/haaland.jpg";
// import player2Image from "../assets/images/kdb.jpg";
// import Doku from "../assets/images/doku.jpg";
// import player3Image from "../assets/images/silva.jpg";
// import Nunes from "../assets/images/nunes.jpg";
import premierLeagueLogo from "../assets/images/prem.webp";
import championsLeagueLogo from "../assets/images/Champ.png";
import Carabao from "../assets/images/carabao.png";
import otherIcon from "../assets/images/sheld.png";
import Fa from "../assets/images/fa.jpg";
// import Josko from "../assets/images/gv.jpg";
import PhilFoden from "../assets/images/fode.jpg";
import MarmoushImage from "../assets/images/marmoush.webp";
import Egypt from "../assets/images/eg.webp";
// Placeholder for national team icon
import { useState } from "react";
import { CircleArrowLeft } from "lucide-react";
import Image from "next/image";

const playersData = [
  {
    name: "Erling Haaland",
    matches: {
      premierLeague: 30,
      championsLeague: 9,
      other: 1,
      Fa: 3,
      Carabao: 0,
      frank: 0,
      nationalStats: 8,
    },
    goals: {
      premierLeague: 21,
      championsLeague: 8,
      Fa: 1,
      frank: 0,
      other: 0,
      Carabao: 0,
      nationalStats: 9,
    },
    assists: {
      premierLeague: 3,
      championsLeague: 0,
      other: 0,
      frank: 0,
      Fa: 1,
      Carabao: 0,
      nationalStats: 1,
    },
    age: 24,
    position: "ST",
    image: player1Image,
    nimg: Norway,
  },
  {
    name: "Omar Marmoush",
    matches: {
      premierLeague: 16,
      championsLeague: 2,
      other: 0,
      Fa: 3,
      Carabao: 0,
      nationalStats: 5,
      frank: 26,
    },
    goals: {
      premierLeague: 7,
      championsLeague: 0,
      Fa: 1,
      other: 0,
      Carabao: 0,
      nationalStats: 1,
      frank: 20,
    },
    assists: {
      premierLeague: 1,
      championsLeague: 1,
      other: 0,
      Carabao: 0,
      Fa: 0,
      nationalStats: 0,
      frank: 14,
    },
    age: 25,
    position: "ST",
    image: MarmoushImage,
    nimg: Egypt,
  },
  {
    name: "Phil Foden",
    matches: {
      premierLeague: 28,
      championsLeague: 9,
      other: 0,
      Fa: 5,
      Carabao: 2,
      frank: 0,
      nationalStats: 4,
    },
    goals: {
      premierLeague: 7,
      championsLeague: 3,
      other: 0,
      Fa: 0,
      Carabao: 0,
      frank: 0,
      nationalStats: 0,
    },
    assists: {
      premierLeague: 2,
      championsLeague: 1,
      other: 0,
      frank: 0,
      Fa: 2,
      Carabao: 0,
      nationalStats: 1,
    },
    age: 24,
    position: "AM",
    nimg: England,
    image: PhilFoden,
  },
  // {
  //   name: "Jeremy Doku",
  //   matches: {
  //     premierLeague: 27,
  //     championsLeague: 4,
  //     other: 1,
  //     Carabao: 1,
  //     frank: 0,
  //     Fa: 1,
  //     nationalStats: 5,
  //   },
  //   goals: {
  //     premierLeague: 2,
  //     championsLeague: 0,
  //     other: 0,
  //     Fa: 2,
  //     Carabao: 1,
  //     frank: 0,
  //     nationalStats: 0,
  //   },
  //   assists: {
  //     premierLeague: 6,
  //     championsLeague: 1,
  //     other: 0,
  //     Carabao: 0,
  //     frank: 0,
  //     Fa: 2,
  //     nationalStats: 2,
  //   },
  //   nimg: Belgium,
  //   age: 22,
  //   position: "AM",
  //   image: Doku,
  // },

  // {
  //   name: "Josko Gvardiol",
  //   matches: {
  //     premierLeague: 36,
  //     championsLeague: 9,
  //     other: 1,
  //     frank: 0,
  //     Fa: 1,
  //     Carabao: 2,
  //     nationalStats: 8,
  //   },
  //   goals: {
  //     premierLeague: 6,
  //     championsLeague: 0,
  //     other: 0,
  //     frank: 0,
  //     Carabao: 0,
  //     Fa: 0,
  //     nationalStats: 1,
  //   },
  //   assists: {
  //     premierLeague: 0,
  //     championsLeague: 1,
  //     other: 0,
  //     frank: 0,
  //     Carabao: 0,
  //     Fa: 0,
  //     nationalStats: 0,
  //   },
  //   age: 24,
  //   position: "LB",
  //   nimg: Croatia,
  //   image: Josko,
  // },

  // {
  //   name: "Bernardo Silva",
  //   matches: {
  //     premierLeague: 32,
  //     championsLeague: 9,
  //     frank: 1,
  //     other: 1,
  //     Fa: 2,
  //     Carabao: 1,
  //     nationalStats: 7,
  //   },
  //   goals: {
  //     premierLeague: 2,
  //     championsLeague: 0,
  //     Fa: 0,
  //     frank: 0,
  //     other: 1,
  //     Carabao: 0,
  //     nationalStats: 1,
  //   },
  //   assists: {
  //     premierLeague: 4,
  //     championsLeague: 0,
  //     Fa: 0,
  //     frank: 0,
  //     other: 0,
  //     Carabao: 0,
  //     nationalStats: 0,
  //   },
  //   age: 30,
  //   position: "AM",
  //   nimg: Portugal,
  //   image: player3Image,
  // },
  // {
  //   name: "Kevin De Bruyne",
  //   matches: {
  //     premierLeague: 27,
  //     championsLeague: 7,
  //     frank: 0,
  //     other: 1,
  //     Carabao: 0,
  //     Fa: 3,
  //     nationalStats: 4,
  //   },
  //   goals: {
  //     premierLeague: 4,
  //     championsLeague: 0,
  //     frank: 0,
  //     other: 0,
  //     Fa: 2,
  //     Carabao: 0,
  //     nationalStats: 2,
  //   },
  //   assists: {
  //     premierLeague: 7,
  //     championsLeague: 0,
  //
  //     frank: 0,
  //     other: 0,
  //     Carabao: 0,
  //     Fa: 1,
  //     nationalStats: 2,
  //   },
  //   nimg: Belgium,
  //   age: 33,
  //   position: "AM",
  //   image: player2Image,
  // },

  // {
  //   name: "Matheus Nunes",
  //   matches: {
  //     premierLeague: 24,
  //     frank: 0,
  //     championsLeague: 7,
  //     Fa: 2,
  //     other: 1,
  //     Carabao: 2,
  //     nationalStats: 0,
  //   },
  //   goals: {
  //     premierLeague: 1,
  //     championsLeague: 1,
  //     frank: 0,
  //     other: 0,
  //     Fa: 0,
  //     Carabao: 2,
  //     nationalStats: 0,
  //   },
  //   assists: {
  //     premierLeague: 5,
  //     championsLeague: 3,
  //     Fa: 1,
  //     frank: 0,
  //     other: 0,
  //     Carabao: 0,
  //     nationalStats: 0,
  //   },
  //   age: 26,
  //   position: "AM",
  //   nimg: Portugal,
  //   image: Nunes,
  // },
];

// Function to calculate CityPulse Rating
const calculateCityPulseRating = (player) => {
  const totalGoals =
    player.goals.premierLeague +
    player.goals.championsLeague +
    player.goals.Carabao +
    player.goals.Fa +
    player.goals.frank +
    player.goals.other +
    player.goals.nationalStats;
  const totalAssists =
    player.assists.premierLeague +
    player.assists.championsLeague +
    player.assists.Carabao +
    player.assists.frank +
    player.assists.Fa +
    player.assists.other +
    player.assists.nationalStats;
  const totalMatches =
    player.matches.premierLeague +
    player.matches.championsLeague +
    player.matches.Carabao +
    player.matches.Fa +
    player.matches.frank +
    player.matches.other +
    player.matches.nationalStats;

  // Calculate raw rating
  let rawRating;
  if (totalMatches > 0) {
    rawRating = ((totalGoals + totalAssists) / totalMatches) * 3 + 6; // Scale to 10
  } else {
    rawRating = 6; // Minimum rating
  }

  // Cap the rating
  return Math.min(rawRating, 10); // Ensure the rating does not exceed 10
};

const KeyPerformers = () => {
  const [expandedPlayerIndex, setExpandedPlayerIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedPlayerIndex(expandedPlayerIndex === index ? null : index);
  };

  const type = "Previous Team - This Season";

  return (
    <div className="mb-10 mt-5">
    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5">
        {playersData.map((player, index) => {
          const cityPulseRating = calculateCityPulseRating(player); // Calculate CityPulse Rating

          // Determine icon color based on rating
          const iconColor =
            cityPulseRating > 8 ? "text-green-500" : "text-yellow-500";

          return (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex flex-col items-center mb-6">
                <Image
                  src={player.image}
                  alt={player.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-black mb-4"
                />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#182d33] uppercase">
                    {player.name}
                  </h3>
                  <Image
                    src={player.nimg}
                    alt="national flag"
                    className="w-10 h-8 mx-auto mb-5 mt-3"
                  />

                  {/* Power Icon */}
                  <div className={`flex items-center mb-3 ${iconColor}`}>
                    <FaBolt className="text-2xl mr-2 text-center" />
                    <p className="text-lg font-bold text-[#182d33]">
                      CityPulse Rating: {cityPulseRating.toFixed(1)}
                    </p>
                    <span>{cityPulseRating > 8 ? "" : ""}</span>
                  </div>
                  <p className="text-lg font-semibold text-[#182d33]">
                    {player.position}
                  </p>
                  <p className="text-[#182d33] font-semibold">
                    Age: {player.age}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {/* Matches */}
                <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl">
                  <FaCalendarAlt className="text-black text-2xl mb-2" />
                  <p className="text-xl font-semibold text-black">
                    {player.matches.premierLeague +
                      player.matches.championsLeague +
                      player.matches.Carabao +
                      player.matches.Fa +
                      player.matches.other +
                      player.matches.frank +
                      player.matches.nationalStats}
                  </p>
                  <span className="text-sm text-gray-800 font-semibold">
                    Matches
                  </span>
                </div>
                {/* Goals */}
                <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl">
                  <GoGoal className="text-black text-2xl mb-2" />
                  <p className="text-xl font-semibold text-black">
                    {player.goals.premierLeague +
                      player.goals.championsLeague +
                      player.goals.Carabao +
                      player.goals.Fa +
                      player.goals.frank +
                      player.goals.other +
                      player.goals.nationalStats}
                  </p>
                  <span className="text-sm text-gray-800 font-semibold">
                    Goals
                  </span>
                </div>
                {/* Assists */}
                <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl">
                  <FaHandsHelping className="text-black text-2xl mb-2" />
                  <p className="text-xl font-semibold text-black">
                    {player.assists.premierLeague +
                      player.assists.championsLeague +
                      player.assists.Carabao +
                      player.assists.Fa +
                      player.assists.other +
                      player.assists.frank +
                      player.assists.nationalStats}
                  </p>
                  <span className="text-sm text-gray-800 font-semibold">
                    Assists
                  </span>
                </div>
              </div>

              <button
                onClick={() => toggleExpand(index)}
                className="flex items-center justify-center mt-6 text-black hover:text-[#1e2c50] transition-colors duration-300"
              >
                {expandedPlayerIndex === index ? (
                  <>
                    <span className="font-bold text-[#1e2c50] text-lg">
                      Show Less
                    </span>
                    <FaAngleUp className="ml-1 text-3xl transition-transform duration-300 transform hover:scale-110" />
                  </>
                ) : (
                  <>
                    <span className="font-bold text-lg text-[#1e2c50]">
                      Show More
                    </span>
                    <FaAngleDown className="ml-1 text-3xl transition-transform duration-300 transform hover:scale-110" />
                  </>
                )}
              </button>

              {expandedPlayerIndex === index && (
                <div className="mt-6">
                  {/* League Stats */}
                  <div className="bg-gray-50 p-4 rounded-xl mb-4">
                    <div className="flex items-center mb-2">
                      <img
                        src={premierLeagueLogo}
                        alt="Premier League"
                        className="w-8 h-8 mr-2"
                      />
                      <span className="text-[#3D195B] font-semibold">
                        Premier League
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Matches:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.matches.premierLeague}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Goals:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.goals.premierLeague}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">
                        Assists:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.assists.premierLeague}
                      </span>
                    </div>
                  </div>

                  {/* Champions League Stats */}
                  <div className="bg-gray-50 p-4 rounded-xl mb-4">
                    <div className="flex items-center mb-2">
                      <Image
                        src={championsLeagueLogo}
                        alt="Champions League"
                        className="w-8 h-8 mr-2"
                      />
                      <span className="text-[#3D195B] font-semibold">
                        Champions League
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Matches:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.matches.championsLeague}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Goals:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.goals.championsLeague}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">
                        Assists:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.assists.championsLeague}
                      </span>
                    </div>
                  </div>
                  {/* National Stats */}
                  <div className="bg-gray-50 p-4 rounded-xl mb-4">
                    <div className="flex items-center mb-2">
                      <img
                        src={player.nimg}
                        alt="National Team"
                        className="w-8 h-8 mr-2"
                      />
                      <span className="text-[#3D195B] font-semibold">
                        National Stats
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Matches:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.matches.nationalStats}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Goals:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.goals.nationalStats}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">
                        Assists:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.assists.nationalStats}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl mb-4">
                    <div className="flex items-center mb-2">
                      <img
                        src={Fa}
                        alt="Premier League"
                        className="w-8 h-8 mr-2 rounded-lg"
                      />
                      <span className="text-[#3D195B] font-semibold">
                        Fa Cup
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Matches:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.matches.Fa}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Goals:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.goals.Fa}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">
                        Assists:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.assists.Fa}
                      </span>
                    </div>
                  </div>
                  {/* Carabao Cup Stats */}
                  <div className="bg-gray-50 p-4 rounded-xl mb-4">
                    <div className="flex items-center mb-2">
                      <Image
                        src={Carabao}
                        alt="Carabao Cup"
                        className="w-8 h-8 mr-2"
                      />
                      <span className="text-[#3D195B] font-semibold">
                        Carabao Cup
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Matches:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.matches.Carabao}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Goals:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.goals.Carabao}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">
                        Assists:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.assists.Carabao}
                      </span>
                    </div>
                  </div>
                  {/* Other Stats */}
                  <div className="bg-gray-50 p-4 rounded-xl mb-4">
                    <div className="flex items-center mb-2">
                      <Image
                        src={otherIcon}
                        alt="Other"
                        className="w-8 h-8 mr-2"
                      />
                      <span className="text-[#3D195B] font-semibold">
                        Community Shield
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Matches:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.matches.other}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Goals:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.goals.other}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">
                        Assists:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.assists.other}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl mb-4">
                    <div className="flex items-center mb-2">
                      <CircleArrowLeft className="mr-3" />
                      <span className="text-[#3D195B] font-semibold">
                        {type} {/* Displaying the dynamic match type */}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Matches:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.matches.frank}{" "}
                        {/* Using dynamic key for matches */}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Goals:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.goals.frank} {/* Using dynamic key for goals */}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">
                        Assists:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {player.assists.frank}
                        {/* Using dynamic key for assists */}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeyPerformers;
