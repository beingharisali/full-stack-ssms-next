"use client";

import { TicketTable } from "@/components/tickets/TicketTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function AgentAllTickets() {
	return (
		<DashboardLayout>
			<div className="bg-white rounded-xl shadow-lg border border-gray-200">
				<div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
					<h2 className="text-xl font-bold text-gray-800">📋 All Support Tickets</h2>
					<p className="text-gray-600 text-sm mt-1">View all tickets in the system</p>
				</div>
				<div className="p-6">
					<TicketTable mode="admin" viewType="table" />
				</div>
			</div>
		</DashboardLayout>
	);
}