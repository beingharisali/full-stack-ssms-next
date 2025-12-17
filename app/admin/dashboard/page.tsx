"use client";

import { useEffect, useState } from "react";
import { TicketTable } from "@/components/tickets/TicketTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { getTickets } from "@/services/ticket.api";
import { getAllUsers } from "@/services/auth.api";
import { TicketType } from "@/types/ticket";
import { UserSummary } from "@/types/user";

export default function AdminDashboard() {
	const [stats, setStats] = useState({
		totalTickets: 0,
		openTickets: 0,
		inProgressTickets: 0,
		resolvedTickets: 0,
		totalAgents: 0,
		totalClients: 0
	});

	useEffect(() => {
		const loadStats = async () => {
			try {
				const [ticketsData, usersData] = await Promise.all([
					getTickets(),
					getAllUsers()
				]);

				const tickets = ticketsData.tickets || [];
				const users = usersData.users || [];

				setStats({
					totalTickets: tickets.length,
					openTickets: tickets.filter((t: TicketType) => t.status === 'open').length,
					inProgressTickets: tickets.filter((t: TicketType) => t.status === 'in-progress').length,
					resolvedTickets: tickets.filter((t: TicketType) => t.status === 'resolved').length,
					totalAgents: users.filter((u: UserSummary) => u.role === 'agent').length,
					totalClients: users.filter((u: UserSummary) => u.role === 'client').length
				});
			} catch (error) {
				console.error('Failed to load stats:', error);
			}
		};

		loadStats();
	}, []);

	return (
		<RoleGuard allowedRoles={["admin"]}>
			<DashboardLayout>
			<div className="space-y-8">
				{/* Header */}
				<div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl text-white p-6 sm:p-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h1 className="text-2xl sm:text-3xl font-bold mb-2">Admin Dashboard</h1>
							<p className="text-blue-100 text-sm sm:text-base">Monitor system performance and manage all support operations</p>
						</div>
						<div className="mt-4 sm:mt-0 flex items-center space-x-2 text-blue-100">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span className="text-sm font-medium">System Online</span>
						</div>
					</div>
				</div>

				{/* KPI Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
					<div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
						<div className="flex items-center">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
								<svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
								</svg>
							</div>
							<div className="ml-3 sm:ml-4">
								<p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Tickets</p>
								<p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{stats.totalTickets}</p>
							</div>
						</div>
					</div>

					<div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
						<div className="flex items-center">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-xl flex items-center justify-center">
								<span className="text-lg sm:text-xl">🔴</span>
							</div>
							<div className="ml-3 sm:ml-4">
								<p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Open</p>
								<p className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600">{stats.openTickets}</p>
							</div>
						</div>
					</div>

					<div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
						<div className="flex items-center">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
								<span className="text-lg sm:text-xl">⏳</span>
							</div>
							<div className="ml-3 sm:ml-4">
								<p className="text-xs font-medium text-gray-500 uppercase tracking-wide">In Progress</p>
								<p className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-600">{stats.inProgressTickets}</p>
							</div>
						</div>
					</div>

					<div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
						<div className="flex items-center">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
								<span className="text-lg sm:text-xl">✅</span>
							</div>
							<div className="ml-3 sm:ml-4">
								<p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Resolved</p>
								<p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">{stats.resolvedTickets}</p>
							</div>
						</div>
					</div>

					<div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
						<div className="flex items-center">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
								<span className="text-lg sm:text-xl">🎧</span>
							</div>
							<div className="ml-3 sm:ml-4">
								<p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Agents</p>
								<p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">{stats.totalAgents}</p>
							</div>
						</div>
					</div>

					<div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
						<div className="flex items-center">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
								<span className="text-lg sm:text-xl">👥</span>
							</div>
							<div className="ml-3 sm:ml-4">
								<p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Clients</p>
								<p className="text-lg sm:text-xl lg:text-2xl font-bold text-indigo-600">{stats.totalClients}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Tickets Table */}
				<div className="bg-white rounded-xl shadow-lg border border-gray-200">
					<div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
						<h2 className="text-xl font-bold text-gray-800">📊 All Support Tickets</h2>
						<p className="text-gray-600 text-sm mt-1">Manage all tickets, assign agents, and monitor statuses</p>
					</div>
					<div className="p-6">
						<TicketTable mode="admin" viewType="table" />
					</div>
				</div>
			</div>
			</DashboardLayout>
		</RoleGuard>
	);
}