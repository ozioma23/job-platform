"use client";

import Link from "next/link";
import { useState } from "react";
import { useJobs } from "@/context/JobsContext";
import { useUser } from "@/context/UserContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { savedJobs } = useJobs();
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <nav className="w-full bg-white py-4 relative z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-xl bg-white px-4 sm:px-6 py-4 shadow-sm relative z-50">
          <div className="flex items-center justify-between">
            
            <Link href="/" className="flex items-center gap-1">
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
                <Link href="/" className="hover:text-purple-700">Jobs</Link>
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
                <Link href="/applications" className="hover:text-purple-700">Applications</Link>
              </li>
            </ul>

                        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-700 text-white font-semibold"
                  >
                    {user.username?.charAt(0).toUpperCase() || "U"}

                  </Link>

                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-700 hover:text-purple-700">Login</Link>
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
              className="md:hidden text-purple-700 z-50 relative"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

           {open && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center space-y-6 text-lg md:hidden">
          <Link href="/" onClick={() => setOpen(false)} className="hover:text-purple-700">
            Jobs
          </Link>

          <Link href="/saved" onClick={() => setOpen(false)} className="hover:text-purple-700">
            Saved Jobs
            {savedJobs.length > 0 && (
              <span className="ml-1 text-xs font-semibold text-gray-500">
                ({savedJobs.length})
              </span>
            )}
          </Link>

          <Link href="/applications" onClick={() => setOpen(false)} className="hover:text-purple-700">
            Applications
          </Link>

          <div className="border-t border-gray-200 pt-4 flex flex-col items-center space-y-3">
            {user ? (
              <>
                <Link href="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 hover:text-purple-700">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-700 text-white font-semibold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  Profile
                </Link>

                <button
                  onClick={() => {
                    setOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="block text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="hover:text-purple-700">
                  Login
                </Link>

                <Link href="/signup" onClick={() => setOpen(false)} className="text-purple-700 text-sm font-medium hover:underline">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}

            {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 sm:w-96 text-center shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-600 text-white rounded-md py-2 hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
