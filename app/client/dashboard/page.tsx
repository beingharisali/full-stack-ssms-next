"use client";

import { useState } from "react";
import Link from "next/link";
import { TicketTable } from "@/components/tickets/TicketTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoleGuard } from "@/components/auth/RoleGuard";

export default function ClientDashboard() {
	const [refreshKey, setRefreshKey] = useState(0);

	return (
		<RoleGuard allowedRoles={["client"]}>
			<DashboardLayout>
			<div className="space-y-8">
				{/* Welcome Section */}
				<div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 rounded-2xl text-white p-6 sm:p-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
						<div>
							<h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome to Support Center</h1>
							<p className="text-purple-100 text-sm sm:text-base">Create tickets, track progress, and get help from our support team</p>
						</div>
						<Link
							href="/client/tickets/create"
							className="inline-flex items-center bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl">
							<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
							Create New Ticket
						</Link>
					</div>
				</div>

				{/* Tickets Section */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200">
					<div className="px-6 py-5 border-b border-gray-200">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
								<svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
								</svg>
							</div>
							<div>
								<h2 className="text-xl font-semibold text-gray-900">My Support Tickets</h2>
								<p className="text-sm text-gray-500 mt-1">Track your support requests and communicate with our team</p>
							</div>
						</div>
					</div>
					<div className="p-6">
						<TicketTable mode="client" refreshKey={refreshKey} viewType="card" />
					</div>
				</div>
			</div>
			</DashboardLayout>
		</RoleGuard>
	);
}
