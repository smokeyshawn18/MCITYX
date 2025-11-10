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

const KeyPerformersCompact = () => {
  const activePlayers = useMemo(
    () => players.filter((p) => !HIDDEN_NAMES.has(p.name)),
    []
  );

  const topGoalScorers = useMemo(
    () =>
      [...activePlayers]
        .sort((a, b) => b.seasonStats.goals - a.seasonStats.goals)
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

  const topAssistProviders = useMemo(
    () =>
      [...activePlayers]
        .sort((a, b) => b.seasonStats.assists - a.seasonStats.assists)
        .slice(0, 3),
    [activePlayers]
  );

  const topValuablePlayers = useMemo(
    () => [...activePlayers].sort((a, b) => b.value - a.value).slice(0, 3),
    [activePlayers]
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
    MVP: {
      badge: "bg-amber-600",
      highlight: "bg-amber-200 dark:bg-amber-800",
      border: "border-amber-200",
    },
  };

  const PlayerCard = ({ player, category }) => {
    const age = calculateAge(player.age);
    const rating = ratePlayer(player);
    const theme = colorThemes[category];

    return (
      <div
        className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border ${theme.border}`}
      >
        {/* Badge */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full ${theme.badge} text-white tracking-wide`}
        >
          {category === "TopScorer"
            ? "Top Scorer"
            : category === "AssistLeader"
            ? "Assist Leader"
            : "MVP"}
        </div>

        {/* Player Image */}
        <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700 mb-4">
          <Image
            src={player.image}
            alt={player.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Name & Position */}
        <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white tracking-tight">
          {player.name}
        </h3>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
          {player.position} • {age} years
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4 text-center">
          <div
            className={`rounded-lg p-3 ${
              category === "TopScorer"
                ? theme.highlight
                : "bg-gray-50 dark:bg-gray-800"
            }`}
          >
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {player.seasonStats.goals}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Goals</p>
          </div>
          <div
            className={`rounded-lg p-3 ${
              category === "AssistLeader"
                ? theme.highlight
                : "bg-gray-50 dark:bg-gray-800"
            }`}
          >
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {player.seasonStats.assists}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Assists</p>
          </div>
          <div
            className={`rounded-lg p-3 ${
              category === "MVP"
                ? theme.highlight
                : "bg-gray-50 dark:bg-gray-800"
            }`}
          >
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              ${player.value}M
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Value</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {rating}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
          </div>
        </div>

        {/* Country */}
        <div className="relative w-10 h-6 mx-auto mt-4 rounded-sm overflow-hidden border border-gray-200 dark:border-gray-700">
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
        {playersList.map((p) => (
          <PlayerCard key={p.name} player={p} category={category} />
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
          title="Top Goal Assist Providers"
          icon={<FaHandsHelping className="text-blue-600" />}
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
