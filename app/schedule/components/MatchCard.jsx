import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

const MatchCard = ({ match, formatDate, getDaysToGo }) => {
  const { id, homeTeam, awayTeam, utcDate, competition, round } = match;
  const countdown = getDaysToGo(utcDate);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-xl overflow-hidden group">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white dark:bg-gray-700 p-1">
              <Image
                src={competition.emblem || "/placeholder.svg"}
                alt={competition.name}
                width={24}
                height={24}
                className="w-full h-full object-contain"
                unoptimized={!competition.emblem.startsWith("http")}
              />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                {competition.name}
              </h4>
              {round && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {round}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">{formatDate(utcDate)}</span>
          </div>
        </div>
      </div>

      {/* Teams */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          {/* Home Team */}
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-2 group-hover:scale-105 transition-transform duration-200">
              <Image
                src={homeTeam.crest || ""}
                alt={homeTeam.name}
                width={48}
                height={48}
                className="w-full h-full object-contain"
                unoptimized={!homeTeam.crest.startsWith("http")}
              />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight">
              {homeTeam.shortName || homeTeam.name}
            </h3>
          </div>

          {/* VS Divider */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">VS</span>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-semibold ${countdown.color} text-white`}
            >
              {countdown.text}
            </div>
          </div>

          {/* Away Team */}
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-2 group-hover:scale-105 transition-transform duration-200">
              <Image
                src={awayTeam.crest || "/placeholder.svg"}
                alt={awayTeam.name}
                width={48}
                height={48}
                className="w-full h-full object-contain"
                unoptimized={!awayTeam.crest.startsWith("http")}
              />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight">
              {awayTeam.shortName || awayTeam.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <MapPin className="w-3 h-3" />
          <span>Match #{id}</span>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
