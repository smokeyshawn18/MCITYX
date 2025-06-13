"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserRoundX } from "lucide-react";

const Bye = ({ players, byeNames }) => {
  const filteredPlayers = players.filter((player) =>
    byeNames.includes(player.name)
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="p-6 sm:p-10 bg-gradient-to-br from-blue-100 to-sky-200 dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-2xl"
    >
      <div className="flex justify-center items-center gap-3 mb-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-extrabold text-center text-sky-700 dark:text-white"
        >
          Farewell Legends
        </motion.h1>
      </div>

      <p className="text-center text-slate-600 dark:text-slate-300 text-md sm:text-lg mb-10">
        Thank you for everything. You'll always be part of our history 💙
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredPlayers.map((player, index) => (
          <motion.div
            key={player.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-white dark:bg-gray-900 rounded-3xl shadow-lg flex flex-col items-center p-6 transition-all duration-300"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4">
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-full rounded-full  object-cover shadow-md"
              />
              <img
                src={player.country}
                alt={player.name + " country"}
                title={player.countryName || "Country"}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-md border-2 border-white object-cover shadow"
              />
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-sky-800 dark:text-gray-100 mb-1">
              {player.name}
            </h2>

            {player.message && (
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm italic mt-2 px-2">
                “{player.message}”
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Bye;
