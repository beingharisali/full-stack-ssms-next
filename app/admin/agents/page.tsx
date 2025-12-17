"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllUsers, deleteUser } from "@/services/auth.api";
import { UserSummary } from "@/types/user";
import { useToast } from "@/context/ToastContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function AdminAgents() {
	const { pushToast } = useToast();
	const [agents, setAgents] = useState<UserSummary[]>([]);
	const [loading, setLoading] = useState(true);
	const [deleteModal, setDeleteModal] = useState<{ show: boolean; agent: UserSummary | null }>({ show: false, agent: null });

	useEffect(() => {
		loadAgents();
	}, []);

	const loadAgents = async () => {
		try {
			const response = await getAllUsers();
			const agentUsers = (response.users || []).filter((user: UserSummary) => user.role === "agent");
			setAgents(agentUsers);
		} catch {
			pushToast("Failed to load agents", "error");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		if (!deleteModal.agent) return;
		try {
			await deleteUser(deleteModal.agent._id);
			pushToast("Agent deleted successfully", "success");
			setDeleteModal({ show: false, agent: null });
			loadAgents();
		} catch {
			pushToast("Failed to delete agent", "error");
		}
	};

	return (
		<DashboardLayout>
			<div className="bg-white rounded-xl shadow-lg border border-gray-200">
				<div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
					<div className="flex justify-between items-center">
						<div>
							<h2 className="text-xl font-bold text-gray-800">👨💼 Agent Management</h2>
							<p className="text-gray-600 text-sm mt-1">Manage support agents and their accounts</p>
						</div>
						<Link
							href="/admin/agents/create"
							className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
							➕ Create Agent
						</Link>
					</div>
				</div>
				<div className="p-6">
					{loading ? (
						<div className="text-center py-8">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
							<p className="mt-2 text-gray-600">Loading agents...</p>
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{agents.map((agent) => (
										<tr key={agent._id} className="hover:bg-gray-50">
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
														<span className="text-sm font-medium text-white">
															{agent.firstName[0]}{agent.lastName[0]}
														</span>
													</div>
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900">
															{agent.firstName} {agent.lastName}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agent.email}</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
													Active
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
												<button onClick={() => setDeleteModal({ show: true, agent })} className="text-red-600 hover:text-red-900">
													🗑️ Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							{agents.length === 0 && (
								<div className="text-center py-8">
									<div className="text-6xl mb-4">👨💼</div>
									<h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
									<p className="text-gray-600 mb-4">Create your first support agent to get started</p>
									<Link
										href="/admin/agents/create"
										className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
										➕ Create Agent
									</Link>
								</div>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Delete Confirmation Modal */}
			{deleteModal.show && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
						<div className="text-center">
							<div className="text-6xl mb-4">⚠️</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Agent</h3>
							<p className="text-gray-600 mb-6">
								Are you sure you want to delete "{deleteModal.agent?.firstName} {deleteModal.agent?.lastName}"? This action cannot be undone.
							</p>
							<div className="flex gap-3 justify-center">
								<button
									onClick={() => setDeleteModal({ show: false, agent: null })}
									className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
									Cancel
								</button>
								<button
									onClick={handleDelete}
									className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</DashboardLayout>
	);
}