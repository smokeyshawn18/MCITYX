// Manual matches data for FIFA Club World Cup
export const manualMatches = [
  {
    id: "99901",
    homeTeam: {
      name: "Man City",
      crest: "/assets/images/logo.svg",
    },
    awayTeam: {
      name: "Wydad AC",
      crest: "/assets/images/wydad.png",
    },
    competition: {
      name: "Fifa CWC",
      emblem: "/assets/images/cwc.webp",
    },
    utcDate: "2025-06-18T16:00:00Z",
    status: "TIMED",
  },
  {
    id: "99902",
    homeTeam: {
      name: "Man City",
      crest: "/assets/images/logo.svg",
    },
    awayTeam: {
      name: "Al Ain",
      crest: "/assets/images/alalyn.png",
    },
    competition: {
      name: "Fifa CWC",
      emblem: "/assets/images/cwc.webp",
    },
    utcDate: "2025-06-23T06:45:00Z",
    status: "TIMED",
  },
  {
    id: "99903",
    homeTeam: {
      name: "Juventus",
      crest: "/assets/images/juv.jpg",
    },
    awayTeam: {
      name: "Man City",
      crest: "/assets/images/logo.svg",
    },
    competition: {
      name: "Fifa CWC",
      emblem: "/assets/images/cwc.webp",
    },
    utcDate: "2025-06-27T06:45:00Z",
    status: "TIMED",
  },
];

// Tab configuration
export const tabs = [
  {
    key: "fifa",
    label: "FIFA CWC",
    img: "/assets/images/cwc.webp",
    color: "from-blue-500 to-cyan-500",
    description: "FIFA Club World Cup",
  },
  {
    key: "prem",
    label: "Premier League",
    img: "/assets/images/prem.webp",
    color: "from-purple-500 to-pink-500",
    description: "English Premier League",
  },
  {
    key: "champ",
    label: "Champions League",
    img: "/assets/images/Champ.png",
    color: "from-indigo-500 to-blue-500",
    description: "UEFA Champions League",
  },
];

// Utility function to get days countdown with styling
export const getDaysToGo = (utcDate) => {
  const matchDate = new Date(utcDate);
  const currentDate = new Date();
  matchDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  const days = Math.ceil((matchDate - currentDate) / (1000 * 60 * 60 * 24));

  if (days === 0) return { text: "Today", color: "bg-green-500" };
  if (days === 1) return { text: "Tomorrow", color: "bg-blue-500" };
  if (days < 0) return { text: "Past Match (City Won)", color: "bg-slate-800" };
  if (days <= 7) return { text: `${days} days to go`, color: "bg-orange-700" };
  return { text: `${days} days to go`, color: "bg-sky-600" };
};
