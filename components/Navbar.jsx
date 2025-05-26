"use client";

import { useState, useEffect, useRef } from "react";
import { useUser, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose, MdLogout, MdPerson, MdSettings } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { Volleyball } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Schedule", href: "/schedule" },
  { label: "Results", href: "/results" },
  { label: "Trophy Cabinet", href: "/trophy-cabinet" },
  { label: "Player Card", href: "/player-card" },
  { label: "History", href: "/history" },
    { label: "Your Lineup", href: "/lineup/create", icon: Volleyball },
];

const mobileSpecialItems = [
    { label: "Your Lineup", href: "/lineup/create", icon: Volleyball },
  { label: "Your Profile", href: "/profile", icon: MdPerson },
  { label: "Settings", href: "/settings", icon: MdSettings },
];

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const menuRef = useRef(null);
  const pathname = usePathname();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const isActive = (href) => pathname === href;

  return (
    <nav className="bg-sky-100 w-full dark:bg-gray-900 sticky top-0 z-50 shadow-md font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
        <Link href="/" className="flex items-center gap-2 group pr-3 border-r-2 border-gray-300 dark:border-gray-600">
  <Image
    src="/logo.png"
    alt="MCityX Logo"
    width={50}
    height={40}
    className="rounded-full group-hover:scale-105 transition-transform duration-300"
    priority
  />
  <span className="hidden sm:inline-block text-[#00285E] dark:text-sky-300 font-bold text-xl tracking-wide uppercase">
    MCityX
  </span>
</Link>


          {/* Desktop navigation */}
<div className="hidden md:flex items-center space-x-4 flex-1 justify-center">
  {navItems.map(({ label, href, icon: Icon }) => (
    <Link
      key={label}
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
        isActive(href)
          ? "bg-sky-600 text-white dark:bg-sky-400 dark:text-gray-900"
          : "text-sky-800 dark:text-sky-200 hover:bg-sky-200 dark:hover:bg-gray-700"
      }`}
      aria-current={isActive(href) ? "page" : undefined}
    >
      {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
      {label}
    </Link>
  ))}
</div>


          {/* Theme toggle + User section + Mobile menu button */}
          <div className="flex items-center space-x-3">
            <ThemeToggle className="ml-4" />
            {isSignedIn ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2"
                >
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-8 h-8 rounded-full",
                      },
                    }}
                  />
                  <span className="hidden sm:inline text-sky-800 dark:text-sky-200 font-medium truncate max-w-[140px]">
                    {user?.firstName || user?.email || "User"}
                  </span>
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg py-1 z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <SignOutButton>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        Logout
                      </button>
                    </SignOutButton>
                  </div>
                )}
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold">
                  Sign In
                </Button>
              </SignInButton>
            )}

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className={`md:hidden p-3 rounded-lg border transition-colors duration-300 ${
                mobileMenuOpen
                  ? "bg-sky-600 border-sky-700 text-white"
                  : "bg-white border-gray-300 text-gray-800 hover:bg-sky-100 hover:border-sky-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:border-sky-500"
              }`}
            >
              {mobileMenuOpen ? (
                <MdClose className="w-7 h-7" />
              ) : (
                <GiHamburgerMenu className="w-7 h-7" />
              )}
            </Button>
          </div>
        </div>
      </div>

    {/* Mobile Menu */}
{mobileMenuOpen && (
  <>
    <div
      className="fixed inset-0 bg-opacity-30 z-40"
      onClick={() => setMobileMenuOpen(false)}
    />
    <div
      ref={menuRef}
      className="fixed top-16 left-0 right-0 bottom-0 z-50 bg-sky-50 dark:bg-gray-800 overflow-y-auto shadow-inner"
      style={{ maxHeight: "calc(100vh - 64px)" }}
    >
      <nav className="flex flex-col gap-2 p-4">
        {navItems
          .filter(({ label }) => label !== "Your Lineup") // <-- filter out here
          .map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                isActive(href)
                  ? "bg-sky-600 text-white dark:bg-sky-400 dark:text-gray-900"
                  : "text-sky-800 dark:text-sky-200 hover:bg-sky-200 dark:hover:bg-gray-700"
              }`}
              aria-current={isActive(href) ? "page" : undefined}
            >
              {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
              {label}
            </Link>
          ))}

        <hr className="border-gray-300 dark:border-gray-600 my-3" />

        {mobileSpecialItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-5 py-3 rounded-md font-medium transition-colors duration-200 ${
              isActive(href)
                ? "bg-sky-600 text-white dark:bg-sky-400 dark:text-gray-900"
                : "text-sky-800 dark:text-sky-200 hover:bg-sky-200 dark:hover:bg-gray-700"
            }`}
            aria-current={isActive(href) ? "page" : undefined}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}

        {isSignedIn && (
          <SignOutButton>
            <button
              className="flex items-center gap-3 px-5 py-3 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded-md font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MdLogout className="w-5 h-5" />
              Logout
            </button>
          </SignOutButton>
        )}
      </nav>
    </div>
  </>
)}

    </nav>
  );
}
