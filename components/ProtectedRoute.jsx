"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          You must login to view this page!
        </h1>

        <SignInButton mode="modal">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
            Sign In
          </Button>
        </SignInButton>
      </div>
    );
  }

  return children;
}
