"use client";

import { useState, useEffect } from "react";
import { FaDownload, FaTimes } from "react-icons/fa";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Show prompt after 2 seconds on all devices
      setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowPrompt(false);
      console.log("PWA was installed");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Fallback: Show prompt after 10 seconds even if beforeinstallprompt doesn't fire
    // This helps with testing and ensures users see the prompt
    const fallbackTimer = setTimeout(() => {
      if (!deferredPrompt) {
        setShowPrompt(true);
      }
    }, 10000);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Use the standard PWA install prompt
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }

      setDeferredPrompt(null);
      setShowPrompt(false);
    } else {
      // Fallback: Show instructions for manual installation
      alert(
        "To install MCityX:\n\n• Chrome: Click the menu (⋮) > Install MCityX\n• Firefox: Click the menu (☰) > Install This Site\n• Safari: Share button > Add to Home Screen\n• Edge: Click the app icon in address bar"
      );
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  // Only show when prompt is available
  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:bottom-6 md:left-6 md:right-auto md:w-96">
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white p-4 rounded-lg shadow-lg border border-sky-400">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaDownload className="text-xl" />
            <div>
              <h3 className="font-semibold text-sm">Install MCityX</h3>
              <p className="text-xs opacity-90">
                Get the full experience offline
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleInstallClick}
              className="bg-white text-sky-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="text-white opacity-70 hover:opacity-100 p-2"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
