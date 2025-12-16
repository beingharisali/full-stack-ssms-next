"use client";

import React from "react";
import { TicketStatus } from "@/types/ticket";

const STATUS_STYLES: Record<
	TicketStatus,
	{ label: string; classes: string }
> = {
	"open": { label: "Open", classes: "bg-blue-100 text-blue-700" },
	"in-progress": { label: "In Progress", classes: "bg-yellow-100 text-yellow-700" },
	"resolved": { label: "Resolved", classes: "bg-green-100 text-green-700" },
};

export function StatusChip({ status }: { status: TicketStatus }) {
	const style = STATUS_STYLES[status];
	return (
		<span className={`px-2 py-1 text-xs font-semibold rounded ${style.classes}`}>
			{style.label}
		</span>
	);
}

