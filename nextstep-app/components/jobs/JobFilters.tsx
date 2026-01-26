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
    <div className="sticky top-24 rounded-2xl border bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-800">
        Filters
      </h2>

      <div className="space-y-6">
        {/* Location */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            placeholder="e.g., San Francisco"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B5AF7]"
          />
        </div>

        {/* Job Type / Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Job Type
          </label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B5AF7]"
          >
            <option value="">All</option>
            <option>Engineering</option>
            <option>Design</option>
            <option>Marketing</option>
            <option>Product</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Experience Level
          </label>
          <select
            value={experience}
            onChange={(e) => onExperienceChange(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B5AF7]"
          >
            <option value="">All</option>
            <option>Entry</option>
            <option>Mid</option>
            <option>Senior</option>
          </select>
        </div>

        {/* Clear */}
        <button
          onClick={onClearFilters}
          className="w-full rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
