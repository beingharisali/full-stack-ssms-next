"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/auth.api";
import { useToast } from "@/context/ToastContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function CreateAgent() {
	const router = useRouter();
	const { pushToast } = useToast();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: "agent"
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (formData.password !== formData.confirmPassword) {
			pushToast("Passwords do not match", "error");
			return;
		}

		if (formData.password.length < 8) {
			pushToast("Password must be at least 8 characters", "error");
			return;
		}

		setLoading(true);
		try {
			await register({
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				password: formData.password,
				role: "agent"
			});
			pushToast("Agent created successfully", "success");
			router.push("/admin/agents");
		} catch (error: any) {
			pushToast(error.message || "Failed to create agent", "error");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};

	return (
		<DashboardLayout>
			<div className="max-w-2xl mx-auto">
				<div className="bg-white rounded-xl shadow-lg border border-gray-200">
					<div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
						<h2 className="text-xl font-bold text-gray-800">👨💼 Create New Agent</h2>
						<p className="text-gray-600 text-sm mt-1">Add a new support agent to your team</p>
					</div>
					<div className="p-6">
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										First Name *
									</label>
									<input
										type="text"
										name="firstName"
										value={formData.firstName}
										onChange={handleChange}
										required
										minLength={3}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="Enter first name"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Last Name *
									</label>
									<input
										type="text"
										name="lastName"
										value={formData.lastName}
										onChange={handleChange}
										required
										minLength={3}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="Enter last name"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Email Address *
								</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="Enter email address"
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Password *
									</label>
									<input
										type="password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										required
										minLength={8}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="Enter password (min 8 characters)"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Confirm Password *
									</label>
									<input
										type="password"
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="Confirm password"
									/>
								</div>
							</div>

							<div className="flex gap-4 pt-4">
								<button
									type="button"
									onClick={() => router.back()}
									className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
									Cancel
								</button>
								<button
									type="submit"
									disabled={loading}
									className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
									{loading ? "Creating..." : "Create Agent"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}