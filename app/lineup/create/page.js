"use client"

import LineupEditor from "@/components/LineupEditor";

import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";


export default function CreateLineup() {

  const {isSignedIn} = useUser()
    if (!isSignedIn) {
    return (
      <div className="p-6 text-center dark:text-white text-black font-bold ">
      Please Sign In to create or edit lineups
   <br/>
        
        <SignInButton mode="modal" className="bg-black text-white p-2 mt-2 rounded-xl"
        />
       
   
      </div>
    
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
       
        <h1 className="text-3xl dark:text-black font-bold text-center mb-8">Create New Lineup
            <br/>
               <span className="text-xl dark:text-black font-bold text-center mb-2">
            Drag to move player position
        </span>
        </h1>
     
        <LineupEditor />
       
      </div>
    </div>
  );
}
