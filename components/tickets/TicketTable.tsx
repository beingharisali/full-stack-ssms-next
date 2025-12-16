"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getTickets, TicketFilters, deleteTicket } from "@/services/ticket.api";
import { TicketType } from "@/types/ticket";
import { StatusChip } from "./StatusChip";
import { PriorityBadge } from "./PriorityBadge";
import { TicketFiltersForm } from "./TicketFilters";
import { useAuthContext } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

interface TicketTableProps {
	mode: "client" | "agent" | "admin";
	refreshKey?: number;
	viewType?: "table" | "card";
}

const defaultMeta = {
	page: 1,
	limit: 5,
	total: 0,
	totalPages: 1,
};

export function TicketTable({ mode, refreshKey = 0, viewType = "card" }: TicketTableProps) {
	const { user } = useAuthContext();
	const { pushToast } = useToast();
	const router = useRouter();
	const [filters, setFilters] = useState<TicketFilters>({
		page: 1,
		limit: 5,
		sort: "latest",
	});
	const [tickets, setTickets] = useState<TicketType[]>([]);
	const [meta, setMeta] = useState(defaultMeta);
	const [loading, setLoading] = useState(true);
	const [deleteModal, setDeleteModal] = useState<{ show: boolean; ticket: TicketType | null }>({ show: false, ticket: null });

	useEffect(() => {
		const load = async () => {
			try {
				setLoading(true);
				const data = await getTickets(filters);
				setTickets(data.tickets);
				setMeta(data.meta);
			} catch (err) {
				console.error("getTickets error", err);
				pushToast("Failed to load tickets", "error");
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [filters, refreshKey, pushToast]);

	useEffect(() => {
		const handleTicketUpdate = () => {
			setFilters(prev => ({ ...prev })); // Trigger refresh
		};

		window.addEventListener("ticketUpdate", handleTicketUpdate);
		return () => window.removeEventListener("ticketUpdate", handleTicketUpdate);
	}, []);

	const unreadForUser = (ticket: TicketType) => {
		if (!user?.id || !ticket.unreadBy) return false;
		return ticket.unreadBy.some((id) => id === user.id);
	};

	const assignedLabel = (ticket: TicketType) => {
		const assigned = ticket.assignedTo;
		if (!assigned) return "Unassigned";
		if (typeof assigned === "string") return assigned;
		return `${assigned.firstName} ${assigned.lastName}`;
	};

	const handleDelete = async () => {
		if (!deleteModal.ticket) return;
		try {
			await deleteTicket(deleteModal.ticket._id!);
			pushToast("Ticket deleted successfully", "success");
			setDeleteModal({ show: false, ticket: null });
			setFilters(prev => ({ ...prev })); // Refresh
		} catch {
			pushToast("Failed to delete ticket", "error");
		}
	};

	const renderTableView = () => (
		<div className="overflow-x-auto">
			<table className="min-w-full">
				<thead>
					<tr className="border-b border-gray-200">
						<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ticket</th>
						<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
						<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
						<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">Assigned</th>
						<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Created</th>
						<th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-100">
					{tickets.map((ticket) => (
						<tr key={ticket._id} className="hover:bg-gray-50 transition-colors">
							<td className="px-6 py-4">
								<div className="flex items-start space-x-3">
									{unreadForUser(ticket) && (
										<div className="w-2 h-2 bg-blue-600 rounded-full mt-2 animate-pulse flex-shrink-0" />
									)}
									<div className="min-w-0 flex-1">
										<div className="text-sm font-semibold text-gray-900 truncate">{ticket.title}</div>
										<div className="text-xs text-gray-500 mt-1 flex items-center space-x-2">
											<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
												{ticket.category}
											</span>
											<span>#{ticket._id?.slice(-6)}</span>
										</div>
									</div>
								</div>
							</td>
							<td className="px-6 py-4">
								<StatusChip status={ticket.status} />
							</td>
							<td className="px-6 py-4">
								<PriorityBadge priority={ticket.priority} />
							</td>
							<td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">
								<div className="flex items-center space-x-2">
									<div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
										<span className="text-xs font-medium text-gray-600">
											{assignedLabel(ticket) === "Unassigned" ? "U" : assignedLabel(ticket)[0]}
										</span>
									</div>
									<span className="truncate">{assignedLabel(ticket)}</span>
								</div>
							</td>
							<td className="px-6 py-4 text-xs text-gray-500 hidden md:table-cell">
								{ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "-"}
							</td>
							<td className="px-6 py-4">
								<div className="flex items-center justify-end space-x-2">
									<Link 
										href={`/tickets/${ticket._id}`} 
										className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
										<svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
										</svg>
										View
									</Link>
									{mode === "admin" && (
										<button 
											onClick={() => setDeleteModal({ show: true, ticket })} 
											className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors">
											<svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
											Delete
										</button>
									)}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);

	const renderCardView = () => (
		<div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">
			{tickets.map((ticket) => (
				<div key={ticket._id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-6 group">
					<div className="flex items-start justify-between mb-4">
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-3 mb-2">
								{unreadForUser(ticket) && (
									<div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
								)}
								<h3 className="font-semibold text-gray-900 text-lg truncate group-hover:text-blue-600 transition-colors">
									{ticket.title}
								</h3>
							</div>
							<p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
								{ticket.description}
							</p>
							<div className="flex flex-wrap gap-2 mb-4">
								<StatusChip status={ticket.status} />
								<PriorityBadge priority={ticket.priority} />
								<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
									<svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
									</svg>
									{ticket.category}
								</span>
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
								<svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<span className="text-xs text-gray-500">
								{ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleDateString() : "-"}
							</span>
						</div>
					</div>
					
					<div className="flex items-center justify-between pt-4 border-t border-gray-100">
						<div className="flex items-center space-x-2 text-xs text-gray-500">
							<span>Assigned to:</span>
							<span className="font-medium text-gray-700">{assignedLabel(ticket)}</span>
						</div>
						<div className="flex items-center space-x-2">
							<Link
								href={`/tickets/${ticket._id}`}
								className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
								<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
								</svg>
								View
							</Link>
							{mode === "client" && (
								<>
									<Link
										href={`/tickets/${ticket._id}/edit`}
										className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
										<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
										</svg>
										Edit
									</Link>
									<button
										onClick={() => setDeleteModal({ show: true, ticket })}
										className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
										<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
										</svg>
										Delete
									</button>
								</>
							)}
							{mode === "admin" && (
								<button
									onClick={() => setDeleteModal({ show: true, ticket })}
									className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
									<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
									Delete
								</button>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	);

	return (
		<div className="space-y-6">
			<TicketFiltersForm filters={filters} onChange={setFilters} />

			{loading ? (
				<div className="text-center py-16">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600 font-medium">Loading tickets...</p>
				</div>
			) : tickets.length ? (
				viewType === "table" ? renderTableView() : renderCardView()
			) : (
				<div className="text-center py-16">
					<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
						<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
						</svg>
					</div>
					<h3 className="text-lg font-semibold text-gray-900 mb-2">No tickets found</h3>
					<p className="text-gray-500 mb-6 max-w-sm mx-auto">Get started by creating your first support ticket to track and resolve issues</p>
					{mode === "client" && (
						<Link
							href="/client/tickets/create"
							className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm">
							<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
							Create Ticket
						</Link>
					)}
				</div>
			)}

			{/* Pagination */}
			{tickets.length > 0 && (
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white px-6 py-4 rounded-xl border border-gray-200 space-y-3 sm:space-y-0">
					<div className="text-sm text-gray-600">
						Showing <span className="font-semibold text-gray-900">{((meta.page - 1) * meta.limit) + 1}</span> to{" "}
						<span className="font-semibold text-gray-900">{Math.min(meta.page * meta.limit, meta.total)}</span> of{" "}
						<span className="font-semibold text-gray-900">{meta.total}</span> tickets
					</div>
					<div className="flex items-center space-x-2">
						<button
							className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							disabled={meta.page === 1}
							onClick={() => setFilters(prev => ({ ...prev, page: Math.max(1, (prev.page || 1) - 1) }))}>
							<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
							Previous
						</button>
						<span className="text-sm text-gray-500">Page {meta.page} of {meta.totalPages}</span>
						<button
							className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							disabled={meta.page >= meta.totalPages}
							onClick={() => setFilters(prev => ({ ...prev, page: Math.min(meta.totalPages, (prev.page || 1) + 1) }))}>
							Next
							<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</button>
					</div>
				</div>
			)}

			{/* Delete Confirmation Modal */}
			{deleteModal.show && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
						<div className="text-center">
							<div className="text-6xl mb-4">⚠️</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Ticket</h3>
							<p className="text-gray-600 mb-6">
								Are you sure you want to delete "{deleteModal.ticket?.title}"? This action cannot be undone.
							</p>
							<div className="flex gap-3 justify-center">
								<button
									onClick={() => setDeleteModal({ show: false, ticket: null })}
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
		</div>
	);
}