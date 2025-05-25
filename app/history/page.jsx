"use client"

import stadiumImg from "../../assets/images/etihad.jpg";

// import TopScorers from "../../components/TopScorers";
import Image from "next/image";

const timelineData = [
  {
    year: "1880",
    title: "Foundation",
    description:
      "Manchester City’s roots began in East Manchester, starting as St Mark’s West Gorton.",
    image: "/assets/images/found.jpg",
    textColor: "#004C8C",
  },
  {
    year: "1894",
    title: "Renamed",
    description: "The club was renamed to Manchester City.",
    image: "/assets/images/logo.svg",
    textColor: "#1C2C5B",
  },
  {
    year: "1968",
    title: "First League Title",
    description: "City wins their first league title.",
    image: "/assets/images/firstpl.webp",
    textColor: "#1C2C5B",
  },
  {
    year: "Logo evolution",
    title: "",
    description: "When did you start supporting Man City?",
    image: "/assets/images/foundation.webp",
    textColor: "#1C2C5B",
  },
  {
    year: "2016-Present",
    title: "Pep Guardiola",
    description:
      "Manchester City has won 18 trophies during Pep Guardiola’s era.",
    image: "/assets/images/pep.jpg",
    textColor: "#1C2C5B",
  },
  {
    year: "2023",
    title: "Treble Winners",
    description:
      "Manchester City wins the Premier League, FA Cup, and Champions League.",
    image: "/assets/images/foundation.webp",
    textColor: "#1C2C5B",
  },
  {
    year: "2002",
    title: "Etihad Stadium",
    description: "Manchester City opens its new state-of-the-art stadium.",
    image: stadiumImg,
    textColor: "#1C2C5B",
  },
  {
    year: "2020-2024",
    title: "Four in a row",
    description:
      "Manchester City dominated the League, winning it FOUR TIMES IN A ROW.",
    image: "/assets/images/league.png",
    textColor: "#1C2C5B",
  },
];

function History() {
  return (
    <>
     <div className="w-full min-h-screen bg-sky-100 dark:bg-gray-950 py-16 px-5 flex flex-col items-center">
  <h1 className="uppercase text-sky-900 dark:text-white text-4xl sm:text-5xl font-extrabold tracking-widest mb-8 text-center">
    Manchester City History
  </h1>
  <h2 className="text-xl sm:text-2xl text-sky-800 dark:text-white font-bold tracking-wide mb-4 text-center">
    Number one Club in the World (According to{" "}
    <strong className="text-[#6CABDD] font-extrabold">UEFA Rankings</strong>).
  </h2>

  <div className="w-full max-w-7xl py-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {/* Timeline Cards */}
      {timelineData.map((item, index) => (
      <div
  key={index}
  className="bg-white dark:bg-gray-900 text-[#004C8C] dark:text-white border border-[#004C8C] dark:border-gray-700 rounded-2xl shadow-md p-6 sm:p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center"
>
  <div className="w-full max-w-[350px] h-[200px] rounded-2xl overflow-hidden mb-6">
    <Image
      src={item.image}
      alt={item.title}
      width={350}
      height={100}
      quality={100}
      className="object-cover"
    />
  </div>
  
  <h3 className="text-3xl font-extrabold mb-3 text-[#1C2C5B] dark:text-white text-center tracking-wide">
    {item.year}
  </h3>
  
  <p className="text-base font-semibold text-center max-w-[320px] text-[#003865] dark:text-gray-300 leading-relaxed">
    <span className="uppercase font-bold">{item.title}- </span>
    {item.description}
  </p>
</div>

      ))}
    </div>
  </div>
</div>

      {/* <TopScorers /> */}
    </>
  );
}

export default History;
