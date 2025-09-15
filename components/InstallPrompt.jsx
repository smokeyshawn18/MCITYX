"use client";

import { useState, useEffect } from "react";
import { FaDownload, FaTimes } from "react-icons/fa";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check online status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Initial check
    updateOnlineStatus();

    // Check if app is already installed
    const checkIfInstalled = () => {
      // Check if running in standalone mode (PWA)
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      // Check if running as PWA on iOS
      const isIOSPWA = window.navigator.standalone === true;
      // Check if installed via beforeinstallprompt dismissal
      const dismissedTime = localStorage.getItem("pwa-install-dismissed");
      const recentlyDismissed =
        dismissedTime &&
        Date.now() - parseInt(dismissedTime) < 24 * 60 * 60 * 1000; // 24 hours
      // Check if previously installed
      const wasInstalled = localStorage.getItem("pwa-installed") === "true";

      if (isStandalone || isIOSPWA || recentlyDismissed || wasInstalled) {
        setIsInstalled(true);
        return true;
      }
      return false;
    };

    if (checkIfInstalled()) {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
      return;
    }
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      console.log("InstallPrompt: beforeinstallprompt event fired");
      e.preventDefault();
      setDeferredPrompt(e);

      // Show prompt after 3 seconds on all devices
      setTimeout(() => {
        if (!isInstalled) {
          setShowPrompt(true);
        }
      }, 3000);
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      console.log("PWA was installed successfully");
      setDeferredPrompt(null);
      setShowPrompt(false);
      setIsInstalled(true);
      localStorage.setItem("pwa-installed", "true");
    };

    // Listen for display mode changes (when app becomes standalone)
    const handleDisplayModeChange = (e) => {
      if (e.matches) {
        console.log("App is now running in standalone mode");
        setIsInstalled(true);
        setShowPrompt(false);
      }
    };

    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    mediaQuery.addEventListener("change", handleDisplayModeChange);

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Fallback: Show prompt after 15 seconds if no beforeinstallprompt event
    const fallbackTimer = setTimeout(() => {
      if (!deferredPrompt && !isInstalled) {
        setShowPrompt(true);
      }
    }, 15000);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      mediaQuery.removeEventListener("change", handleDisplayModeChange);
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
      clearTimeout(fallbackTimer);
    };
  }, [isInstalled]);

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
    // Store dismissal time to prevent showing again for 24 hours
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());
  };

  // Don't show if already installed
  if (isInstalled || !showPrompt) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={handleDismiss}
        />

        {/* Modal Content */}
        <div className="relative w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <FaDownload className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Install MCityX</h3>
                  <p className="text-sky-100 text-sm">
                    Manchester City Fan Hub
                  </p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sky-600 dark:text-sky-400 text-sm font-bold">
                    ✓
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Offline Access
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Access cached content, match results, and player profiles
                    offline
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sky-600 dark:text-sky-400 text-sm font-bold">
                    ⚡
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Fast Performance
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Instant loading and smooth experience
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sky-600 dark:text-sky-400 text-sm font-bold">
                    📱
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Native Experience
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Works like a native mobile app
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleDismiss}
                className="flex-1 px-4 py-3 text-gray-600 dark:text-gray-300 font-medium rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Not Now
              </button>
              <button
                onClick={handleInstallClick}
                className="flex-1 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Install Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Offline Indicator */}
      {!isOnline && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          You're offline - some features may be limited
        </div>
      )}
    </>
  );
};

export default InstallPrompt;
