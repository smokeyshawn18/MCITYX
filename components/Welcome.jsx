"use client";

import React from "react";

const WelcomePlayer = ({ players, selectedNames }) => {
  const filteredPlayers = players.filter((player) =>
    selectedNames.includes(player.name)
  );

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-100 to-sky-200 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-sky-700 dark:text-white mb-8">
        Welcome to the Team!
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => (
          <button
            key={player.name}
            className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col items-center p-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="button"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-3">
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-full rounded-full border-4 border-blue-500 object-cover shadow-md"
              />
              <img
                src={player.country}
                alt={player.name + " country"}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-lg border-2 border-white object-cover shadow"
              />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-sky-800 dark:text-gray-100 mb-1">
              {player.name}
            </h2>
            {/* Optional: Add a short description or role */}
            {/* <p className="text-gray-600 dark:text-gray-400 text-sm">Position / Role</p> */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomePlayer;
