"use client";

import Link from "next/link";
import { useJobs } from "@/context/JobsContext";

export default function Navbar() {
  const { savedJobs } = useJobs();

  // Temporary auth flag (we'll replace later with real auth)
  const isLoggedIn = false;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-gray-800 dark:text-gray-100"
        >
          JobPlatform
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-6 text-gray-700 dark:text-gray-200">
          <li>
            <Link
              href="/"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/saved"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Saved Jobs
              {savedJobs.length > 0 && (
                <span className="ml-1 text-sm font-semibold">
                  ({savedJobs.length})
                </span>
              )}
            </Link>
          </li>

          <li>
            <Link
              href="/applications"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Applications
            </Link>
          </li>

          {/* Auth section */}
          {isLoggedIn ? (
            <li>
              <Link
                href="/profile"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Profile
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
