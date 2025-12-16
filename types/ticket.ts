import { UserSummary } from "./user";

export type TicketStatus = "open" | "in-progress" | "resolved";
export type TicketPriority = "low" | "medium" | "high";

export interface TicketAttachment {
	originalName: string;
	filename: string;
	url: string;
	size: number;
	mimeType: string;
}

export interface TicketType {
	_id?: string;
	title: string;
	description: string;
	category: string;
	priority: TicketPriority;
	status: TicketStatus;
	attachments: TicketAttachment[];
	createdBy: string | UserSummary;
	assignedTo?: string | UserSummary | null;
	unreadBy?: string[];
	createdAt?: string;
	updatedAt?: string;
}

export interface TicketListResponse {
	tickets: TicketType[];
	meta: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

export type TicketMessageAttachment = TicketAttachment;

export interface TicketMessage {
	_id: string;
	ticketId: string;
	content: string;
	senderId: UserSummary;
	createdAt: string;
	updatedAt: string;
	readBy: { userId: string; readAt: string }[];
}

export interface CreateTicketRequest {
	title: string;
	description: string;
	category: string;
	priority: TicketPriority;
	attachments?: File[];
}

export interface UpdateTicketRequest {
	title?: string;
	description?: string;
	category?: string;
	priority?: TicketPriority;
	status?: TicketStatus;
	assignedTo?: string | null;
	attachments?: File[];
}

export interface AssignTicketRequest {
	assignedTo: string;
}

export interface TicketApiResponse {
	success: boolean;
	msg: string;
	ticket?: TicketType;
	tickets?: TicketType[];
	meta?: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}
