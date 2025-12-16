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
			<div className="bg-white rounded-xl shadow-lg border border-gray-200">
				<div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
					<h2 className="text-xl font-bold text-gray-800">
						👥 User Management
					</h2>
					<p className="text-gray-600 text-sm mt-1">
						Manage system users and their roles
					</p>
				</div>
				<div className="p-6">
					{loading ? (
						<div className="text-center py-8">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
							<p className="mt-2 text-gray-600">Loading users...</p>
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											User
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Email
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Role
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{users.map((userItem) => (
										<tr key={userItem._id} className="hover:bg-gray-50">
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
														<span className="text-sm font-medium text-white">
															{userItem.firstName[0]}
															{userItem.lastName[0]}
														</span>
													</div>
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900">
															{userItem.firstName} {userItem.lastName}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
												{userItem.email}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span
													className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getRoleBadge(
														userItem.role
													)}`}>
													{userItem.role}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
												<button className="text-blue-600 hover:text-blue-900 mr-4 px-3 py-1 rounded hover:bg-blue-50">
													✏️ Edit
												</button>
												<button className="text-red-600 hover:text-red-900 px-3 py-1 rounded hover:bg-red-50">
													🗑️ Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							{users.length === 0 && (
								<div className="text-center py-8">
									<p className="text-gray-500">No users found</p>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</DashboardLayout>
	);
}
