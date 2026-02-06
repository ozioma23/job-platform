"use client";

import Link from "next/link";
import { useState } from "react";
import { useJobs } from "@/context/JobsContext";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { savedJobs } = useJobs();
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-xl bg-white px-4 sm:px-6 py-4 shadow-sm">

                   <div className="flex items-center justify-between">

            
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="NextStep logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <span className="text-lg sm:text-xl font-semibold text-purple-700">
                NextStep
              </span>
            </Link>

                      <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
              <li>
                <Link href="/" className="hover:text-purple-700">
                  Jobs
                </Link>
              </li>

              <li>
                <Link href="/saved" className="hover:text-purple-700">
                  Saved Jobs
                  {savedJobs.length > 0 && (
                    <span className="ml-1 text-xs font-semibold text-gray-500">
                      ({savedJobs.length})
                    </span>
                  )}
                </Link>
              </li>

              <li>
                <Link href="/applications" className="hover:text-purple-700">
                  Applications
                </Link>
              </li>
            </ul>

                      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-700 text-white font-semibold"
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </Link>

                  <button
                    onClick={logout}
                    className="text-gray-500 hover:text-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-purple-700"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="rounded-lg bg-purple-700 px-5 py-2 text-white hover:opacity-90"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-gray-700 text-2xl"
            >
              ☰
            </button>
          </div>

                    {open && (
            <div className="md:hidden mt-4 border-t pt-4 space-y-4 text-sm font-medium text-gray-700">

              <Link href="/" className="block hover:text-purple-700">
                Jobs
              </Link>

              <Link href="/saved" className="block hover:text-purple-700">
                Saved Jobs
                {savedJobs.length > 0 && (
                  <span className="ml-1 text-xs font-semibold text-gray-500">
                    ({savedJobs.length})
                  </span>
                )}
              </Link>

              <Link href="/applications" className="block hover:text-purple-700">
                Applications
              </Link>

              <div className="border-t pt-4 space-y-3">
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-700 text-white font-semibold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      Profile
                    </Link>

                    <button
                      onClick={logout}
                      className="block text-red-600 hover:text-red-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block hover:text-purple-700"
                    >
                      Login
                    </Link>

                    <Link
                      href="/signup"
                      className="block rounded-lg bg-purple-700 px-4 py-2 text-white text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    </nav>
  );
}
