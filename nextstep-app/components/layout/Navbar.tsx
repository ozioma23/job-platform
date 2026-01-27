"use client";

import Link from "next/link";
import { useJobs } from "@/context/JobsContext";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { savedJobs } = useJobs();
  const { user, logout } = useUser();

  return (
    <nav className="w-full bg-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between rounded-xl bg-white px-6 py-4 shadow-sm">
          
          {/* Logo */}
<Link href="/" className="flex items-center ">
  <img
    src="/logo.png"
    alt="NextStep logo"
    className="h-12 w-auto object-contain"
  />
  <span className="text-xl font-semibold text-purple-700">
    NextStep
  </span>
</Link>


          {/* Navigation */}
          <ul className="flex items-center gap-8 text-sm font-medium text-gray-700">
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

          {/* Auth Section */}
          <div className="flex items-center gap-6 text-sm font-medium">
            {user ? (
              <>
                {/* Profile Icon */}
                <Link
                  href="/profile"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-700 text-white font-semibold"
                >
                  {user.username.charAt(0).toUpperCase()}
                </Link>

                {/* Logout */}
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
        </div>
      </div>
    </nav>
  );
}
