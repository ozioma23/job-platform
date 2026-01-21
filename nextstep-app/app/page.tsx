"use client";

import { useEffect, useState } from "react";
import { getJobs } from "@/lib/api";
import { Job } from "@/types/job";
import JobList from "@/components/jobs/JobList";
import JobFilters from "@/components/jobs/JobFilters";

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

  // Fetch jobs on mount
  useEffect(() => {
    async function fetchJobs() {
      const data = await getJobs();
      setJobs(data);
      setFilteredJobs(data);
    }
    fetchJobs();
  }, []);

  // Filter jobs whenever filters change
  useEffect(() => {
    let result = jobs;

    if (category) {
      result = result.filter((job) => job.category === category);
    }

    if (location) {
      result = result.filter((job) => job.location.includes(location));
    }

    if (experience) {
      result = result.filter((job) => job.experienceLevel === experience);
    }

    setFilteredJobs(result);
  }, [category, location, experience, jobs]);

  // Handler to clear filters
  const clearFilters = () => {
    setCategory("");
    setLocation("");
    setExperience("");
  };

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
