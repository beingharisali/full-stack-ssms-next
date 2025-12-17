"use client";

import { TicketTable } from "@/components/tickets/TicketTable";

export default function MyTicketsPage() {
	return (
		<div className="p-6 space-y-4">
			<h1 className="text-xl font-semibold">My Tickets</h1>
			<TicketTable mode="client" />
		</div>
	);
}
