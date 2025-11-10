"use client";

import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
// import Link from "next/link";

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
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!form.role) {
      alert("Please select a role!");
      return;
    }

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
          <p className="text-gray-500 text-sm">
            Create your account to get started
          </p>
        </div>

        <div className="lg:w-1/2 md:w-2/3 mx-auto bg-white rounded-2xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <label
                htmlFor="firstName"
                className="leading-7 text-sm text-gray-600">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={form.firstName}
                onChange={handleChange}
                className="w-full bg-gray-200 rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-400 text-base outline-none text-gray-900 py-2 px-3 leading-8 transition duration-200 ease-in-out"
              />
            </div>

            <div className="p-2 w-1/2">
              <label
                htmlFor="lastName"
                className="leading-7 text-sm text-gray-600">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={form.lastName}
                onChange={handleChange}
                className="w-full bg-gray-200 rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-400 text-base outline-none text-gray-900 py-2 px-3 leading-8 transition duration-200 ease-in-out"
              />
            </div>

            <div className="p-2 w-1/2">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full bg-gray-200 rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-400 text-base outline-none text-gray-900 py-2 px-3 leading-8 transition duration-200 ease-in-out"
              />
            </div>

            <div className="p-2 w-1/2">
              <label className="leading-7 text-sm text-gray-600">Role</label>
              <select
                name="role"
                required
                value={form.role}
                onChange={handleChange}
                className="w-full bg-gray-200 rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-400 text-base outline-none text-gray-900 py-2 px-3 leading-8 transition duration-200 ease-in-out">
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="agent">Agent</option>
                <option value="user">User</option>
              </select>
            </div>

            <div className="p-2 w-1/2">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={form.password}
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full bg-gray-200 rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-400 text-base outline-none text-gray-900 py-2 px-3 leading-8 transition duration-200 ease-in-out"
              />
            </div>

            <div className="p-2 w-1/2">
              <label
                htmlFor="confirmPassword"
                className="leading-7 text-sm text-gray-600">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={form.confirmPassword}
                placeholder="Confirm your password"
                onChange={handleChange}
                className={`w-full bg-gray-200 rounded border  focus:border-gray-500 focus:ring-2 focus:ring-gray-400 text-base outline-none text-gray-900 py-2 px-3 leading-8 transition duration-200 ease-in-out`}
              />
            </div>

            <div className="p-2 w-full">
              <button
                type="submit"
                className="flex mx-auto text-white bg-gray-700 border-0 py-2 px-10 focus:outline-none hover:bg-gray-900 rounded-lg text-lg transition duration-200">
                Sign Up
              </button>
            </div>
            <div className=" text-center w-full ">
              <p>
                Already have an accout?{" "}
                <a
                  className="text-gray-800  hover:text-blue-500 rounded-lg text-lg transition duration-200"
                  href="/login">
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
