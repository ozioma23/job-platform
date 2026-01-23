"use client";

import Link from "next/link";
import { useJobs } from "@/context/JobsContext";

export default function Navbar() {
  const { savedJobs } = useJobs();
  const isLoggedIn = false;

  return (
    <nav className="w-full bg-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between rounded-xl bg-white px-6 py-4 shadow-sm">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg ">
              <img
                src="/logo.png"
                alt="NextStep logo"
                className="h-10 w-5"
              />
            </div>
            <span className="text-lg font-semibold text-[#5B5AF7]">
              NextStep
            </span>
          </Link>

          {/* Navigation */}
          <ul className="flex items-center gap-8 text-sm font-medium text-gray-700">
            <li>
              <Link href="/" className="hover:text-[#5B5AF7]">
                Jobs
              </Link>
            </li>

            <li>
              <Link href="/saved" className="hover:text-[#5B5AF7]">
                Saved Jobs
                {savedJobs.length > 0 && (
                  <span className="ml-1 text-xs font-semibold text-gray-500">
                    ({savedJobs.length})
                  </span>
                )}
              </Link>
            </li>

            <li>
              <Link href="/applications" className="hover:text-[#5B5AF7]">
                Applications
              </Link>
            </li>
          </ul>

          {/* Auth */}
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="/login"
              className="text-gray-700 hover:text-[#5B5AF7]"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-[#5B5AF7] px-5 py-2 text-white hover:opacity-90"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
