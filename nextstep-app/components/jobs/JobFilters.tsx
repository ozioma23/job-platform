"use client";

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
  return (
    <div className="bg-purple-200 p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter Jobs</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category */}
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

        {/* Location */}
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

        {/* Experience */}
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

      {/* Clear Filters Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={onClearFilters}
          className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
