import Image from "next/image";

import { Clock } from "lucide-react";

const MatchCard = ({ match, formatDate, getDaysToGo }) => {
  const { id, homeTeam, awayTeam, utcDate, competition, round } = match;
  const countdown = getDaysToGo(utcDate);

  return (
    <article
      key={id}
      className="group relative bg-gradient-to-br from-sky-50/95 via-white/95 to-blue-50/95 
                 dark:from-slate-900/95 dark:via-slate-800/95 dark:to-blue-950/95
                 backdrop-blur-lg rounded-3xl shadow-lg border-2 border-sky-200/50 dark:border-slate-700/50
                 hover:border-sky-400 dark:hover:border-sky-600 hover:shadow-2xl hover:shadow-sky-200/20 dark:hover:shadow-sky-900/20
                 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Top Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600"></div>

      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-sky-400/10 via-blue-500/10 to-sky-600/10"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6">
        {/* Competition Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3 bg-white/80  rounded-2xl px-4 py-2 shadow-sm">
            <Image
              src={competition.emblem}
              alt={competition.name}
              width={42}
              height={42}
              className="rounded-lg shadow-sm"
              unoptimized={!competition.emblem.startsWith("http")}
            />
            <span className="text-xs sm:text-sm font-bold text-blue-900 dark:text-sky-900 uppercase tracking-wide">
              {competition.name}
            </span>
          </div>

          <div className="flex items-center space-x-2 bg-sky-100/80 dark:bg-slate-700/80 rounded-xl px-3 py-2">
            <Clock className="w-3 h-3 text-sky-600 dark:text-sky-400" />
            <span className="text-xs font-semibold text-sky-700 dark:text-sky-300 uppercase ">
              {formatDate(utcDate)}
            </span>
          </div>
        </header>

        {/* Teams Section */}
        <div className="flex items-center justify-between gap-3 sm:gap-6 mb-6">
          {/* Home Team */}
          <div className="flex flex-col items-center flex-1 space-y-3">
            <div className="relative p-3 bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Image
                src={homeTeam.crest}
                alt={homeTeam.name}
                width={56}
                height={56}
                className="object-contain"
                unoptimized={!homeTeam.crest.startsWith("http")}
              />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-sm sm:text-base text-sky-800 dark:text-sky-200 leading-tight">
                {homeTeam.shortName || homeTeam.name}
              </h3>
            </div>
          </div>

          {/* VS Section with Countdown */}
          <div className="flex flex-col items-center space-y-3 px-2">
            <div className="bg-gradient-to-br from-sky-600 to-blue-700 text-white font-black text-lg sm:text-2xl px-4 py-2 rounded-full shadow-lg">
              VS
            </div>

            {/* Countdown Badge */}
            <div
              className={`${countdown.color} text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider animate-pulse`}
            >
              {countdown.text}
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center flex-1 space-y-3">
            <div className="relative p-3 bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Image
                src={awayTeam.crest}
                alt={awayTeam.name}
                width={56}
                height={56}
                className="object-contain"
                unoptimized={!awayTeam.crest.startsWith("http")}
              />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-sm sm:text-base text-sky-800 dark:text-sky-200 leading-tight">
                {awayTeam.shortName || awayTeam.name}
              </h3>
            </div>
          </div>
        </div>

        <span className="flex items-center justify-center space-x-2">
          <span>{round}</span>
        </span>
      </div>
    </article>
  );
};

export default MatchCard;
