"use client";

export default function SignupPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg border">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-md px-4 py-2"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-md px-4 py-2"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-md px-4 py-2"
          />

          <button className="w-full bg-black text-white py-2 rounded-md">
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
}
