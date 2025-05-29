"use client"
import heroImage from "../assets/images/home.jpeg";
import Tot from "../assets/images/liverpool.png";

import { useState, useMemo, useEffect, useCallback } from "react";



import PremierLeagueLogo from "../assets/images/prem.webp";
import LiveMatches from "@/components/LiveScore";
import CoachProfile from "@/components/Coach";
import Kit from "@/components/Kit";
import KeyPerformers from "@/components/Keyperformer";
import Image from "next/image";




const Home = () => {
  const matchDay = useMemo(
    () => [
      {
        date: "2025-02-23",
        opponent: "Liverpool",
        team: "Man City",
        time: "22:15", // Match time in local format
        venue: "Etihad Stadium",
        opponentLogo: Tot,
        competition: PremierLeagueLogo,
      },
    ],
    []
  );

  const getLocalDateTime = (date, time) => {
    return new Date(`${date}T${time}:00`);
  };

  const calculateCountdown = (matchDateTime) => {
    const now = new Date();
    const timeDifference = matchDateTime - now;

    if (timeDifference <= 0) {
      return {
        hours: "00",
        minutes: "00",
        seconds: "00",
        hasEnded: true,
        hasStarted: false,
      };
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
      hasEnded: false,
      hasStarted: true,
    };
  };

  const [todayMatches, setTodayMatches] = useState([]);
  const [setCountdowns] = useState({});

  const getTodayMatches = useCallback(() => {
    const today = new Date();
    return matchDay.filter((match) => {
      const matchDateTime = getLocalDateTime(match.date, match.time);
      return (
        today.toDateString() === matchDateTime.toDateString() // Matches only today
      );
    });
  }, [matchDay]);

  useEffect(() => {
    setTodayMatches(getTodayMatches());
  }, [getTodayMatches]);

  useEffect(() => {
    if (todayMatches.length === 0) return;

    const timer = setInterval(() => {
      const updatedCountdowns = todayMatches.reduce((acc, match) => {
        const matchDateTime = getLocalDateTime(match.date, match.time);
        acc[match.opponent] = calculateCountdown(matchDateTime);
        return acc;
      }, {});

      setCountdowns(updatedCountdowns);

      const allMatchesEnded = todayMatches.every(
        (match) => updatedCountdowns[match.opponent]?.hasEnded
      );

      if (allMatchesEnded) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [todayMatches]);

  return (
   
  <>

    <section className="bg-[#f0f8ff] dark:bg-gray-950 dark:text-white text-gray-800 py-12 lg:py-24">
    
      
      <div className="relative container mx-auto px-4 lg:px-8">
     
     
     {/* <Assistant/> */}
     <br/>
        <LiveMatches />

        <div className="relative h-80 sm:h-96 mb-4">
          <Image
            src={heroImage}
            alt="Hero"
            className="w-full h-full object-cover rounded-3xl shadow-md"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-60 rounded-3xl"></div>
          <div className="absolute bottom-0 left-0 p-4 sm:p-8 text-white">
            <h1 className="text-4xl sm:text-6xl font-bold">MCityX</h1>
            <p className="text-md sm:text-lg font-medium mt-2 sm:mt-3">
              Your Home for Manchester City.
            </p>
          </div>
        </div>
          <h2 className="p-4 text-4xl font-extrabold mb-8 text-center dark:text-white text-[#1b3c42] uppercase tracking-widest">
        Key Performers this Season
      </h2>
        <KeyPerformers />
     
      </div>

      <CoachProfile className="mt-4" />
      <Kit />
    </section>
  </>
  );
};

export default Home;
