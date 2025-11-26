"use client";

import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export default function RegisterPage() {
  const { registerUser } = useAuthContext();

  const [form, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validateForm() {
    let newErrors: any = {};
    let isValid = true;

    // EMAIL VALIDATION
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    // PASSWORD MINIMUM LENGTH
    if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      isValid = false;
    }

    // PASSWORD MATCH
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    // ROLE REQUIRED
    if (!form.role) {
      newErrors.role = "Please select a role.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      await registerUser(
        form.firstName,
        form.lastName,
        form.email,
        form.password,
        form.role as any
      );
    } catch (error) {
      const e = error as { response?: { data?: { msg?: string } } };
      alert(e.response?.data?.msg || "Registration failed");
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="text-gray-700 bg-gray-100 body-font min-h-screen flex items-center justify-center">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="sm:text-3xl text-2xl font-semibold title-font mb-4 text-gray-800">
            Sign Up
          </h1>
          <p className="text-gray-500 text-sm">Create your account to get started</p>
        </div>

        <div className="lg:w-1/2 md:w-2/3 mx-auto bg-white rounded-2xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="flex flex-wrap -m-2">

            {/* FIRST NAME */}
            <div className="p-2 w-1/2">
              <label className="leading-7 text-sm text-gray-600">First Name:</label>
              <input
                type="text"
                name="firstName"
                required
                value={form.firstName}
                onChange={handleChange}
                className="w-full bg-gray-200 rounded border border-gray-300 focus:ring-2 focus:ring-gray-400 py-2 px-3"
              />
            </div>

            {/* LAST NAME */}
            <div className="p-2 w-1/2">
              <label className="leading-7 text-sm text-gray-600">Last Name:</label>
              <input
                type="text"
                name="lastName"
                required
                value={form.lastName}
                onChange={handleChange}
                className="w-full bg-gray-200 rounded border border-gray-300 focus:ring-2 focus:ring-gray-400 py-2 px-3"
              />
            </div>

            {/* EMAIL */}
            <div className="p-2 w-1/2">
              <label className="leading-7 text-sm text-gray-600">Email:</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full bg-gray-200 rounded border border-gray-300 focus:ring-2 focus:ring-gray-400 py-2 px-3"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* ROLE */}
            <div className="p-2 w-1/2">
              <label className="leading-7 text-sm text-gray-600">Role</label>
              <select
                name="role"
                required
                value={form.role}
                onChange={handleChange}
                className="w-full bg-gray-200 rounded border border-gray-300 focus:ring-2 focus:ring-gray-400 py-2 px-3"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="agent">Agent</option>
                <option value="user">User</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="p-2 w-1/2">
              <label className="leading-7 text-sm text-gray-600">Password:</label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full bg-gray-200 rounded border border-gray-300 focus:ring-2 focus:ring-gray-400 py-2 px-3"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="p-2 w-1/2">
              <label className="leading-7 text-sm text-gray-600">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full bg-gray-200 rounded border border-gray-300 focus:ring-2 focus:ring-gray-400 py-2 px-3"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="p-2 w-full">
              <button
                type="submit"
                disabled={loading}
                className="flex mx-auto text-white bg-gray-700 py-2 px-10 rounded-lg text-lg hover:bg-gray-900 transition"
              >
                {loading ? "Processing..." : "Sign Up"}
              </button>
            </div>

            {/* LOGIN LINK */}
            <div className="text-center w-full">
              <p>
                Already have an account?{" "}
                <a className="text-gray-800 hover:text-blue-500" href="/login">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
