"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Loader2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import ManCityStandings from "@/components/PointsTable";

import ManCitySchedule from "@/components/Schedule";
import FifaCwcSchedule from "@/components/Schedule";


const Schedule = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [showPrediction, setShowPrediction] = useState(false);

  // useEffect(() => {
  //   fetch("/api/matches")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Season 2024/25 has ended! @smokeyshawn18");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.matches && Array.isArray(data.matches)) {
  //         // Filter upcoming matches with status "TIMED"
  //         const apiMatches = data.matches.filter(
  //           (match) => match.status === "TIMED"
  //         );

  //         // You can add manual matches here if needed, matching API structure
  //         const manualMatches = [
  //           // Example manual match structure:
  //           // {
  //           //   id: "99901",
  //           //   homeTeam: { name: "Man City", crest: "/images/mcity.png" },
  //           //   awayTeam: { name: "Crystal Palace", crest: "/images/crystal_palace.png" },
  //           //   competition: { name: "Final", emblem: "/images/final_emblem.png" },
  //           //   utcDate: "2025-05-17T14:00:00Z",
  //           //   status: "TIMED",
  //           // },
  //         ];

  //         const allMatches = [...apiMatches, ...manualMatches];

  //         // Sort ascending by date
  //         allMatches.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));

  //         setMatches(allMatches);
  //         setError(null);
  //       } else {
  //         setError("Unexpected data format received from server.");
  //       }
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setError(
  //          "Season 2024/25 has ended! @smokeyshawn18"
  //       );
  //       setLoading(false);
  //     });
  // }, []);

  // Format date nicely
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleString("en-GB", {
  //     weekday: "short",
  //     month: "short",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  // };

  // // Calculate countdown text
  // const getDaysToGo = (utcDate) => {
  //   const matchDate = new Date(utcDate);
  //   const currentDate = new Date();
  //   matchDate.setHours(0, 0, 0, 0);
  //   currentDate.setHours(0, 0, 0, 0);

  //   const diff = matchDate.getTime() - currentDate.getTime();
  //   const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  //   if (days === 0) return "Today";
  //   if (days === 1) return "Tomorrow";
  //   if (days < 0) return "Past Match";
  //   return `${days} days to go`;
  // };

  // // Toggle predicted lineup display
  // const togglePrediction = (matchId) => {
  //   if (selectedMatchId === matchId && showPrediction) {
  //     setShowPrediction(false);
  //   } else {
  //     setSelectedMatchId(matchId);
  //     setShowPrediction(true);
  //   }
  // };

  return (
<section className="min-h-screen bg-sky-100 dark:bg-gray-950 dark:text-white py-12 px-4 sm:px-6 lg:px-8">
   <FifaCwcSchedule/>
</section>
 

    // <section className="min-h-screen bg-sky-100 dark:bg-gray-950 dark:text-white py-12 px-4 sm:px-6 lg:px-8">
    //   <div className="max-w-7xl mx-auto">
    //     <h1 className="text-3xl md:text-4xl font-bold text-sky-800 dark:text-sky-200 text-center mb-12 flex items-center justify-center gap-3">
    //       <Calendar className="w-8 h-8 text-[#1A4268] dark:text-sky-300" />
    //       Upcoming Matches
    //     </h1>

    //   {error ? (
    //       <div className="max-w-md mx-auto">
    //         <div className="rounded-lg border border-red-400 bg-red-50 p-4 text-center">
    //           <p className="text-red-700 font-semibold">{error}</p>
    //         </div>
    //       </div>
    //     ) : loading ? (
    //       <div className="flex justify-center items-center min-h-[50vh]">
    //         <Loader2 className="w-12 h-12 text-[#1A4268] dark:text-white animate-spin" />
    //       </div>
    //     ) : matches.length > 0 ? (
    //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //         {matches.map((match) => {
    //           const { homeTeam, awayTeam, utcDate, competition } = match;
    //           const matchDate = new Date(utcDate);
    //           const now = new Date();
    //           const canPredict = matchDate > now;
              
    //           return (
    //             <div
    //               key={match.id}
    //               className="bg-sky-100 dark:bg-gray-900 backdrop-blur-lg rounded-2xl p-6 border border-[#1A4268]/30 hover:border-[#1A4268]/70 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    //             >
    //               <div className="space-y-6">
    //                 {/* Team Logos and VS */}
    //                 <div className="flex items-center justify-between gap-4">
    //                   <div className="flex-1 flex justify-center">
    //                     <Image
    //                       src={homeTeam.crest}
    //                       alt={homeTeam.name}
    //                       width={80}
    //                       height={80}
    //                       quality={100}
    //                       className="object-contain rounded-full border-2 border-[#1A4268]/50"
    //                       unoptimized={
    //                         homeTeam.crest.startsWith("http") ? false : true
    //                       }
    //                     />
    //                   </div>

    //                   <span className="text-[#1A4268] dark:text-sky-200 font-bold text-2xl md:text-3xl px-2">
    //                     VS
    //                   </span>

    //                   <div className="flex-1 flex justify-center">
    //                     <Image
    //                       src={awayTeam.crest}
    //                       alt={awayTeam.name}
    //                       width={80}
    //                       height={80}
    //                       quality={100}
    //                       className="object-contain rounded-full border-2 border-[#1A4268]/50"
    //                       unoptimized={
    //                         awayTeam.crest.startsWith("http") ? false : true
    //                       }
    //                     />
    //                   </div>
    //                 </div>

    //                 {/* Competition Info */}
    //                 <div className="space-y-4">
    //                   <div className="flex items-center justify-center gap-3">
    //                     <Image
    //                       src={competition.emblem}
    //                       alt={competition.name}
    //                       width={80}
    //                       height={80}
    //                       quality={100}
    //                       className="object-contain rounded-xl"
    //                       unoptimized={
    //                         competition.emblem.startsWith("http") ? false : true
    //                       }
    //                     />
    //                     <span className="text-black dark:text-white font-semibold uppercase tracking-wider">
    //                       | {competition.name}
    //                     </span>
    //                   </div>

    //                   {/* Date & Time */}
    //                   <div className="flex items-center justify-center gap-3">
    //                     <Clock className="w-5 h-5 text-[#1A4268] dark:text-sky-300" />
    //                     <span className="text-black dark:text-white text-sm md:text-base font-medium">
    //                       {formatDate(utcDate)}
    //                     </span>
    //                   </div>

    //                   {/* Countdown */}
    //                   <div className="flex items-center justify-center">
    //                     <span className="text-[#1A4268] dark:text-white text-sm md:text-base font-bold bg-white/30 dark:bg-white/10 px-3 py-1 rounded-full">
    //                       {getDaysToGo(utcDate)}
    //                     </span>
    //                   </div>
    //                 </div>

    //                 {/* Buttons */}
    //                 <div className="flex flex-col gap-2">
    //                   {/* Match Details Button */}
    //                   <Button className="w-full bg-[#1E90FF] dark:bg-[#3A6EA5] hover:bg-[#1A4268] dark:hover:bg-[#103554] text-white py-2 px-4 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105">
    //                     Match Details
    //                   </Button>
                      
                   
    //                 </div>
                    
        
    //               </div>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     )
    
    //      : (
    //       <div className="text-center text-black/80 dark:text-white/80 py-20">
    //         <p className="text-lg font-medium">No upcoming matches scheduled.</p>
    //       </div>
    //     )}
    //   </div>
    // </section>
  );
};

export default Schedule;
