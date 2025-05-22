"use client";
import { useState } from "react";
import { Mail, User, Bell } from "lucide-react";
import logo from "@/assets/images/logo.jpg";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  "Home",
  "News",
  "Schedule",
  "Results",
  "Trophy Cabinet",
  "Player Card",
  "History",
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#1ea0d4] sticky top-0 z-50 shadow-md font-inter">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-6 sm:px-6 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src={logo}
            alt="Logo"
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
          />
          <span className="text-white font-extrabold text-lg sm:text-xl tracking-wide uppercase select-none">
            MCityX
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((label) => {
            const href =
              label === "Home" ? "/" : `/${label.replace(/\s+/g, "-").toLowerCase()}`;
            const isActive = pathname === href;

            return (
              <Link
                key={label}
                href={href}
                className={`relative font-semibold text-white hover:text-sky-300 transition-colors px-2 py-1 ${
                  isActive
                    ? "after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-white"
                    : ""
                }`}
                onClick={handleNavLinkClick}
              >
                {label}
              </Link>
            );
          })}

          <Bell className="w-6 h-6 text-white cursor-pointer hover:text-sky-300 transition-colors" />
          <Mail className="w-6 h-6 text-white cursor-pointer hover:text-sky-300 transition-colors" />
          <User className="w-7 h-7 text-white cursor-pointer hover:text-sky-300 transition-colors" />
          <ThemeToggle className="ml-4" />
        </div>

        {/* Mobile Hamburger */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="lg:hidden flex flex-col justify-center items-center space-y-1 w-7 h-7 focus:outline-none"
        >
          <span
            className={`block h-1 w-7 bg-white rounded transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-1 w-7 bg-white rounded transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-1 w-7 bg-white rounded transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-64 h-full bg-[#6caddf] dark:bg-gray-900 text-white p-6 flex flex-col space-y-6 relative shadow-2xl rounded-r-2xl">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none hover:text-sky-300 transition"
            aria-label="Close menu"
          >
            &times;
          </button>

          {/* Navigation Links */}
          {navItems.map((label) => {
            const href =
              label === "Home" ? "/" : `/${label.replace(/\s+/g, "-").toLowerCase()}`;
            const isActive = pathname === href;

            return (
              <Link
                key={label}
                href={href}
                className={`block font-semibold text-lg py-2 px-3 rounded-md transition-all duration-200 ${
                  isActive
                    ? "underline underline-offset-4 bg-sky-900 dark:bg-sky-800"
                    : "hover:bg-sky-800 dark:hover:bg-sky-700 hover:underline hover:underline-offset-4"
                }`}
                onClick={handleNavLinkClick}
              >
                {label}
              </Link>
            );
          })}

          {/* Bottom Icons */}
          <div className="flex space-x-6 mt-auto pt-4 border-t border-white/20">
            <Bell className="w-6 h-6 cursor-pointer hover:text-sky-300 transition-colors" />
            <Mail className="w-6 h-6 cursor-pointer hover:text-sky-300 transition-colors" />
            <User className="w-7 h-7 cursor-pointer hover:text-sky-300 transition-colors" />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
