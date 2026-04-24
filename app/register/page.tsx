"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  // Form Data State
  const [formData, setFormData] = useState({
    gender: "",
    name: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: "",
  });

  // Error Messages State
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 1. Gender Validation
    if (!formData.gender) newErrors.gender = "Please select the gender";

    // 2. Name Validation
    if (!formData.name.trim()) newErrors.name = "Please enter the name";

    // 3. Email Validation (Required + Format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Please enter email address";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email format";
    }

    // 4. Student ID Validation
    if (!formData.studentId)
      newErrors.studentId = "Please enter the student id number";

    // 5. Password Validation
    if (!formData.password) newErrors.password = "Please enter the password";

    // 6. Password Match Validation
    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords are not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // SUCCESS: Clear errors and go to login
      setErrors({});
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 font-sans text-slate-900">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md border border-slate-200">
        <h1 className="text-2xl font-bold text-center mb-8 text-blue-600">
          Create Your Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Gender
            </label>
            <div
              className={`flex gap-6 p-3 rounded-lg border transition ${errors.gender ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"}`}
            >
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Boy"
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-4 h-4"
                />
                <span>Boy</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Girl"
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-4 h-4"
                />
                <span>Girl</span>
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.gender}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-3 py-2 border rounded-md outline-none transition ${errors.name ? "border-red-500" : "border-slate-300 focus:border-blue-500"}`}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-bold text-slate-700">
              Email Address
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-3 py-2 border rounded-md outline-none transition ${errors.email ? "border-red-500" : "border-slate-300 focus:border-blue-500"}`}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          {/* Student ID */}
          <div>
            <label className="block text-sm font-bold text-slate-700">
              Student ID Number
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-3 py-2 border rounded-md outline-none transition ${errors.studentId ? "border-red-500" : "border-slate-300 focus:border-blue-500"}`}
              onChange={(e) =>
                setFormData({ ...formData, studentId: e.target.value })
              }
            />
            {errors.studentId && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.studentId}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-slate-700">
              Password
            </label>
            <input
              type="password"
              className={`mt-1 block w-full px-3 py-2 border rounded-md outline-none transition ${errors.password ? "border-red-500" : "border-slate-300 focus:border-blue-500"}`}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-bold text-slate-700">
              Confirm Password
            </label>
            <input
              type="password"
              className={`mt-1 block w-full px-3 py-2 border rounded-md outline-none transition ${errors.confirmPassword ? "border-red-500" : "border-slate-300 focus:border-blue-500"}`}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 mt-4"
          >
            Register Now
          </button>
        </form>

        <div className="mt-8 text-center border-t pt-6">
          <button
            onClick={() => router.push("/login")}
            className="text-sm text-slate-500 hover:text-blue-600"
          >
            Already have an account? <span className="font-bold">Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}
