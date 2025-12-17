"use client";

import { useEffect, useState } from "react";
import { getTickets } from "@/services/ticket.api";
import { TicketType } from "@/types/ticket";
import { useAuthContext } from "@/context/AuthContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusChip } from "@/components/tickets/StatusChip";
import Link from "next/link";

export default function AgentActivity() {
	const { user } = useAuthContext();
	const [recentTickets, setRecentTickets] = useState<TicketType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadActivity = async () => {
			try {
				const data = await getTickets({ limit: 10, sort: "latest" });
				const myTickets = (data.tickets || []).filter((ticket: TicketType) => {
					const assignedId = typeof ticket.assignedTo === 'string' 
						? ticket.assignedTo 
						: ticket.assignedTo?._id;
					return assignedId === user?.id;
				});
				setRecentTickets(myTickets);
			} catch (error) {
				console.error("Failed to load activity:", error);
			} finally {
				setLoading(false);
			}
		};

		if (user?.id) {
			loadActivity();
		}
	}, [user?.id]);

	return (
		<DashboardLayout>
			<div className="bg-white rounded-xl shadow-lg border border-gray-200">
				<div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
					<h2 className="text-xl font-bold text-gray-800">📈 Recent Activity</h2>
					<p className="text-gray-600 text-sm mt-1">Your latest ticket updates and activities</p>
				</div>
				<div className="p-6">
					{loading ? (
						<div className="text-center py-8">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
							<p className="mt-2 text-gray-600">Loading activity...</p>
						</div>
					) : recentTickets.length > 0 ? (
						<div className="space-y-4">
							{recentTickets.map((ticket) => (
								<div key={ticket._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
									<div className="flex justify-between items-start">
										<div className="flex-1">
											<div className="flex items-center gap-3 mb-2">
												<h3 className="font-semibold text-gray-900">{ticket.title}</h3>
												<StatusChip status={ticket.status} />
											</div>
											<p className="text-gray-600 text-sm mb-2 line-clamp-2">{ticket.description}</p>
											<div className="flex items-center gap-4 text-xs text-gray-500">
												<span>📁 {ticket.category}</span>
												<span>🕒 {ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleDateString() : "-"}</span>
											</div>
										</div>
										<Link
											href={`/tickets/${ticket._id}`}
											className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
											View
										</Link>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-12">
							<div className="text-6xl mb-4">📈</div>
							<h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
							<p className="text-gray-600">Your ticket activities will appear here</p>
						</div>
					)}
				</div>
			</div>
		</DashboardLayout>
	);
}