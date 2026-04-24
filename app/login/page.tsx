"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("student"); // 'student' or 'admin'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/rooms");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-8">
          CoC Unidorm System
        </h1>

        {/* Role Selection Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 py-2 rounded-md text-sm font-bold transition ${
              role === "student"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 rounded-md text-sm font-bold transition ${
              role === "admin"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Dynamic ID Number Label */}
          <div>
            <label className="text-sm font-bold text-slate-600">
              {role === "student" ? "Student ID Number" : "Admin ID Number"}
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 6810..."
              className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Gender selection - Hidden if Admin */}
          {role === "student" && (
            <div>
              <label className="text-sm font-bold text-slate-600">Gender</label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Boy"
                    className="w-4 h-4"
                  />
                  <span className="text-slate-700">Boy</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Girl"
                    className="w-4 h-4"
                  />
                  <span className="text-slate-700">Girl</span>
                </label>
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="text-sm font-bold text-slate-600">Password</label>
            <input
              type="password"
              required
              className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition"
          >
            Login as {role === "student" ? "Student" : "Admin"}
          </button>
        </form>

        {/* --- THE NEW REGISTER LINK --- */}
        {role === "student" && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/register")}
                className="text-blue-600 font-bold hover:underline"
              >
                click register
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
