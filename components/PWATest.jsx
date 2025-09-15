"use client";

import { useState, useEffect } from "react";

const PWATest = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [serviceWorkerStatus, setServiceWorkerStatus] =
    useState("Not registered");
  const [cacheStatus, setCacheStatus] = useState("Checking...");
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    // Check online status
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    updateOnlineStatus();

    // Check service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          setServiceWorkerStatus("Registered and ready");
        })
        .catch(() => {
          setServiceWorkerStatus("Registration failed");
        });
    }

    // Check caches
    if ("caches" in window) {
      caches.keys().then((cacheNames) => {
        setCacheStatus(
          `Found ${cacheNames.length} cache(s): ${cacheNames.join(", ")}`
        );
      });
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const testOffline = () => {
    // Simulate going offline
    Object.defineProperty(navigator, "onLine", { value: false });
    window.dispatchEvent(new Event("offline"));
  };

  const testOnline = () => {
    // Simulate going online
    Object.defineProperty(navigator, "onLine", { value: true });
    window.dispatchEvent(new Event("online"));
  };

  const clearCaches = async () => {
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      setCacheStatus("Caches cleared");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg max-w-sm">
      <h3 className="font-bold mb-2">PWA Debug Info</h3>
      <div className="text-sm space-y-1">
        <div>
          Online:{" "}
          <span className={isOnline ? "text-green-400" : "text-red-400"}>
            {isOnline ? "Yes" : "No"}
          </span>
        </div>
        <div>Service Worker: {serviceWorkerStatus}</div>
        <div>Cache: {cacheStatus}</div>
        <div>
          Install Prompt: {installPrompt ? "Available" : "Not available"}
        </div>
      </div>
      <div className="mt-3 space-x-2">
        <button
          onClick={testOffline}
          className="bg-red-600 px-2 py-1 rounded text-xs"
        >
          Test Offline
        </button>
        <button
          onClick={testOnline}
          className="bg-green-600 px-2 py-1 rounded text-xs"
        >
          Test Online
        </button>
        <button
          onClick={clearCaches}
          className="bg-yellow-600 px-2 py-1 rounded text-xs"
        >
          Clear Cache
        </button>
      </div>
    </div>
  );
};

export default PWATest;
