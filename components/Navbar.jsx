"use client";
import { useState } from "react";
import { Mail, User, Bell } from "lucide-react";

import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {GiHamburgerMenu} from "react-icons/gi"

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
<nav
  className="bg-white dark:bg-[#1ea0d4] sticky top-0 z-50 shadow-xl border-b border-sky-200 dark:border-sky-900 transition-colors duration-300 font-inter"
  aria-label="Main Navigation"
>
  <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 sm:px-6 md:px-10">
   <Link href="/" className="flex items-center gap-3 group px-2 py-1">
  <Image
    src="/logo.png"
    alt="Logo"
    width={48}   // increased size for better visibility
    height={48}
    className="rounded-full shadow-lg group-hover:scale-110 transition-transform"
  />
  <span className="text-sky-900 dark:text-white font-extrabold text-xl tracking-wide uppercase select-none group-hover:text-sky-500 transition-colors">
    MCityX
  </span>
</Link>


    {/* Mobile controls: Dark Mode Toggle + Hamburger */}
    <div className="lg:hidden flex items-center space-x-4">
      <ThemeToggle />
      <Button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        className="flex justify-center items-center w-9 h-9 focus:outline-none"
      >
        <GiHamburgerMenu className="w-6 h-6 text-sky-200 dark:text-black" />
      </Button>
    </div>

    {/* Desktop Navigation */}
    <ul className="hidden lg:flex items-center gap-6">
      {navItems.map((label) => {
        const href = label === "Home" ? "/" : `/${label.replace(/\s+/g, "-").toLowerCase()}`;
        const isActive = pathname === href;
        return (
          <li key={label}>
            <Link
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`relative font-semibold px-3 py-2 rounded-md transition-all duration-200 outline-none focus:ring-2 ring-sky-400
                ${isActive
                  ? "text-sky-700 dark:text-sky-200 bg-sky-100 dark:bg-sky-900 after:absolute after:left-0 after:bottom-0 after:w-full "
                  : "text-gray-700 dark:text-white hover:bg-sky-200 dark:hover:bg-sky-800 hover:text-sky-700"
                }`}
              onClick={handleNavLinkClick}
            >
              {label}
            </Link>
          </li>
        );
      })}
      {/* Icons */}
      <li>
        <Bell className="w-6 h-6 text-sky-700 dark:text-white cursor-pointer hover:text-sky-400 transition-colors" />
      </li>
      <li>
        <Mail className="w-6 h-6 text-sky-700 dark:text-white cursor-pointer hover:text-sky-400 transition-colors" />
      </li>
      {/* User Dropdown */}
      <li className="relative group">
        <User className="w-7 h-7 text-sky-700 dark:text-white cursor-pointer hover:text-sky-400 transition-colors" />
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
          <Link href="/profile" className="block px-4 py-2 hover:bg-sky-100 dark:hover:bg-sky-800">Profile</Link>
          <Link href="/settings" className="block px-4 py-2 hover:bg-sky-100 dark:hover:bg-sky-800">Settings</Link>
          <button className="w-full text-left px-4 py-2 hover:bg-sky-100 dark:hover:bg-sky-800">Logout</button>
        </div>
      </li>
      {/* Desktop Theme Toggle - hidden on mobile */}
      <li className="hidden lg:block">
        <ThemeToggle className="ml-2" />
      </li>
    </ul>
  </div>

  {/* Mobile Menu */}
  <div
    className={`lg:hidden fixed inset-0 bg-[#1ea0d4] dark:bg-gray-900 transition-transform duration-300 z-40 ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    }`}
    tabIndex={isOpen ? 0 : -1}
    aria-modal="true"
    role="dialog"
  >
    <div className="w-72 h-full bg-[#1ea0d4] dark:bg-gray-900 text-white p-6 flex flex-col space-y-6 relative shadow-2xl rounded-r-2xl">
      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none hover:text-sky-300 transition"
        aria-label="Close menu"
      >
        &times;
      </button>

      {/* Navigation Links */}
      <ul className="flex flex-col gap-4 mt-8">
        {navItems.map((label) => {
          const href = label === "Home" ? "/" : `/${label.replace(/\s+/g, "-").toLowerCase()}`;
          const isActive = pathname === href;
          return (
            <li key={label}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`block font-semibold text-lg py-2 px-3 rounded-md transition-all duration-200 outline-none focus:ring-2 ring-sky-400
                  ${isActive
                    ? "underline underline-offset-4 bg-sky-900 dark:bg-sky-800"
                    : "hover:bg-sky-800 dark:hover:bg-sky-700 hover:underline hover:underline-offset-4"
                  }`}
                onClick={handleNavLinkClick}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

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
