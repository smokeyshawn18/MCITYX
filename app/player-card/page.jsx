"use client"
import PlayerCard from "../../components/PlayerCasrd";
import { FaHospital } from "react-icons/fa";
import Link from "next/link";
// Sample player data
const players = [
  {
    name: "Erling Haaland",
    value: 200,
    position: "ST",
    number: 9,
    country: "/assets/images/norway.webp",
    age: 24,
    image: "/assets/images/haaland.jpg",
    careerStats: {
      goals: 256,
      assists: 53,
      appearances: 312,
    },
    seasonStats: {
      goals: 40,
      assists: 5,
      appearances: 52,
    },
    injured: false,
    injuryDetails: {
      tm: "March 30, 2025",
      type: "Knee Injury",
      recoveryTime: "Mid May 2025",
    },
    injuryIcon: FaHospital,
  },

  {
    name: "Kevin De Bruyne",
    position: "AM",
    value: 27,
    age: 33,
    country: "/assets/images/belgium.png",
    number: 17,
    image: "/assets/images/kdb.jpg",
    careerStats: {
      goals: 177,
      assists: 304,
      appearances: 716,
    },
    seasonStats: {
      goals: 8,
      assists: 10,
      appearances: 44,
    },
    injured: false,
    injuryDetails: {
      tm: "Sept 18, 2024",
      type: "Groin Injury",
      recoveryTime: "A Few Days",
    },
    injuryIcon: FaHospital,
  },

  {
    name: "Bernardo Silva",
    position: "AM",
    value: 45,
    number: 20,
    country: "/assets/images/portugal.webp",
    age: 30,
    image: "/assets/images/silvab.jpg",
    careerStats: {
      goals: 107,
      assists: 114,
      appearances: 598,
    },
    seasonStats: {
      goals: 6,
      assists: 4,
      appearances: 56,
    },
    injured: false,
  },
  {
    name: "İlkay Gündoğan",
    number: 19,
    position: "CM",
    value: 7,
    age: 33,
    country: "/assets/images/germany.png",
    image: "/assets/images/gundo.webp",

    careerStats: {
      goals: 107,
      assists: 86,
      appearances: 647,
    },
    seasonStats: {
      goals: 3,
      assists: 6,
      appearances: 50,
    },
    injured: false,
  },

  {
    name: "Phil Foden",
    position: "AM",
    number: 47,
    value: 130,
    age: 24,
    // fotmobRating: 7.2,
    country: "/assets/images/eng.png",
    image: "/assets/images/fode.jpg",
    careerStats: {
      goals: 91,
      assists: 61,
      appearances: 311,
    },
    seasonStats: {
      goals: 10,
      assists: 6,
      appearances: 49,
    },
    injured: false,
  },
  {
    name: "Omar Marmoush",
    number: 7,
    position: "ST",
    value: 75,
    age: 26,
    country: "/assets/images/eg.webp",
    image: "/assets/images/marmoush.webp",

    careerStats: {
      goals: 41,
      assists: 19,
      appearances: 181,
    },
    seasonStats: {
      goals: 29,
      assists: 16,
      appearances: 54,
    },
    injured: false,
  },
  {
    name: "Jack Grealish",
    position: "LW",
    value: 35,
    number: 10,
    age: 29,
    country: "/assets/images/eng.png",
    image: "/assets/images/jack.jpg",
    careerStats: {
      goals: 53,
      assists: 74,
      appearances: 412,
    },
    seasonStats: {
      goals: 5,
      assists: 5,
      appearances: 35,
    },
    injured: false,
    injuryDetails: {
      tm: "Feb 11, 2025",
      type: "Groin Injury",
      recoveryTime: "Doubtful ",
    },
    injuryIcon: FaHospital,
  },
  {
    name: "Mateo Kovacic",
    number: 8,
    position: "DM",
    value: 25,
    age: 30,
    country: "/assets/images/cro.png",
    image: "/assets/images/kovacic.webp",
    careerStats: {
      goals: 32,
      assists: 55,
      appearances: 640,
    },
    seasonStats: {
      goals: 7,
      assists: 3,
      appearances: 48,
    },
    injured: false,
  },
  {
    name: "Rodri",
    number: 16,
    position: "DM",
    value: 130,
    age: 28,
    injury: "Torn ACL",
    country: "/assets/images/spain.png",
    injured: false,
    injuryDetails: {
      type: "Cruciate Ligament Injury",
      recoveryTime: "Out for a Season!",
      tm: "Sept 22, 2024",
    },
    injuryIcon: FaHospital,
    image: "/assets/images/rodriedit.png",
    careerStats: {
      goals: 35,
      assists: 39,
      appearances: 444,
    },
    seasonStats: {
      goals: 0,
      assists: 0,
      appearances: 5,
    },
  },

  {
    name: "Jeremy Doku",
    number: 11,
    position: "LW",
    value: 55,
    age: 22,
    country: "/assets/images/belgium.png",
    image: "/assets/images/doku.jpg",
    careerStats: {
      goals: 26,
      assists: 38,
      appearances: 204,
    },
    seasonStats: {
      goals: 6,
      assists: 11,
      appearances: 43,
    },
    injured: false,
  },
  {
    name: "Nathan Ake",
    number: 6,
    position: "CB",
    value: 32,
    age: 30,
    country: "/assets/images/ned.png",
    image: "/assets/images/ake.webp",
    careerStats: {
      goals: 27,
      assists: 13,
      appearances: 347,
    },
    seasonStats: {
      goals: 0,
      assists: 0,
      appearances: 19,
    },
    injured: false,
    injuryDetails: {
      tm: "Jan 19, 2025",
      type: "Muscle Injury",
      recoveryTime: "Early February 2025",
    },
    injuryIcon: FaHospital,
  },
  {
    name: "John Stones",
    position: "CB",
    number: 5,
    value: 30,
    country: "/assets/images/eng.png",
    age: 30,
    image: "/assets/images/stones.jpg",
    careerStats: {
      goals: 21,
      assists: 10,
      appearances: 461,
    },
    seasonStats: {
      goals: 3,
      assists: 2,
      appearances: 22,
    },
    injured: true,
    injuryDetails: {
      tm: "Feb 20, 2025",
      type: "Foot Injury",
      recoveryTime: "Doubtful!",
    },
    injuryIcon: FaHospital,
  },
  {
    name: "Josko Gvardiol",
    number: 24,
    position: "LB",
    value: 75,
    age: 22,
    country: "/assets/images/cro.png",
    image: "/assets/images/gv.jpg",
    careerStats: {
      goals: 16,
      assists: 9,
      appearances: 214,
    },
    seasonStats: {
      goals: 7,
      assists: 1,
      appearances: 61,
    },
    injured: false,
  },
  {
    name: "James McAtee",
    position: "AM",
    number: 87,
    value: 18,
    age: 21,
    country: "/assets/images/eng.png",
    image: "/assets/images/james.webp",
    careerStats: {
      goals: 14,
      assists: 7,
      appearances: 82,
    },
    seasonStats: {
      goals: 7,
      assists: 1,
      appearances: 26,
    },
    injured: false,
  },
  {
    name: "Manuel Akanji",
    number: 25,
    position: "CB",
    value: 32,
    age: 29,
    country: "/assets/images/swi.png",
    image: "/assets/images/akanji.jpg",
    careerStats: {
      goals: 20,
      assists: 8,
      appearances: 414,
    },
    seasonStats: {
      goals: 0,
      assists: 1,
      appearances: 41,
    },
    injured: false,
    injuryDetails: {
      tm: "Feb 11, 2025",
      type: "Muscle Injury",
      recoveryTime: "Early March!",
    },
    injuryIcon: FaHospital,
  },
  {
    name: "Ruben Dias",
    number: 3,
    position: "CB",
    value: 70,
    age: 28,
    country: "/assets/images/portugal.webp",
    image: "/assets/images/ruben.jpg",
  
  
    careerStats: {
      goals: 19,
      assists: 11,
      appearances: 375,
    },
    seasonStats: {
      goals: 0,
      assists: 0,
      appearances: 47,
    },
    injured: false,
    injuryDetails: {
      tm: "Jan 24, 2025",
      type: "Groin Injury",
      recoveryTime: "Mid February!",
    },
    injuryIcon: FaHospital,
  },

  {
    name: "Savinho",
    number: 26,
    position: "RW",
    value: 55,
    age: 20,
    country: "/assets/images/brazil.png",
    image: "/assets/images/savio.png",
    careerStats: {
      goals: 16,
      assists: 15,
      appearances: 100,
    },
    seasonStats: {
      goals: 2,
      assists: 11,
      appearances: 50,
    },
    injured: false,
  },
  {
    name: "Matheus Nunes",
    position: "CM",
    number: 27,
    country: "/assets/images/portugal.webp",
    value: 35,
    age: 26,
    image: "/assets/images/nunes.jpg",
    careerStats: {
      goals: 11,
      assists: 15,
      appearances: 195,
    },
    seasonStats: {
      goals: 4,
      assists: 10,
      appearances: 39,
    },
    injured: false,
  },
  {
    name: "Nico Gonzalez",
    number: 14,
    position: "DM",
    value: 40,
    age: 23,
    injury: "Torn ACL",
    country: "/assets/images/spain.png",
    injured: false,
    injuryDetails: {
      type: "Cruciate Ligament Injury",
      recoveryTime: "Out for a Season!",
      tm: "Sept 22, 2024",
    },
    injuryIcon: FaHospital,
    image: "/assets/images/nico.webp",
    careerStats: {
      goals: 5,
      assists: 7,
      appearances: 102,
    },
    seasonStats: {
      goals: 9,
      assists: 5,
      appearances: 45,
    },
  },

  {
    name: "Nico O'Rielly",
    position: "CM",
    number: 75,
    value: 7,
    age: 20,
    // fotmobRating: 7.2,
    country: "/assets/images/eng.png",
    image: "/assets/images/oriely.webp",
    careerStats: {
      goals: 0,
      assists: 0,
      appearances: 0,
    },
    seasonStats: {
      goals: 5,
      assists: 2,
      appearances: 20,
    },
    injured: false,
  },
  {
    name: "Rico Lewis",
    number: 82,
    position: "RB",
    value: 40,
    age: 20,
    country: "/assets/images/eng.png",
    image: "/assets/images/ricol.jpg",
    careerStats: {
      goals: 3,
      assists: 5,
      appearances: 51,
    },
    seasonStats: {
      goals: 2,
      assists: 5,
      appearances: 47,
    },
    injured: false,
  },
  {
    name: "Oscar Bobb",
    position: "RW",
    number: 52,
    country: "/assets/images/norway.webp",
    value: 25,
    age: 21,
    image: "/assets/images/bob.jpg",
    careerStats: {
      goals: 4,
      assists: 3,
      appearances: 34,
    },
    seasonStats: {
      goals: 0,
      assists: 1,
      appearances: 4,
    },
    injured: false,
    injuryDetails: {
      tm: "Aug 14, 2024",
      type: "Broken Leg",
      recoveryTime: "Early April 2025",
    },
    injuryIcon: FaHospital,
  },

  {
    name: "C. Echeverri",
    position: "AM",
    number: 2,
    value: 18,
    country: "/assets/images/arg.webp",
    age: 19,
    image: "/assets/images/claudio.webp",
    careerStats: {
      goals: 4,
      assists: 8,
      appearances: 48,
    },
    seasonStats: {
      goals: 0,
      assists: 0,
      appearances: 2,
    },
    injured: false,
    injuryDetails: {
      tm: "Jan 01, 2025",
      type: "Will Join the Team at March",
      recoveryTime: "Early March 2025",
    },
    injuryIcon: FaHospital,
  },
  {
    name: "Ederson Moraes",
    number: 3,
    position: "GK",
    value: 25,
    age: 31,
    country: "/assets/images/brazil.png",
    image: "/assets/images/ederson.webp",
    careerStats: {
      goalsConceded: 388,
      cleanSheets: 220,
      appearances: 479,
    },
    seasonStats: {
      goalsConceded: 51,
      cleanSheets: 13,
      appearances: 41,
    },
    injured: false,
  },
  {
    name: "Stefan Ortega",
    number: 18,
    position: "GK",
    value: 9,
    age: 31,
    country: "/assets/images/germany.png",
 
    image: "/assets/images/ortega.jpg",
    careerStats: {
      goalsConceded: 414,
      cleanSheets: 92,
      appearances: 318,
    },
    seasonStats: {
      goalsConceded: 23,
      cleanSheets: 6,
      appearances: 20,
    },
    injured: false,
  },
  // Add more players here
];
const totalValue = players.reduce((sum, player) => sum + player.value, 0);
const inBillion = totalValue / 1000;

const PlayerSection = () => {
  return (
    <div className="p-8 bg-sky-100 dark:bg-gray-900">
      <h1 className="text-4xl font-extrabold dark:text-white text-sky-700 mb-10 text-center uppercase tracking-wider ">
        Manchester City Player Stats
      </h1>
      <h3 className="text-3xl font-extrabold dark:text-white text-sky-700 mb-10 text-center uppercase tracking-wider">
        Squad Value: ${inBillion}B
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {players.map((player, index) => (
          <PlayerCard key={index} player={player} />
        ))}
      </div>
      <p className="font-extrabold dark:text-white text-2xl mt-10 p-5 text-center text-sky-900">
        Note:{" "}
        <span className="text-xl dark:text-white font-semibold text-black">
          This season stats include, all club matches and this season
          International stats.
        </span>
        <br />
        <span className="text-xl dark:text-white font-semibold text-black">
          Stats are according to{" "}
          <Link
            className="font-bold text-blue-700"
            href="https://www.transfermarkt.com/"
          >
            transfermarket.com
          </Link>
        </span>
      </p>
    </div>
  );
};

export default PlayerSection;
