"use client";

import { useState, useEffect, useRef } from "react";
import { useUser, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

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
  const { isSignedIn, user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const pathname = usePathname();

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate href from label
  const getHref = (label) =>
    label === "Home" ? "/" : `/${label.replace(/\s+/g, "-").toLowerCase()}`;

  // Check active link
  const isActive = (href) => {
    if (href === "/" && pathname === "/") return true;
    return href !== "/" && pathname.startsWith(href);
  };

  return (
    <nav className="bg-sky-100 dark:bg-gray-900 sticky top-0 z-50 shadow-md font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={40}
              className="rounded-full group-hover:scale-105 transition-transform duration-300"
              priority
            />
            <span className="hidden sm:inline-block text-[#00285E] dark:text-sky-300 font-bold text-xl tracking-wide uppercase">
              MCityX
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
            {navItems.map((item) => {
              const href = getHref(item);
              return (
                <Link
                  key={item}
                  href={href}
                  className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                    isActive(href)
                      ? "bg-sky-600 text-white dark:bg-sky-400 dark:text-gray-900"
                      : "text-sky-800 dark:text-sky-200 hover:bg-sky-200 dark:hover:bg-gray-700"
                  }`}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {item}
                </Link>
              );
            })}
          </div>

          {/* Right side: user & theme toggle */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />

            {isSignedIn ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-haspopup="true"
                  aria-expanded={userDropdownOpen}
                  className="flex items-center gap-2 focus:outline-none rounded"
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
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg py-1 z-50"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      role="menuitem"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      role="menuitem"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <SignOutButton>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                        role="menuitem"
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

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-md hover:bg-sky-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {mobileMenuOpen ? (
                <MdClose className="w-6 h-6 text-sky-800 dark:text-sky-200" />
              ) : (
                <GiHamburgerMenu className="w-6 h-6 text-sky-800 dark:text-sky-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-sky-50 dark:bg-gray-800 px-4 py-3 border-t border-sky-300 dark:border-gray-700">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const href = getHref(item);
              return (
                <Link
                  key={item}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    isActive(href)
                      ? "bg-sky-600 text-white dark:bg-sky-400 dark:text-gray-900"
                      : "text-sky-800 dark:text-sky-200 hover:bg-sky-200 dark:hover:bg-gray-700"
                  }`}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {item}
                </Link>
              );
            })}
            {isSignedIn ? (
              <SignOutButton>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-left px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold"
                >
                  Logout
                </button>
              </SignOutButton>
            ) : (
              <SignInButton mode="modal">
                <Button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold"
                >
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </div>
      )}
    </nav>
  );
}
