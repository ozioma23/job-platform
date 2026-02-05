"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} NextStep. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
         
        </div>
      </div>
    </footer>
  );
}
