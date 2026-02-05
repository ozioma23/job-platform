"use client";

import JobList from "@/components/jobs/JobList";
import JobFilters from "@/components/jobs/JobFilters";
import { useJobs } from "@/context/JobsContext";

export default function HomePage() {
  const {
    category,
    location,
    experience,
    setCategory,
    setLocation,
    setExperience,
    clearFilters,
    filteredJobs,
  } = useJobs();

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-12 mt-6 text-center">
  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
    Find Your Next Opportunity
  </h1>

  <p className="mt-4 text-lg text-gray-600">
    Discover jobs that match your skills, goals, and location.
  </p>
</div>

      <JobFilters
        category={category}
        location={location}
        experience={experience}
        onCategoryChange={setCategory}
        onLocationChange={setLocation}
        onExperienceChange={setExperience}
        onClearFilters={clearFilters}
      />

      <JobList jobs={filteredJobs} />
    </main>
  );
}
