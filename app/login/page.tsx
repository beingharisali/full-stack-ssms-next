


"use client";

import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function RegisterPage() {
	const { loginUser } = useAuthContext();
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		role: "",
	});

	const [loading, setLoading] = useState(false);

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) {
		const { name, value } = e.target; // Destructuring name and value
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		try {
			setLoading(true);
			await loginUser(formData.email, formData.password, formData.role as any);
		} catch (error) {
			const e = error as { response?: { data?: { msg?: string } } };
			alert(e.response?.data?.msg || "Registration failed");
			console.error("Registration failed:", error);
		} finally {
			setLoading(false);
		}
	}

  return (
    <section className="text-gray-400 body-font min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-500 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="E-Mail"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-200 rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-400 text-gray-900 py-2 px-3 outline-none transition duration-200 ease-in-out"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-500 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-200 rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-400 text-gray-900 py-2 px-3 outline-none transition duration-200 ease-in-out"
            />
          </div>

      

          <button
            type="submit"
            className="w-full text-white bg-gray-700 hover:bg-gray-900 py-2 rounded-lg text-lg transition duration-200">
            Login
          </button>
<div className=" text-center w-full ">
  <p>Doesn't have an accout? <a className="text-gray-800  hover:text-blue-500 rounded-lg text-lg transition duration-200" href="/">Sign Up</a></p>
</div>
          
        </form>
      </div>
    </section>
  );
}
