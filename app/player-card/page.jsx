"use client"
import PlayerCard from "../../components/PlayerCasrd";
import PhilFoden from "../../assets/images/fode.jpg";
import ErlingHaaland from "../../assets/images/haaland.jpg";
import KevinDeBruyne from "../../assets/images/kdb.jpg";
import Rodrigo from "../../assets/images/rodriedit.png";
import BernardoSilva from "../../assets/images/silvab.jpg";
import Savinho from "../../assets/images/savio.png";
import JackGrealish from "../../assets/images/jack.jpg";
import IlkayGundogan from "../../assets/images/gundo.webp";
import JeremyDoku from "../../assets/images/doku.jpg";
import JoskoGvardiol from "../../assets/images/gv.jpg";
import KyleWalker from "../../assets/images/claudio.webp";
import MateoKovacic from "../../assets/images/kovacic.webp";
import Rico from "../../assets/images/ricol.jpg";
import Ruben from "../../assets/images/ruben.jpg";
import Norway from "../../assets/images/norway.webp";
import Belgium from "../../assets/images/belgium.png";
import Portugal from "../../assets/images/portugal.webp";
import Germany from "../../assets/images/germany.png";
import England from "../../assets/images/eng.png";
import Croatia from "../../assets/images/cro.png";
import Spain from "../../assets/images/spain.png";
import Brazil from "../../assets/images/brazil.png";
import Stones from "../../assets/images/stones.jpg";
import Ederson from "../../assets/images/ederson.webp";
import Nunes from "../../assets/images/nunes.jpg";
import James from "../../assets/images/james.webp";
import Netherlands from "../../assets/images/ned.png";
import Ake from "../../assets/images/ake.webp";
import Akanji from "../../assets/images/akanji.jpg";
import Swi from "../../assets/images/swi.png";
import Stefan from "../../assets/images/ortega.jpg";
import { FaHospital } from "react-icons/fa";
import Bob from "../../assets/images/bob.jpg";
import Mar from "../../assets/images/marmoush.webp";
import Eg from "../../assets/images/eg.webp";
import Arg from "../../assets/images/arg.webp";
import Nico from "../../assets/images/nico.webp";
import Orielly from "../../assets/images/oriely.webp";
import Link from "next/link.js";
// Sample player data
const players = [
  {
    name: "Erling Haaland",
    value: 200,
    position: "ST",
    number: 9,
    country: Norway,
    age: 24,
    image: ErlingHaaland,
    careerStats: {
      goals: 256,
      assists: 53,
      appearances: 312,
    },
    seasonStats: {
      goals: 39,
      assists: 5,
      appearances: 51,
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
    country: Belgium,
    number: 17,
    image: KevinDeBruyne,
    careerStats: {
      goals: 177,
      assists: 304,
      appearances: 716,
    },
    seasonStats: {
      goals: 8,
      assists: 10,
      appearances: 43,
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
    country: Portugal,
    age: 30,
    image: BernardoSilva,
    careerStats: {
      goals: 107,
      assists: 114,
      appearances: 598,
    },
    seasonStats: {
      goals: 6,
      assists: 4,
      appearances: 55,
    },
    injured: false,
  },
  {
    name: "İlkay Gündoğan",
    number: 19,
    position: "CM",
    value: 7,
    age: 33,
    country: Germany,
    image: IlkayGundogan,

    careerStats: {
      goals: 107,
      assists: 86,
      appearances: 647,
    },
    seasonStats: {
      goals: 2,
      assists: 6,
      appearances: 49,
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
    country: England,
    image: PhilFoden,
    careerStats: {
      goals: 91,
      assists: 61,
      appearances: 311,
    },
    seasonStats: {
      goals: 10,
      assists: 6,
      appearances: 48,
    },
    injured: false,
  },
  {
    name: "Omar Marmoush",
    number: 7,
    position: "ST",
    value: 75,
    age: 26,
    country: Eg,
    image: Mar,

    careerStats: {
      goals: 41,
      assists: 19,
      appearances: 181,
    },
    seasonStats: {
      goals: 29,
      assists: 16,
      appearances: 53,
    },
    injured: false,
  },
  {
    name: "Jack Grealish",
    position: "LW",
    value: 35,
    number: 10,
    age: 29,
    country: England,
    image: JackGrealish,
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
    country: Croatia,
    image: MateoKovacic,
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
    country: Spain,
    injured: false,
    injuryDetails: {
      type: "Cruciate Ligament Injury",
      recoveryTime: "Out for a Season!",
      tm: "Sept 22, 2024",
    },
    injuryIcon: FaHospital,
    image: Rodrigo,
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
    country: Belgium,
    image: JeremyDoku,
    careerStats: {
      goals: 26,
      assists: 38,
      appearances: 204,
    },
    seasonStats: {
      goals: 6,
      assists: 11,
      appearances: 42,
    },
    injured: false,
  },
  {
    name: "Nathan Ake",
    number: 6,
    position: "CB",
    value: 32,
    age: 30,
    country: Netherlands,
    image: Ake,
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
    country: England,
    age: 30,
    image: Stones,
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
    country: Croatia,
    image: JoskoGvardiol,
    careerStats: {
      goals: 16,
      assists: 9,
      appearances: 214,
    },
    seasonStats: {
      goals: 7,
      assists: 1,
      appearances: 60,
    },
    injured: false,
  },
  {
    name: "James McAtee",
    position: "AM",
    number: 87,
    value: 18,
    age: 21,
    country: England,
    image: James,
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
    country: Swi,
    image: Akanji,
    careerStats: {
      goals: 20,
      assists: 8,
      appearances: 414,
    },
    seasonStats: {
      goals: 0,
      assists: 1,
      appearances: 40,
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
    country: Portugal,
    image: Ruben,
    careerStats: {
      goals: 19,
      assists: 11,
      appearances: 375,
    },
    seasonStats: {
      goals: 0,
      assists: 0,
      appearances: 46,
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
    country: Brazil,
    image: Savinho,
    careerStats: {
      goals: 16,
      assists: 15,
      appearances: 100,
    },
    seasonStats: {
      goals: 2,
      assists: 11,
      appearances: 49,
    },
    injured: false,
  },
  {
    name: "Matheus Nunes",
    position: "CM",
    number: 27,
    country: Portugal,
    value: 35,
    age: 26,
    image: Nunes,
    careerStats: {
      goals: 11,
      assists: 15,
      appearances: 195,
    },
    seasonStats: {
      goals: 4,
      assists: 10,
      appearances: 38,
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
    country: Spain,
    injured: false,
    injuryDetails: {
      type: "Cruciate Ligament Injury",
      recoveryTime: "Out for a Season!",
      tm: "Sept 22, 2024",
    },
    injuryIcon: FaHospital,
    image: Nico,
    careerStats: {
      goals: 5,
      assists: 7,
      appearances: 102,
    },
    seasonStats: {
      goals: 9,
      assists: 5,
      appearances: 44,
    },
  },

  {
    name: "Nico O'Rielly",
    position: "CM",
    number: 75,
    value: 7,
    age: 20,
    // fotmobRating: 7.2,
    country: England,
    image: Orielly,
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
    country: England,
    image: Rico,
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
    country: Norway,
    value: 25,
    age: 21,
    image: Bob,
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
    country: Arg,
    age: 19,
    image: KyleWalker,
    careerStats: {
      goals: 4,
      assists: 8,
      appearances: 48,
    },
    seasonStats: {
      goals: 0,
      assists: 0,
      appearances: 1,
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
    country: Brazil,
    image: Ederson,
    careerStats: {
      goalsConceded: 388,
      cleanSheets: 220,
      appearances: 479,
    },
    seasonStats: {
      goalsConceded: 51,
      cleanSheets: 12,
      appearances: 40,
    },
    injured: false,
  },
  {
    name: "Stefan Ortega",
    number: 18,
    position: "GK",
    value: 9,
    age: 31,
    country: Germany,
    image: Stefan,
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
