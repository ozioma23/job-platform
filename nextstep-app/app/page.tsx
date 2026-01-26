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
    <main className="max-w-7xl mx-auto px-6 py-10">
      
      {/* HERO */}
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Find Your Next <br /> Opportunity
        </h1>
        <p className="mt-4 max-w-xl text-gray-500">
          Discover roles that match your skills and ambitions.
        </p>
      </section>

      {/* CONTENT GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* JOB LISTINGS */}
        <div className="lg:col-span-8">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Recent Job Listings
          </h2>

          <JobList jobs={filteredJobs} />
        </div>

        {/* FILTER SIDEBAR */}
        <aside className="lg:col-span-4">
          <JobFilters
            category={category}
            location={location}
            experience={experience}
            onCategoryChange={setCategory}
            onLocationChange={setLocation}
            onExperienceChange={setExperience}
            onClearFilters={clearFilters}
          />
        </aside>
      </section>
    </main>
  );
}
