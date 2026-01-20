import JobList from "@/components/jobs/JobList";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      {/* Header */}
      <section className="max-w-5xl mx-auto mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Find Your Next Job
        </h1>
        <p className="text-gray-600 mt-1">
          Browse opportunities tailored for you
        </p>
      </section>

      {/* Job Listings */}
      <section className="max-w-5xl mx-auto">
        <JobList />
      </section>
    </main>
  );
}
