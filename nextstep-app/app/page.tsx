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
