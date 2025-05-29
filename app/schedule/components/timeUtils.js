// Time format constants
export const TIME_FORMATS = {
  LOCAL_12: "local12",
  LOCAL_24: "local24",
  UTC: "utc",
  RELATIVE: "relative"
};

export const TIME_FORMAT_LABELS = {
  [TIME_FORMATS.LOCAL_12]: "Local (12h)",
  [TIME_FORMATS.LOCAL_24]: "Local (24h)", 
  [TIME_FORMATS.UTC]: "UTC",
  [TIME_FORMATS.RELATIVE]: "Relative"
};

// Enhanced date formatting function with multiple options
export const formatDate = (dateString, format = TIME_FORMATS.LOCAL_12) => {
  const date = new Date(dateString);
  
  switch (format) {
    case TIME_FORMATS.LOCAL_12:
      return date.toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    
    case TIME_FORMATS.LOCAL_24:
      return date.toLocaleString(undefined, {
        weekday: "short",
        month: "short", 
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    
    case TIME_FORMATS.UTC:
      return date.toUTCString().replace(/GMT$/, "UTC");
    
    case TIME_FORMATS.RELATIVE:
      const now = new Date();
      const diffMs = date - now;
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
      
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Tomorrow";
      if (diffDays === -1) return "Yesterday";
      if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
      if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;
      if (diffHours > 0 && diffHours <= 24) return `In ${diffHours}h`;
      
      return date.toLocaleDateString();
    
    default:
      return formatDate(dateString, TIME_FORMATS.LOCAL_12);
  }
};

// Time Toggle Component
import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TimeToggle = ({ timeFormat, setTimeFormat }) => {
  const [isTimeToggleOpen, setIsTimeToggleOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        onClick={() => setIsTimeToggleOpen(!isTimeToggleOpen)}
        className="bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-lg shadow-sm"
        size="sm"
      >
        <Globe className="w-4 h-4 mr-2" />
        {TIME_FORMAT_LABELS[timeFormat]}
      </Button>
      
      {isTimeToggleOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsTimeToggleOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-20 min-w-[140px]">
            {Object.entries(TIME_FORMAT_LABELS).map(([format, label]) => (
              <button
                key={format}
                className={`w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                  timeFormat === format ? 'bg-sky-50 dark:bg-sky-900 text-sky-700 dark:text-sky-300' : 'text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => {
                  setTimeFormat(format);
                  setIsTimeToggleOpen(false);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};