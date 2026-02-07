"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Job } from "@/types/job";
import { getJobs } from "@/lib/api";
import { Application } from "@/types/application";
import { User } from "@/types/user";
import { useUser } from "@/context/UserContext";

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

  appliedJobs: Job[];
  applyJob: (job: Job) => void;

  applications: Application[];
  applyToJob: (job: Job, user: User) => void;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  // Fetch jobs
  useEffect(() => {
    async function fetchJobs() {
      const data = await getJobs();
      setJobs(data);
      setFilteredJobs(data);
    }
    fetchJobs();
  }, []);

  // Filters
  useEffect(() => {
    let result = jobs;

    if (category) result = result.filter((job) => job.category === category);
    if (location) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (experience) {
      result = result.filter(
        (job) => job.experienceLevel === experience
      );
    }

    setFilteredJobs(result);
  }, [category, location, experience, jobs]);

  const clearFilters = () => {
    setCategory("");
    setLocation("");
    setExperience("");
  };


  useEffect(() => {
    if (!user) {
      setSavedJobs([]);
      setAppliedJobs([]);
      return;
    }

    const saved = localStorage.getItem(`savedJobs_${user.id}`);
    const applied = localStorage.getItem(`appliedJobs_${user.id}`);

    setSavedJobs(saved ? JSON.parse(saved) : []);
    setAppliedJobs(applied ? JSON.parse(applied) : []);
  }, [user]);


  const saveJob = (job: Job) => {
    if (!user) return;

    setSavedJobs((prev) => {
      if (prev.some((j) => j.id === job.id)) return prev;
      const updated = [...prev, job];
      localStorage.setItem(`savedJobs_${user.id}`, JSON.stringify(updated));
      return updated;
    });
  };


  const unsaveJob = (jobId: string) => {
    if (!user) return;

    setSavedJobs((prev) => {
      const updated = prev.filter((job) => job.id !== jobId);
      localStorage.setItem(`savedJobs_${user.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  // Apply job
const applyJob = (job: Job) => {
  if (!user) return;

  setAppliedJobs((prev) => {
    if (prev.some((j) => j.id === job.id)) return prev; // already applied
    const updated = [...prev, job];
    localStorage.setItem(`appliedJobs_${user.id}`, JSON.stringify(updated));
    return updated;
  });
};

// Apply to applications list
const applyToJob = (job: Job, user: User) => {
  setApplications((prev) => {
    const exists = prev.some(
      (app) => app.job.id === job.id && app.user.id === user.id
    );

    if (exists) return prev;

    return [
      ...prev,
      {
        id: `${job.id}-${user.id}`,
        job,
        user,
        appliedAt: new Date().toISOString(),
        status: "Pending",
      },
    ];
  });
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
        appliedJobs,
        applyJob,
        applications,
        applyToJob,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobsProvider");
  }
  return context;
};
