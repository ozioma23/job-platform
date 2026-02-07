"use client";

import { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

interface JobFiltersProps {
  category: string;
  location: string;
  experience: string;
  onCategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onExperienceChange: (value: string) => void;
  onClearFilters: () => void;
}

export default function JobFilters({
  category,
  location,
  experience,
  onCategoryChange,
  onLocationChange,
  onExperienceChange,
  onClearFilters,
}: JobFiltersProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="mb-6">
          <div className="md:hidden flex justify-end mb-2">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-between bg-purple-400 text-white px-4 py-2 rounded-md w-full"
        >
          <span>Filter Jobs</span>
          <AiOutlineDown size={20} />
        </button>
      </div>

            <div className="hidden md:block bg-purple-200 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Filter Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full bg-white border rounded-md px-3 py-2"
            >
              <option value="">All Categories</option>
              <option>Engineering</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Product</option>
            </select>
          </div>

                  <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <select
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full bg-white border rounded-md px-3 py-2"
            >
              <option value="">All Locations</option>
              <option>Lagos</option>
              <option>Abuja</option>
              <option>Remote</option>
            </select>
          </div>

                    <div>
            <label className="block text-sm font-medium mb-1">Experience Level</label>
            <select
              value={experience}
              onChange={(e) => onExperienceChange(e.target.value)}
              className="w-full bg-white border rounded-md px-3 py-2"
            >
              <option value="">All Levels</option>
              <option>Entry</option>
              <option>Mid</option>
              <option>Senior</option>
            </select>
          </div>
        </div>

               <div className="mt-4 flex justify-end">
          <button
            onClick={onClearFilters}
            className="bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Clear Filters
          </button>
        </div>
      </div>

            {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-purple-200 rounded-lg p-6 w-11/12 max-w-md shadow-lg relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 font-bold"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">Filter Jobs</h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="w-full bg-white border rounded-md px-3 py-2"
                >
                  <option value="">All Categories</option>
                  <option>Engineering</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Product</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <select
                  value={location}
                  onChange={(e) => onLocationChange(e.target.value)}
                  className="w-full bg-white border rounded-md px-3 py-2"
                >
                  <option value="">All Locations</option>
                  <option>Lagos</option>
                  <option>Abuja</option>
                  <option>Remote</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Experience Level</label>
                <select
                  value={experience}
                  onChange={(e) => onExperienceChange(e.target.value)}
                  className="w-full bg-white border rounded-md px-3 py-2"
                >
                  <option value="">All Levels</option>
                  <option>Entry</option>
                  <option>Mid</option>
                  <option>Senior</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={onClearFilters}
                className="bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
              >
                Clear
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
