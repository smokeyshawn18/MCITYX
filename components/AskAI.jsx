"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles, X, ExternalLink } from "lucide-react";

const AskAI = ({ className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showFloatingText, setShowFloatingText] = useState(false);
  const [isTextDismissed, setIsTextDismissed] = useState(false);

  // Show floating text after 3 seconds, only if not dismissed
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isTextDismissed) {
        setShowFloatingText(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isTextDismissed]);

  // Auto-hide floating text after 8 seconds
  useEffect(() => {
    if (showFloatingText && !isTextDismissed) {
      const timer = setTimeout(() => {
        setShowFloatingText(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [showFloatingText, isTextDismissed]);

  const handleClick = () => {
    // Open in new tab
    window.open("https://mcityxai.vercel.app", "_blank", "noopener,noreferrer");
  };

  const dismissFloatingText = (e) => {
    e.stopPropagation();
    setIsTextDismissed(true);
    setShowFloatingText(false);
  };

  return (
    <div className={`fixed bottom-6 left-6 z-50 select-none ${className}`}>
      {/* Floating Text */}
      <AnimatePresence>
        {showFloatingText && !isTextDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="absolute bottom-full left-0 mb-4 max-w-xs"
          >
            <div className="relative bg-gradient-to-r from-[#031F4C] to-[#1a3d5c] text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm">
              {/* Close button */}
              <button
                onClick={dismissFloatingText}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors duration-200 group"
                aria-label="Dismiss message"
              >
                <X className="w-3 h-3 group-hover:rotate-90 transition-transform duration-200" />
              </button>

              {/* Content */}
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex-shrink-0 mt-0.5"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </motion.div>

                <div>
                  <p className="font-semibold text-sm">Need AI assistance?</p>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    Get instant help with your questions using our smart AI
                    assistant!
                  </p>
                </div>
              </div>

              {/* Arrow pointing to button */}
              <div className="absolute top-full left-8 border-t-8 border-t-[#031F4C] border-x-4 border-x-transparent" />

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#6CABDD]/20 to-[#031F4C]/20 blur-sm -z-10"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main AI Button */}
      <motion.button
        onClick={handleClick}
        className="group relative bg-gradient-to-r from-[#3789cc] to-[#1c465e] hover:from-[#4A90B8] hover:to-[#031F4C] text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/20 hover:border-white/40 cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        aria-label="Ask AI Assistant"
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6CABDD] to-[#031F4C] opacity-0 group-hover:opacity-20 blur-xl"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.2, 0.4, 0.2] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        {/* Main icon with rotation animation */}
        <motion.div
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="relative z-10 flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{
              scale: isHovered ? [1, 1.3, 1] : 1,
            }}
            transition={{
              duration: 0.5,
              repeat: isHovered ? Infinity : 0,
            }}
          >
            <ExternalLink className="w-3 h-3 text-cyan-200" />
          </motion.div>
        </motion.div>

        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/30"
          animate={{
            scale: isHovered ? [1, 1.4, 1] : 1,
            opacity: isHovered ? [0.6, 0, 0.6] : 0,
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: "easeOut",
          }}
        />

        {/* Floating sparkle */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [-15, -25, -35],
                y: [-10, -20, -30],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.3,
              }}
              className="absolute top-2 left-2 text-yellow-300 pointer-events-none"
            >
              <Sparkles className="w-3 h-3" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Breathing indicator */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6CABDD] to-[#031F4C] opacity-20 -z-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AskAI;
