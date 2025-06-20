"use client";

import React from "react";
import { motion } from "framer-motion";
import { Euro } from "lucide-react";

const Bye = ({ players, byeNames }) => {
  const filteredPlayers = players.filter((player) =>
    byeNames.includes(player.name)
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="p-8 sm:p-12 bg-gradient-to-br from-blue-50 to-sky-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-lg"
    >
      <div className="flex justify-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-extrabold text-center text-sky-700 dark:text-white"
        >
          Thank you
        </motion.h1>
      </div>

      <p className="text-center text-slate-700 dark:text-slate-300 text-lg sm:text-xl mb-12 max-w-xl mx-auto">
        Best of luck to your journey! We will always love you 💙
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {filteredPlayers.map((player, index) => (
          <motion.div
            key={player.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden border border-sky-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md cursor-pointer"
          >
            {/* Large squared image container */}
            <div className="relative w-full aspect-square">
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-full object-cover opacity-90 transition-opacity duration-300 hover:opacity-100"
              />
              {/* Overlay with gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-4">
                <h2 className="text-white text-2xl font-bold truncate">
                  {player.name}
                </h2>
                {player.value && (
                  <div className="inline-flex items-center gap-1 text-white text-lg font-semibold mt-1">
                    <Euro className="w-5 h-5" /> {player.value}M
                  </div>
                )}
              </div>
              {/* Country flag badge */}
              <img
                src={player.country}
                alt={`${player.name} country`}
                title={player.countryName || "Country"}
                className="absolute top-4 right-4 w-10 h-10 rounded-full border-2 border-white shadow-lg object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Bye;
