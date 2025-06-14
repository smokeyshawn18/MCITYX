"use client";
import heroImage from "../assets/images/home.jpeg";
import LiveMatches from "@/components/LiveScore";
import CoachProfile from "@/components/Coach";
import Kit from "@/components/Kit";
import KeyPerformers from "@/components/Keyperformer";
import Image from "next/image";
import WelcomePlayer from "@/components/Welcome";
import { players } from "@/data/players";
import Bye from "@/components/Bye";
import GoogleAd from "@/components/GoogleAd";

const Home = () => {
  const selectedNames = [
    "Rayan Ait Nouri",
    "Tijjani Reijnders",
    "Rayan Cherki",
  ]; // ✅ Define this before usage
  const byeNames = ["King Kev (Napoli)", "Jack Grealish"];
  return (
    <>
      <section className="bg-[#f0f8ff] dark:bg-gray-950 dark:text-white text-gray-800 py-12 lg:py-24">
        <div className="relative container mx-auto px-4 lg:px-8">
          <GoogleAd slot="YOUR_SLOT_ID" />
          <WelcomePlayer players={players} selectedNames={selectedNames} />
          <Bye players={players} byeNames={byeNames} />
          <br />
          <LiveMatches />
          <div className="relative h-80 sm:h-96 mb-4">
            <Image
              src={heroImage}
              alt="Hero"
              className="w-full h-full object-cover rounded-3xl shadow-md"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-60 rounded-3xl"></div>
            <div className="absolute bottom-0 left-0 p-4 sm:p-8 text-white">
              <h1 className="text-4xl sm:text-6xl font-bold">MCityX</h1>
              <p className="text-md sm:text-lg font-medium mt-2 sm:mt-3">
                Your Home for Manchester City.
              </p>
            </div>
          </div>
          <h2 className="p-4 text-4xl font-extrabold mb-8 text-center dark:text-white text-[#1b3c42] uppercase tracking-widest">
            Key Performers this Season
          </h2>
          <KeyPerformers />
        </div>

        <CoachProfile className="mt-4" />
        <Kit />
      </section>
    </>
  );
};

export default Home;
