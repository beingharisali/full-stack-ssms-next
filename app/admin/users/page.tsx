"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/auth.api";
import { UserSummary } from "@/types/user";
import { useToast } from "@/context/ToastContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function AdminUsers() {
	const { pushToast } = useToast();
	const [users, setUsers] = useState<UserSummary[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadUsers = async () => {
			try {
				const response = await getAllUsers();
				setUsers(response.users || []);
			} catch {
				pushToast("Failed to load users", "error");
			} finally {
				setLoading(false);
			}
		};

		loadUsers();
	}, [pushToast]);

	const getRoleBadge = (role: string) => {
		const colors = {
			admin: "bg-red-100 text-red-800",
			agent: "bg-blue-100 text-blue-800",
			client: "bg-green-100 text-green-800",
		};
		return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800";
	};

	return (
		<DashboardLayout>
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">👥 User Management</h1>
					<p className="text-gray-600">Overview of all system users and their roles</p>
				</div>

				{loading ? (
					<div className="flex items-center justify-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
						<span className="ml-3 text-lg text-gray-600">Loading users...</span>
					</div>
				) : (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{users.map((userItem) => (
							<div key={userItem._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 p-6">
								<div className="flex items-center space-x-4">
									<div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
										<span className="text-xl font-bold text-white">
											{userItem.firstName[0]}{userItem.lastName[0]}
										</span>
									</div>
									<div className="flex-1">
										<h3 className="text-lg font-semibold text-gray-900 mb-1">
											{userItem.firstName} {userItem.lastName}
										</h3>
										<p className="text-gray-600 text-sm mb-2">{userItem.email}</p>
										<span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getRoleBadge(userItem.role)}`}>
											{userItem.role.toUpperCase()}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{!loading && users.length === 0 && (
					<div className="text-center py-12">
						<div className="text-6xl mb-4">👥</div>
						<h3 className="text-xl font-medium text-gray-900 mb-2">No users found</h3>
						<p className="text-gray-600">There are no users in the system yet.</p>
					</div>
				)}
			</div>
		</DashboardLayout>
	);
}