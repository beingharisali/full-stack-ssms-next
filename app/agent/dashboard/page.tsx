"use client";

import { TicketTable } from "@/components/tickets/TicketTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoleGuard } from "@/components/auth/RoleGuard";

export default function AgentDashboard() {
	return (
		<RoleGuard allowedRoles={["agent"]}>
			<DashboardLayout>
			<div className="space-y-8">
				{/* Header */}
				<div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-2xl text-white p-6 sm:p-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h1 className="text-2xl sm:text-3xl font-bold mb-2">Agent Dashboard</h1>
							<p className="text-green-100 text-sm sm:text-base">Manage your assigned tickets and provide excellent customer support</p>
						</div>
						<div className="mt-4 sm:mt-0 flex items-center space-x-2 text-green-100">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
							<span className="text-sm font-medium">Ready to Help</span>
						</div>
					</div>
				</div>

				{/* Tickets Section */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200">
					<div className="px-6 py-5 border-b border-gray-200">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
								<svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
								</svg>
							</div>
							<div>
								<h2 className="text-xl font-semibold text-gray-900">My Assigned Tickets</h2>
								<p className="text-sm text-gray-500 mt-1">View and manage tickets assigned to you for resolution</p>
							</div>
						</div>
					</div>
					<div className="p-6">
						<TicketTable mode="agent" />
					</div>
				</div>
			</div>
			</DashboardLayout>
		</RoleGuard>
	);
}
