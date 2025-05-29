import Image from "next/image";
import { Button } from "@/components/ui/button";

const MatchCard = ({ match, formatDate, getDaysToGo }) => {
  const { id, homeTeam, awayTeam, utcDate, competition } = match;
  const countdown = getDaysToGo(utcDate);
  
  return (
    <div
      key={id}
      className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-sky-200 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
    >
      <div className="p-2">
        {/* Teams Section */}
        <div className="flex items-center justify-between mb-6">
          {/* Home Team */}
          <div className="flex flex-col items-center flex-1">
            <div className="relative group-hover:scale-110 transition-transform duration-300">
              <Image
                src={homeTeam.crest}
                alt={homeTeam.name}
                width={64}
                height={64}
                className="object-contain drop-shadow-md"
                unoptimized={!homeTeam.crest.startsWith("http")}
              />
            </div>
            <span className="mt-3 font-bold text-sm sm:text-base text-gray-800 dark:text-white text-center leading-tight">
              {homeTeam.name}
            </span>
          </div>

          {/* VS Section */}
          <div className="flex flex-col items-center px-4">
            <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-lg sm:text-2xl px-4 py-2 rounded-full shadow-lg">
              VS
            </div>
            <div className="mt-2 text-sm text-gray-800 dark:text-gray-100">
              {formatDate(utcDate)}
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center flex-1">
            <div className="relative group-hover:scale-110 transition-transform duration-300">
              <Image
                src={awayTeam.crest}
                alt={awayTeam.name}
                width={64}
                height={64}
                className="object-contain drop-shadow-md"
                unoptimized={!awayTeam.crest.startsWith("http")}
              />
            </div>
            <span className="mt-3 font-bold text-sm sm:text-base text-gray-800 dark:text-white text-center leading-tight">
              {awayTeam.name}
            </span>
          </div>
        </div>

        {/* Competition Badge */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Image
            src={competition.emblem}
            alt={competition.name}
            width={32}
            height={32}
            className="rounded-lg object-contain"
            unoptimized={!competition.emblem.startsWith("http")}
          />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            {competition.name}
          </span>
        </div>

        {/* Countdown Badge */}
        <div className="flex justify-center mb-4">
          <span className={`${countdown.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
            {countdown.text}
          </span>
        </div>

        {/* Action Button */}
        <Button className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default MatchCard;