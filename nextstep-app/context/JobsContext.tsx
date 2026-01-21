"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Job } from "@/types/job";
import { getJobs } from "@/lib/api";

interface JobsContextType {
  jobs: Job[];
  filteredJobs: Job[];
  category: string;
  location: string;
  experience: string;
  setCategory: (value: string) => void;
  setLocation: (value: string) => void;
  setExperience: (value: string) => void;
  clearFilters: () => void;
  savedJobs: Job[];                
  saveJob: (job: Job) => void;      
  unsaveJob: (jobId: string) => void; 
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");


  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  // Fetch jobs on mount
  useEffect(() => {
    async function fetchJobs() {
      const data = await getJobs();
      setJobs(data);
      setFilteredJobs(data);
    }
    fetchJobs();
  }, []);

  // Update filtered jobs when filters change
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

  // Clear filters
  const clearFilters = () => {
    setCategory("");
    setLocation("");
    setExperience("");
  };

   const saveJob = (job: Job) => {
    setSavedJobs((prev) => {
      if (!prev.find((j) => j.id === job.id)) {
        return [...prev, job]; // add if not already saved
      }
      return prev; 
    });
  };

   const unsaveJob = (jobId: string) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        filteredJobs,
        category,
        location,
        experience,
        setCategory,
        setLocation,
        setExperience,
        clearFilters,
        savedJobs,  
        saveJob,    
        unsaveJob,   
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

// Custom hook for easier usage
export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobsProvider");
  }
  return context;
};
