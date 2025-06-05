"use client"; // If you're using this inside an app directory with Next.js 13+

import React from "react";

const WelcomePlayer = ({ players, selectedNames }) => {
  const filteredPlayers = players.filter((player) =>
    selectedNames.includes(player.name)
  );

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 to-sky-200 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-700 dark:text-white mb-10">
        👋 Welcome to the Team!
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredPlayers.map((player) => (
          <div
            key={player.name}
            className="text-center shadow-xl p-6 rounded-2xl bg-sky-100 dark:bg-gray-100 transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <img
              src={player.image}
              alt={player.name}
              className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500 object-cover"
            />
            <img
              src={player.country}
              alt={player.name}
              className="w-10 mt-4 h-10 mx-auto rounded-xl object-cover"
            />
            <h2 className="text-xl font-bold text-blue-800 dark:text-gray-900 mt-4">
              {player.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomePlayer;
