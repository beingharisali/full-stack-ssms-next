import http from "./http";
import {
	TicketMessage,
	TicketType,
	TicketPriority,
	TicketStatus,
	TicketListResponse,
	CreateTicketRequest,
	UpdateTicketRequest,
	AssignTicketRequest,
	TicketApiResponse,
} from "../types/ticket";

export interface TicketFilters {
	page?: number;
	limit?: number;
	status?: TicketStatus;
	priority?: TicketPriority;
	category?: string;
	search?: string;
	sort?: "latest" | "priority";
}

export interface TicketFormPayload {
	title: string;
	description: string;
	category: string;
	priority: TicketPriority;
	status?: TicketStatus;
	assignedTo?: string | null;
	files?: File[];
}

export interface TicketUpdatePayload
	extends Partial<Omit<TicketFormPayload, "files">> {
	files?: File[];
}

export async function getTickets(
	params: TicketFilters = {}
): Promise<TicketListResponse> {
	const res = await http.get("/tickets", { params });
	return {
		tickets: res.data.tickets ?? res.data ?? [],
		meta: res.data.meta ?? {
			page: 1,
			limit: res.data?.tickets?.length ?? 0,
			total: res.data?.tickets?.length ?? 0,
			totalPages: 1,
		},
	};
}

export async function getTicket(id: string): Promise<TicketType> {
	const res = await http.get(`/tickets/${id}`);
	return res.data.ticket ?? res.data;
}

export async function createTicket(payload: TicketFormPayload): Promise<TicketType> {
	const formData = new FormData();
	formData.append("title", payload.title);
	formData.append("description", payload.description);
	formData.append("category", payload.category);
	formData.append("priority", payload.priority);
	if (payload.status) formData.append("status", payload.status);
	if (payload.assignedTo) formData.append("assignedTo", payload.assignedTo);
	(payload.files || []).forEach((file) => {
		formData.append("attachments", file);
	});

	const res = await http.post("/tickets", formData);
	return res.data.ticket ?? res.data;
}

export async function createTicketWithFiles(payload: CreateTicketRequest): Promise<TicketApiResponse> {
	const formData = new FormData();
	formData.append("title", payload.title);
	formData.append("description", payload.description);
	formData.append("category", payload.category);
	formData.append("priority", payload.priority);
	(payload.attachments || []).forEach((file) => {
		formData.append("attachments", file);
	});

	const res = await http.post("/tickets", formData);
	return res.data;
}

export async function updateTicket(
	id: string,
	payload: TicketUpdatePayload
): Promise<TicketType> {
	const formData = new FormData();
	if (payload.title) formData.append("title", payload.title);
	if (payload.description) formData.append("description", payload.description);
	if (payload.category) formData.append("category", payload.category);
	if (payload.priority) formData.append("priority", payload.priority);
	if (payload.status) formData.append("status", payload.status);
	if (payload.assignedTo) formData.append("assignedTo", payload.assignedTo);
	(payload.files || []).forEach((file) => {
		formData.append("attachments", file);
	});

	const res = await http.patch(`/tickets/${id}`, formData);
	return res.data.ticket ?? res.data;
}

export async function deleteTicket(id: string): Promise<void> {
	await http.delete(`/tickets/${id}`);
}

export async function assignTicket(
	id: string,
	payload: AssignTicketRequest
): Promise<TicketApiResponse> {
	const res = await http.patch(`/tickets/${id}/assign`, payload);
	return res.data;
}

export async function getTicketMessages(
	id: string
): Promise<TicketMessage[]> {
	const res = await http.get(`/tickets/${id}/messages`);
	return res.data.messages ?? [];
}

export async function sendTicketMessage(
	id: string,
	body: string,
	files: File[] = []
): Promise<TicketMessage> {
	const formData = new FormData();
	formData.append("body", body);
	files.forEach((file) => formData.append("attachments", file));
	const res = await http.post(`/tickets/${id}/messages`, formData);
	return res.data.message ?? res.data;
}

export async function markTicketRead(id: string): Promise<void> {
	await http.post(`/tickets/${id}/read`);
}
