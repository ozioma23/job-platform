"use client";

import { useParams, useRouter } from "next/navigation";
import { useJobs } from "@/context/JobsContext";
import { useUser } from "@/context/UserContext";
import { useState } from "react";

export default function ApplyJobPage() {
  const { id } = useParams();
  const router = useRouter();

  const { jobs, applyToJob, applications } = useJobs();
  const { user } = useUser();

  const job = jobs.find((j) => j.id === id);

  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");

  if (!job) return <p>Job not found</p>;
  if (!user) return <p>Please log in to apply</p>;

  const alreadyApplied = applications.some(
    (app) => app.job.id === job.id && app.user.id === user.id
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    applyToJob(job, user);
    setSubmitted(true);

    setTimeout(() => {
      router.push(`/jobs/${job.id}`);
    }, 2000);

  };

  if (alreadyApplied || submitted) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-semibold text-green-600">
          ✅ Application Submitted
        </h2>
        <p className="mt-2 text-gray-600">
          You have already applied for this job.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">
        Apply for {job.title}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          required
          placeholder="Full Name"
          defaultValue={user.username}
          className="w-full border rounded p-3"
        />

        <input
          type="email"
          required
          placeholder="Email"
          defaultValue={user.email}
          className="w-full border rounded p-3"
        />

        <textarea
          required
          placeholder="Why should we hire you?"
          className="w-full border rounded p-3 h-32"
        />

        <input
          id="cvUpload"
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFileName(e.target.files[0].name);
            }
          }}
        />
        <label
          htmlFor="cvUpload"
          className="cursor-pointer w-full bg-white  text-purple-600 mb-4 px-4 py-2 rounded text-center hover:text-purple-500"
        >
          {fileName ? `CV: ${fileName}` : "Upload Your CV"}
        </label>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
