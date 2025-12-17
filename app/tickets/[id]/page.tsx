"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TicketType, TicketStatus } from "@/types/ticket";
import { assignTicket, getTicket, updateTicket } from "@/services/ticket.api";
import { getAgents } from "@/services/agent";
import { AgentType } from "@/types/agent";
import { StatusChip } from "@/components/tickets/StatusChip";
import { PriorityBadge } from "@/components/tickets/PriorityBadge";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { useAuthContext } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useSocket } from "@/context/SocketContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

interface TicketApiResponse {
	ticket?: TicketType;
}

const getAgentDisplayName = (agent: AgentType) => {
	const fullName = `${agent.firstName ?? ""} ${agent.lastName ?? ""}`.trim();
	return fullName || agent.name || agent.email || "Unknown Agent";
};

export default function TicketDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { user } = useAuthContext();
	const { pushToast } = useToast();
	const { onlineUsers } = useSocket();
	const router = useRouter();
	const [ticket, setTicket] = useState<TicketType | null>(null);
	const [agents, setAgents] = useState<AgentType[]>([]);
	const [loading, setLoading] = useState(true);
	const [ticketId, setTicketId] = useState<string | null>(null);

	useEffect(() => {
		const getParams = async () => {
			const resolvedParams = await params;
			setTicketId(resolvedParams.id);
		};
		getParams();
	}, [params]);

	useEffect(() => {
		if (!ticketId) return;
		const load = async () => {
			setLoading(true);
			try {
				const data: TicketType = await getTicket(ticketId);
				setTicket(data);

				if (user?.role === "admin") {
					const agentList = await getAgents();
					setAgents(agentList);
				}
			} catch (error) {
				console.error('Ticket load error:', error);
				pushToast("Ticket not found", "error");
				router.back();
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [ticketId, user?.role, pushToast, router]);

	const handleAssign = async (agentId: string) => {
		if (!agentId || !ticketId) return;
		try {
			const response: TicketType | TicketApiResponse = await assignTicket(
				ticketId,
				{ assignedTo: agentId }
			);

			const newTicketData =
				(response as TicketApiResponse).ticket || (response as TicketType);

			setTicket((prev) =>
				prev ? { ...prev, ...newTicketData } : newTicketData
			);

			pushToast("Ticket assigned", "success");
		} catch {
			pushToast("Assignment failed", "error");
		}
	};

	const handleStatus = async (status: TicketStatus) => {
		if (!ticketId) return;
		try {
			const response: TicketType | TicketApiResponse = await updateTicket(
				ticketId,
				{ status }
			);

			const newTicketData =
				(response as TicketApiResponse).ticket || (response as TicketType);

			setTicket((prev) =>
				prev ? { ...prev, ...newTicketData } : newTicketData
			);

			pushToast("Status updated", "success");
		} catch {
			pushToast("Failed to update status", "error");
		}
	};

	const isOnline = (id?: string | null) => {
		if (!id) return false;
		return onlineUsers.some((u) => u.userId === id);
	};

	if (loading) {
		return (
			<DashboardLayout>
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="flex items-center space-x-3">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
						<span className="text-gray-600">Loading ticket...</span>
					</div>
				</div>
			</DashboardLayout>
		);
	}
	if (!ticket) {
		return (
			<DashboardLayout>
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="text-center">
						<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
						</div>
						<h3 className="text-lg font-medium text-gray-900 mb-2">Ticket not found</h3>
						<p className="text-gray-500">The ticket you're looking for doesn't exist or you don't have access to it.</p>
					</div>
				</div>
			</DashboardLayout>
		);
	}

	const assigned =
		typeof ticket.assignedTo === "string"
			? { id: ticket.assignedTo, name: ticket.assignedTo }
			: ticket.assignedTo
			? {
					id: ticket.assignedTo._id,
					name: `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}`,
			  }
			: null;

	const creator =
		typeof ticket.createdBy === "string"
			? { id: ticket.createdBy, name: ticket.createdBy }
			: {
					id: ticket.createdBy._id,
					name: `${ticket.createdBy.firstName} ${ticket.createdBy.lastName}`,
			  };

	const canManageAssignment = user?.role === "admin";
	const canUpdateStatus =
		user?.role === "admin" ||
		(user?.role === "agent" && assigned && assigned.id === user.id);

	return (
		<DashboardLayout>
			<div className="max-w-7xl mx-auto space-y-6">
				{/* Header */}
				<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
					<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
						<div className="flex-1 min-w-0">
							<div className="flex items-center space-x-3 mb-3">
								<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
									<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
									</svg>
								</div>
								<div className="min-w-0 flex-1">
									<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
										{ticket.title}
									</h1>
									<p className="text-sm text-gray-500 mt-1">Ticket #{ticketId?.slice(-8)}</p>
								</div>
							</div>
							<p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">{ticket.description}</p>
							<div className="flex flex-wrap gap-2">
								<StatusChip status={ticket.status} />
								<PriorityBadge priority={ticket.priority} />
								<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
									<svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
									</svg>
									{ticket.category}
								</span>
							</div>
						</div>
						<button
							className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex-shrink-0"
							onClick={() => router.back()}>
							<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
							</svg>
							Back
						</button>
					</div>
				</div>

				{/* Main Content */}
				<div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
					{/* Left Column - Chat takes priority on mobile */}
					<div className="xl:col-span-3 order-2 xl:order-1">
						{ticketId && (
							<div className="h-[600px] sm:h-[700px]">
								<ChatPanel ticketId={ticketId} />
							</div>
						)}
					</div>

					{/* Right Column - Info panels */}
					<div className="xl:col-span-1 order-1 xl:order-2 space-y-4">
						{/* Participants */}
						<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
							<div className="flex items-center space-x-2 mb-4">
								<svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
								</svg>
								<h3 className="font-semibold text-gray-900">Participants</h3>
							</div>
							<div className="space-y-3">
								<div className="flex items-center space-x-3">
									<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
										<span className="text-xs font-medium text-blue-700">C</span>
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-gray-900 truncate">{creator.name}</p>
										<div className="flex items-center space-x-2">
											<span className="text-xs text-gray-500">Client</span>
											{isOnline(creator.id) && (
												<span className="flex items-center text-xs text-green-600">
													<span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
													Online
												</span>
											)}
										</div>
									</div>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
										<span className="text-xs font-medium text-green-700">A</span>
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-gray-900 truncate">
											{assigned ? assigned.name : "Unassigned"}
										</p>
										<div className="flex items-center space-x-2">
											<span className="text-xs text-gray-500">Agent</span>
											{assigned?.id && isOnline(assigned.id) && (
												<span className="flex items-center text-xs text-green-600">
													<span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
													Online
												</span>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Actions */}
						{(canManageAssignment || canUpdateStatus) && (
							<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4">
								<div className="flex items-center space-x-2">
									<svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									</svg>
									<h3 className="font-semibold text-gray-900">Actions</h3>
								</div>
								{canManageAssignment && (
									<div className="space-y-2">
										<label className="block text-sm font-medium text-gray-700">Assign Agent</label>
										<select
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
											value={assigned?.id ?? ""}
											onChange={(e) => handleAssign(e.target.value)}>
											<option value="">Select agent</option>
											{agents.map((agent) => (
												<option key={agent._id} value={agent._id}>
													{getAgentDisplayName(agent)}
												</option>
											))}
										</select>
									</div>
								)}
								{canUpdateStatus && (
									<div className="space-y-2">
										<label className="block text-sm font-medium text-gray-700">Update Status</label>
										<select
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
											value={ticket.status}
											onChange={(e) => handleStatus(e.target.value as TicketStatus)}>
											<option value="open">Open</option>
											<option value="in-progress">In Progress</option>
											<option value="resolved">Resolved</option>
										</select>
									</div>
								)}
							</div>
						)}

						{/* Attachments */}
						<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
							<div className="flex items-center space-x-2 mb-4">
								<svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
								</svg>
								<h3 className="font-semibold text-gray-900">Attachments</h3>
							</div>
							{ticket.attachments?.length ? (
								<div className="space-y-2">
									{ticket.attachments.map((file) => (
										<a
											key={file.filename}
											className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
											href={file.url}
											target="_blank"
											rel="noreferrer">
											<svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
											</svg>
											<span className="text-sm text-gray-700 truncate">{file.originalName}</span>
										</a>
									))}
								</div>
							) : (
								<p className="text-sm text-gray-500 text-center py-4">
									No attachments
								</p>
							)}
						</div>

						{/* Ticket Info */}
						<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
							<div className="flex items-center space-x-2 mb-4">
								<svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<h3 className="font-semibold text-gray-900">Details</h3>
							</div>
							<div className="space-y-3 text-sm">
								<div>
									<span className="text-gray-500">Created:</span>
									<p className="font-medium text-gray-900">
										{ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "-"}
									</p>
								</div>
								<div>
									<span className="text-gray-500">Last Updated:</span>
									<p className="font-medium text-gray-900">
										{ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleDateString() : "-"}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
