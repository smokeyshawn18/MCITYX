import Image from "next/image";
import { Button } from "@/components/ui/button";

const MatchCard = ({ match, formatDate, getDaysToGo }) => {
  const { id, homeTeam, awayTeam, utcDate, competition } = match;
  const countdown = getDaysToGo(utcDate);

  return (
    <div
      key={id}
      className="relative group bg-gradient-to-br from-white/80 via-sky-50/80 to-blue-100/80 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-blue-900/80
    backdrop-blur-xl rounded-3xl shadow-xl border border-blue-300 dark:border-blue-800
    overflow-hidden transition-all duration-300 hover:scale-[1.025] hover:shadow-2xl"
    >
      {/* Animated Border Glow */}
      <span className="absolute inset-0 z-0 pointer-events-none rounded-3xl border-2 border-transparent group-hover:border-sky-400 group-hover:shadow-[0_0_40px_8px_rgba(56,189,248,0.25)] transition-all duration-500"></span>

      <div className="relative z-10 p-4 sm:p-6 flex flex-col gap-4">
        {/* Competition Badge & Date */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Image
              src={competition.emblem}
              alt={competition.name}
              width={36}
              height={36}
              className="rounded-full border-2 border-sky-200 dark:border-blue-700 shadow"
              unoptimized={!competition.emblem.startsWith("http")}
            />
            <span className="text-xs sm:text-sm font-bold text-sky-700 dark:text-sky-200 uppercase tracking-widest">
              {competition.name}
            </span>
          </div>
          <span className="text-xs font-bold text-gray-900 dark:text-gray-300 bg-white/60 dark:bg-gray-700/60 px-2 py-1 rounded-lg shadow">
            {formatDate(utcDate)}
          </span>
        </div>

        {/* Teams & VS Section */}
        <div className="flex items-center justify-between gap-2 sm:gap-6">
          {/* Home Team */}
          <div className="flex flex-col items-center flex-1">
            <div className="relative group-hover:scale-110 transition-transform duration-300">
              <Image
                src={homeTeam.crest}
                alt={homeTeam.name}
                width={72}
                height={72}
                className="object-contain drop-shadow-xl rounded-xl border-2 border-white dark:border-gray-800 bg-white/60 dark:bg-gray-900/60"
                unoptimized={!homeTeam.crest.startsWith("http")}
              />
            </div>
            <span className="mt-2 font-extrabold text-base sm:text-lg text-gray-800 dark:text-white text-center">
              {homeTeam.name}
            </span>
          </div>

          {/* VS Animated */}
          <div className="flex flex-col items-center mx-2">
            <div className="bg-gradient-to-r from-sky-500 to-blue-700 text-white font-black text-xl sm:text-3xl px-5 py-2 rounded-full shadow-lg ">
              VS
            </div>
            {/* Countdown Badge */}
            <span
              className={`${countdown.color} mt-3 text-white animate-pulse text-[12px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-md tracking-wide uppercase`}
            >
              {countdown.text}
            </span>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center flex-1">
            <div className="relative group-hover:scale-110 transition-transform duration-300">
              <Image
                src={awayTeam.crest}
                alt={awayTeam.name}
                width={72}
                height={72}
                className="object-contain drop-shadow-xl rounded-xl border-2 border-white dark:border-gray-800 bg-white/60 dark:bg-gray-900/60"
                unoptimized={!awayTeam.crest.startsWith("http")}
              />
            </div>
            <span className="mt-2 font-extrabold text-base sm:text-lg text-gray-800 dark:text-white text-center">
              {awayTeam.name}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Button className="mt-6 w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-800 text-white font-bold py-3 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 text-lg tracking-wide">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default MatchCard;
