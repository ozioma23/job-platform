"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, logout, updateUser } = useUser();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setUsername(user.username);
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-[70vh] bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-6">
        
        {/* Page title */}
        <h1 className="mb-8 text-2xl font-semibold text-gray-800">
          Profile
        </h1>

        {/* Profile card */}
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          
          {/* Header */}
          <div className="flex items-center gap-6 border-b pb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#5B5AF7] text-3xl font-bold text-white">
              {user.username.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user.username}
              </h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Account info */}
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Username
              </p>

              {isEditing ? (
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-gray-800 focus:border-[#5B5AF7] focus:outline-none"
                />
              ) : (
                <p className="text-gray-800">{user.username}</p>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Email address
              </p>
              <p className="text-gray-800">{user.email}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Manage your account information
            </p>

            <div className="flex gap-3">
              {isEditing ? (
                <button
                  onClick={() => {
                    updateUser({ ...user, username });
                    setIsEditing(false);
                  }}
                  className="rounded-lg bg-[#5B5AF7] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded-lg border px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Edit Profile
                </button>
              )}

              <button
                onClick={logout}
                className="rounded-lg border border-red-500 px-5 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
