// components/manualMatches.js
export const manualMatches = [
  // {
  //   id: "99903",
  //   round: "Round of 16",
  //   homeTeam: { name: "Man City", crest: "/assets/images/logo.svg" },
  //   awayTeam: { name: "Al Hilal", crest: "/assets/images/al.png" },
  //   competition: { name: "Fifa CWC", emblem: "/assets/images/cwc.webp" },
  //   utcDate: "2025-07-01T01:00:00Z",
  //   status: "TIMED",
  // },
  // {
  //   id: "99904",
  //   round: "Quarter-final",
  //   homeTeam: { name: "Man City", crest: "/assets/images/logo.svg" },
  //   awayTeam: { name: "Liverpool", crest: "/assets/images/liv.png" },
  //   competition: { name: "FA Cup", emblem: "/assets/images/fa.jpg" },
  //   utcDate: "2025-05-10T15:30:00Z",
  //   status: "TIMED",
  // },
  // {
  //   id: "99905",
  //   round: "Semi-final",
  //   homeTeam: { name: "Man City", crest: "/assets/images/logo.svg" },
  //   awayTeam: { name: "Chelsea", crest: "/assets/images/che.png" },
  //   competition: { name: "Carabao Cup", emblem: "/assets/images/carabao.png" },
  //   utcDate: "2025-02-15T20:00:00Z",
  //   status: "TIMED",
  // },
];

// Tab configuration
export const tabs = [
  {
    key: "prem",
    label: "Prem",
    img: "/assets/images/prem.webp",
    color: "from-sky-600 to-pink-500",
    description: "English Premier League",
  },
  {
    key: "champ",
    label: "Champions League",
    img: "/assets/images/Champ.png",
    color: "from-sky-500 to-blue-200",
    description: "UEFA Champions League",
  },
  {
    key: "carabao",
    label: "Carabao Cup",
    img: "/assets/images/carabao.png",
    color: "from-blue-500 to-cyan-500",
    description: "Carabao Cup",
  },
  {
    key: "fa",
    label: "FA Cup",
    img: "/assets/images/fa.jpg",
    color: "from-blue-500 to-cyan-500",
    description: "FA Cup",
  },
  // {
  //   key: "fifa",
  //   label: "FIFA CWC",
  //   img: "/assets/images/cwc.webp",
  //   color: "from-green-500 to-teal-500",
  //   description: "FIFA Club World Cup",
  // },
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
  if (days <= 7) return { text: `${days} days to go`, color: "bg-teal-700" };
  return { text: `${days} days to go`, color: "bg-sky-600" };
};
