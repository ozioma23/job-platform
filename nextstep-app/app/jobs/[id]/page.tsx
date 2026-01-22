"use client";

import { useJobs } from "@/context/JobsContext";
import { useParams, useRouter } from "next/navigation";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function JobDetailsPage() {
  const { filteredJobs, savedJobs, saveJob, unsaveJob } = useJobs();
  const params = useParams();
  const jobId = params.id as string;
  const router = useRouter();

  const job = filteredJobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-500">Job not found.</p>
        <Link href="/" className="text-blue-600 mt-4 inline-block">
          Back to Home
        </Link>
      </main>
    );
  }

  const isSaved = savedJobs.some((j) => j.id === job.id);

  const handleSaveClick = () => {
    if (isSaved) {
      unsaveJob(job.id);
    } else {
      saveJob(job);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-gray-600 mt-1">
            {job.company} • {job.location}
          </p>
        </div>

        <div className="space-y-4">
          <section>
            <h2 className="text-xl font-semibold mb-2">Job Description</h2>
            <p className="text-gray-700">{job.description || "No description provided."}</p>
          </section>

          {job.responsibilities && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
              <ul className="list-disc pl-5 text-gray-700">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {job.requirements && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Requirements</h2>
              <ul className="list-disc pl-5 text-gray-700">
                {job.requirements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="flex gap-4">
          <Button onClick={handleSaveClick}>
            {isSaved ? "Unsave Job" : "Save Job"}
          </Button>
          <Button onClick={() => alert("Apply feature coming soon!")}>
            Apply Now
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="bg-white border rounded-lg p-6 space-y-4 h-fit">
        <h3 className="text-lg font-semibold">Job Summary</h3>
        <div className="text-sm space-y-2">
          <p><span className="font-medium">Company:</span> {job.company}</p>
          <p><span className="font-medium">Job Type:</span> {job.type}</p>
          <p><span className="font-medium">Salary:</span> {job.salary}</p>
          <p><span className="font-medium">Posted:</span> {job.postedAt}</p>
          {job.isRemote && <Badge>Remote</Badge>}
        </div>
      </aside>
    </main>
  );
}
