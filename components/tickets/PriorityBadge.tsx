"use client";

import React from "react";
import { TicketPriority } from "@/types/ticket";

const PRIORITY_COLORS: Record<
	TicketPriority,
	{ label: string; classes: string }
> = {
	low: { label: "Low", classes: "bg-emerald-100 text-emerald-700" },
	medium: { label: "Medium", classes: "bg-orange-100 text-orange-700" },
	high: { label: "High", classes: "bg-red-100 text-red-700" },
};

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
	const { label, classes } = PRIORITY_COLORS[priority];
	return (
		<span className={`px-2 py-1 rounded text-xs font-medium ${classes}`}>
			{label}
		</span>
	);
}

