"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="rounded-xl bg-white p-8 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#5B5AF7] text-white text-2xl font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {user.username}
            </h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-6 rounded-lg bg-red-500 px-5 py-2 text-white hover:opacity-90"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
