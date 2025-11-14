"use client";

import { useMemo } from "react";
import Image from "next/image";
import { FaFutbol, FaHandsHelping, FaMedal } from "react-icons/fa";
import { players } from "@/data/players";
import { calculateAge } from "@/utils/playerAge";
import { ratePlayer } from "@/utils/ratePlayer";

const HIDDEN_NAMES = new Set([
  "İlkay Gündoğan",
  "Manuel Akanji",
  "King Kev (Napoli)",
  "Jack Grealish",
  "James McAtee",
  "C. Echeverri",
  "Ederson Moraes",
]);

// ⭐ Reusable Stat Box
const StatBox = ({ value, label, highlight }) => (
  <div
    className={`rounded-lg p-3 ${
      highlight ? highlight : "bg-gray-50 dark:bg-gray-800"
    }`}
  >
    <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
  </div>
);

const colorThemes = {
  TopScorer: {
    badge: "bg-teal-600",
    highlight: "bg-teal-200 dark:bg-teal-800",
    border: "border-teal-200",
  },
  AssistLeader: {
    badge: "bg-blue-600",
    highlight: "bg-blue-200 dark:bg-blue-800",
    border: "border-blue-200",
  },
  GoalAssistLeader: {
    badge: "bg-purple-600",
    highlight: "bg-purple-200 dark:bg-purple-800",
    border: "border-purple-200",
  },
  MVP: {
    badge: "bg-amber-600",
    highlight: "bg-amber-200 dark:bg-amber-800",
    border: "border-amber-200",
  },
};

const KeyPerformersCompact = () => {
  /* 📌 Only visible players */
  const activePlayers = useMemo(
    () => players.filter((p) => !HIDDEN_NAMES.has(p.name)),
    []
  );

  /* 📌 Leaderboards */
  const topGoalScorers = useMemo(
    () =>
      [...activePlayers]
        .sort((a, b) => b.seasonStats.goals - a.seasonStats.goals)
        .slice(0, 3),
    [activePlayers]
  );

  const topAssistProviders = useMemo(
    () =>
      [...activePlayers]
        .sort((a, b) => b.seasonStats.assists - a.seasonStats.assists)
        .slice(0, 3),
    [activePlayers]
  );

  const topGoalAssistProviders = useMemo(
    () =>
      [...activePlayers]
        .sort(
          (a, b) =>
            b.seasonStats.goals +
            b.seasonStats.assists -
            (a.seasonStats.goals + a.seasonStats.assists)
        )
        .slice(0, 3),
    [activePlayers]
  );

  const topValuablePlayers = useMemo(
    () => [...activePlayers].sort((a, b) => b.value - a.value).slice(0, 3),
    [activePlayers]
  );

  const PlayerCard = ({ player, category }) => {
    const theme = colorThemes[category];
    const age = calculateAge(player.age);
    const rating = ratePlayer(player);
    const isGK = player.position === "GK";

    const season = player.seasonStats || {};
    const career = player.careerStats || {};

    const totalGA = (season.goals ?? 0) + (season.assists ?? 0);

    return (
      <div
        className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border ${theme.border}`}
      >
        {/* Badge */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full ${theme.badge} text-white`}
        >
          {
            {
              TopScorer: "Top Scorer",
              AssistLeader: "Assist Leader",
              GoalAssistLeader: "G/A Leader",
              MVP: "MVP",
            }[category]
          }
        </div>

        {/* Injury Badge */}
        {player.injured && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs rounded-full font-semibold">
            Injured
          </div>
        )}

        {/* Player Image */}
        <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700 mb-4">
          <Image
            src={player.image}
            alt={player.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Name + Position */}
        <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
          {player.name}
        </h3>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
          {player.position} • {age} years
        </p>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4 mt-4 text-center">
          {/* GK Stats */}
          {isGK ? (
            <>
              <StatBox
                value={season.goalsConceded ?? career.goalsConceded ?? 0}
                label="Goals Conceded"
                highlight={undefined}
              />
              <StatBox
                value={season.cleanSheets ?? career.cleanSheets ?? 0}
                label="Clean Sheets"
                highlight={undefined}
              />
              <StatBox
                value={season.appearances ?? career.appearances ?? 0}
                label="Appearances"
                highlight={undefined}
              />
              <StatBox
                value={`$${player.value}M`}
                label="Value"
                highlight={undefined}
              />
              <StatBox value={rating} label="Rating" />
            </>
          ) : (
            <>
              <StatBox
                value={`$${player.value}M`}
                label="Value"
                highlight={undefined}
              />
              <StatBox value={rating} label="Rating" />
              {/* Goals */}
              <StatBox
                value={season.goals ?? career.goals ?? 0}
                label="Goals"
                highlight={
                  category === "TopScorer" ? theme.highlight : undefined
                }
              />

              {/* Assists */}
              <StatBox
                value={season.assists ?? career.assists ?? 0}
                label="Assists"
                highlight={
                  category === "AssistLeader" ? theme.highlight : undefined
                }
              />

              {/* G/A */}
              {category === "GoalAssistLeader" && (
                <StatBox
                  value={totalGA}
                  label="G/A"
                  highlight={theme.highlight}
                />
              )}

              {/* Appearances */}
              <StatBox
                value={season.appearances ?? career.appearances ?? 0}
                label="Appearances"
              />
            </>
          )}

          {/* MVP EXTRAS */}
          {category === "MVP" && (
            <>
              <StatBox
                value={`$${player.value}M`}
                label="Value"
                highlight={theme.highlight}
              />
              <StatBox value={rating} label="Rating" />
            </>
          )}
        </div>

        {/* Injury Details */}
        {player.injured && (
          <div className="mt-4 text-center text-xs text-red-500 dark:text-red-400">
            <p>{player.injuryDetails?.type}</p>
            <p>Return: {player.injuryDetails?.recoveryTime}</p>
          </div>
        )}

        {/* Country */}
        <div className="relative w-10 h-6 mx-auto mt-4 rounded-sm overflow-hidden border border-gray-300 dark:border-gray-700">
          <Image
            src={player.country}
            alt="Country flag"
            fill
            className="object-cover"
          />
        </div>
      </div>
    );
  };

  const Section = ({ title, icon, playersList, category }) => (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900 dark:text-white">
        {icon} {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {playersList.map((player) => (
          <PlayerCard key={player.name} player={player} category={category} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <Section
          title="Top Goal Scorers"
          icon={<FaFutbol className="text-teal-600" />}
          playersList={topGoalScorers}
          category="TopScorer"
        />

        <Section
          title="Top Assist Providers"
          icon={<FaHandsHelping className="text-blue-600" />}
          playersList={topAssistProviders}
          category="AssistLeader"
        />

        <Section
          title="Top Goal + Assist Leaders"
          icon={<FaFutbol className="text-purple-600" />}
          playersList={topGoalAssistProviders}
          category="GoalAssistLeader"
        />

        <Section
          title="Most Valuable Players"
          icon={<FaMedal className="text-amber-600" />}
          playersList={topValuablePlayers}
          category="MVP"
        />
      </div>
    </div>
  );
};

export default KeyPerformersCompact;
