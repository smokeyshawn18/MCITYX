"use client";
import { players } from "@/data/players";
import PlayerCard from "@/components/PlayerCard";
import Link from "next/link";

const totalValue = players.reduce((sum, player) => sum + player.value, 0);
const inBillion = totalValue / 1000;

const PlayerSection = () => (
  <div className="p-8 bg-sky-100 dark:bg-gray-900">
    <h1 className="text-3xl font-extrabold dark:text-white text-sky-700 mb-10 text-center uppercase tracking-wider ">
      Manchester City Player Stats - 25/26 Season
    </h1>
    <h3 className="text-xl font-extrabold dark:text-white text-sky-700 mb-10 text-center uppercase tracking-wider">
      Squad Value:{" "}
      <span className="text-xl font-bold text-sky-700 dark:text-sky-100">
        ${inBillion}B
      </span>
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {players.map((player, index) => (
        <PlayerCard key={index} player={player} />
      ))}
    </div>
    <p className="font-extrabold dark:text-white text-2xl mt-10 p-5 text-center text-sky-900">
      Note:{" "}
      <span className="text-xl dark:text-white font-semibold text-black">
        This season stats include, all club matches and this season
        International stats.
      </span>
      <br />
      <span className="text-xl dark:text-white font-semibold text-black">
        Stats are according to{" "}
        <Link
          className="font-bold text-blue-700"
          href="https://www.transfermarkt.com/"
        >
          transfermarket.com
        </Link>
      </span>
    </p>
  </div>
);

export default PlayerSection;
