"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Puma from "../assets/images/puma.png";

// Kit images
import homekit from "../assets/images/homekit.webp";
import awaykit from "../assets/images/thirdkit.jpg";
import cwckit from "../assets/images/cwckit.jpg";
import gk1 from "../assets/images/gk1.jpg";
import gk2 from "../assets/images/gk2.jpg";
import gk3 from "../assets/images/gk3.jpg";

const kits = [
  {
    name: "Home Kit",
    image: homekit,
    sponsor: "Etihad Airways",
    shopLink: "https://shop.mancity.com/en/kits/",
  },
  {
    name: "Away Kit",
    image: awaykit,
    sponsor: "Etihad Airways",
    shopLink: "https://shop.mancity.com/en/kits/",
  },
  {
    name: "Club World Cup Kit",
    image: cwckit,
    sponsor: "Etihad Airways",
    shopLink: "https://shop.mancity.com/en/kits/",
  },
  {
    name: "Goalkeeper 1",
    image: gk1,
    sponsor: "Etihad Airways",
    shopLink: "https://shop.mancity.com/en/kits/",
  },
  {
    name: "Goalkeeper 2",
    image: gk2,
    sponsor: "Etihad Airways",
    shopLink: "https://shop.mancity.com/en/kits/",
  },
  {
    name: "Goalkeeper 3",
    image: gk3,
    sponsor: "Etihad Airways",
    shopLink: "https://shop.mancity.com/en/kits/",
  },
];

const Kit = () => {
  return (
    <section className="py-10 px-4 md:px-12 bg-[#f3f7f9] dark:bg-[#0f1e25]">
      <h2 className="text-3xl md:text-4xl text-center font-extrabold text-[#1b3c42] dark:text-white uppercase mb-12">
        Manchester City 25/26 Kits
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {kits.map((kit, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-[#1c2d36] rounded-full overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col items-center justify-center p-6"
            onClick={() => window.open(kit.shopLink, "_blank")}
            style={{ aspectRatio: "1 / 1", minWidth: 0 }}
          >
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#1b3c42] dark:border-blue-600 shadow-inner">
              <Image
                src={kit.image}
                alt={kit.name}
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>
            <div className="mt-6 text-center px-2">
              <h3 className="text-lg sm:text-xl font-bold text-[#1b3c42] dark:text-white truncate">
                {kit.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                Sponsor: <span className="font-semibold">{kit.sponsor}</span>
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <Image src={Puma} alt="Puma" width={24} height={24} />
                <span className="text-blue-600 font-semibold text-sm sm:text-base">
                  Visit Store
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Kit;
