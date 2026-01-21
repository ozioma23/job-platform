"use client";

import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
          JobPlatform
        </div>

        <ul className="flex gap-6 text-gray-700 dark:text-gray-200">
          <li>
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/saved" className="hover:text-blue-600 dark:hover:text-blue-400">
              Saved Jobs
            </Link>
          </li>
          <li>
            <Link href="/applications" className="hover:text-blue-600 dark:hover:text-blue-400">
              Applications
            </Link>
          </li>
          <li>
            <Link href="/profile" className="hover:text-blue-600 dark:hover:text-blue-400">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
