"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import PREMIER_LEAGUE_LOGO from '../assets/images/prem.webp'
import Image from "next/image";

// const PREMIER_LEAGUE_LOGO =


export default function ManCityStandings() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStandings() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/man-city-standings");
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);
        const data = await res.json();
        setStandings(data.standings || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStandings();
  }, []);

  if (loading) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[#6CABDD] dark:text-[#6CABDD]">
          Manchester City Standings
        </h2>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#1A4268] dark:bg-[#0D2748] text-white">
              {[
                "Competition",
                "Position",
                "Played",
                "Points",
                "W",
                "D",
                "L",
                "GF",
                "GA",
                "GD",
              ].map((header) => (
                <TableHead key={header} className="text-center">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(6)].map((_, i) => (
              <TableRow key={i} className="border-b border-gray-300 dark:border-gray-700">
                {[...Array(10)].map((__, j) => (
                  <TableCell key={j} className="text-center">
                    <Skeleton className="h-5 w-full max-w-[80px] mx-auto rounded" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    );
  }

  if (error)
    return (
      <p className="text-red-600 dark:text-red-400 font-semibold">
        Error loading standings: {error}
      </p>
    );

  if (standings.length === 0)
    return (
      <p className="text-gray-700 dark:text-gray-300">
        No standings data available for Manchester City.
      </p>
    );

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-[#6CABDD] dark:text-[#6CABDD]">
        Manchester City Standings
      </h2>
      <Table className="border border-[#1A4268] dark:border-[#0D2748] rounded-md overflow-hidden">
        <TableHeader>
          <TableRow className="bg-[#1A4268] dark:bg-[#0D2748] text-white">
            <TableHead className="text-left pl-4">Competition</TableHead>
            <TableHead className="text-center">Position</TableHead>
            <TableHead className="text-center">Played</TableHead>
            <TableHead className="text-center">Points</TableHead>
            <TableHead className="text-center">W</TableHead>
            <TableHead className="text-center">D</TableHead>
            <TableHead className="text-center">L</TableHead>
            <TableHead className="text-center">GF</TableHead>
            <TableHead className="text-center">GA</TableHead>
            <TableHead className="text-center">GD</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standings.map((s) => (
            <TableRow
              key={s.competitionCode}
              className="hover:bg-[#6CABDD]/20 dark:hover:bg-[#6CABDD]/30 transition-colors"
            >
              <TableCell className="text-left pl-4 font-semibold text-[#1A4268] dark:text-white flex items-center gap-2">
                {s.competitionCode === "PL" && (
                  <Image
                    src={PREMIER_LEAGUE_LOGO}
                    alt="Premier League"
                    className="w-6 h-6"
                    loading="lazy"
                  />
                )}
                {s.competition}
              </TableCell>
              <TableCell className="text-center text-[#1A4268] dark:text-white font-semibold">
                {s.position}
              </TableCell>
              <TableCell className="text-center text-[#1A4268] dark:text-white">
                {s.playedGames}
              </TableCell>
              <TableCell className="text-center font-bold text-[#1A4268] dark:text-white">
                {s.points}
              </TableCell>
              <TableCell className="text-center text-[#1A4268] dark:text-white">
                {s.wins}
              </TableCell>
              <TableCell className="text-center text-[#1A4268] dark:text-white">
                {s.draws}
              </TableCell>
              <TableCell className="text-center text-[#1A4268] dark:text-white">
                {s.losses}
              </TableCell>
              <TableCell className="text-center text-[#1A4268] dark:text-white">
                {s.goalsFor}
              </TableCell>
              <TableCell className="text-center text-[#1A4268] dark:text-white">
                {s.goalsAgainst}
              </TableCell>
              <TableCell className="text-center text-[#1A4268] dark:text-white">
                {s.goalDifference}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
