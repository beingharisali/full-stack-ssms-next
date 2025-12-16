"use client";

import React from "react";
import { TicketFilters } from "@/services/ticket.api";

const statusOptions = [
	{ value: "", label: "All statuses" },
	{ value: "open", label: "Open" },
	{ value: "in-progress", label: "In Progress" },
	{ value: "resolved", label: "Resolved" },
];

const priorityOptions = [
	{ value: "", label: "All priorities" },
	{ value: "low", label: "Low" },
	{ value: "medium", label: "Medium" },
	{ value: "high", label: "High" },
];

interface TicketFiltersProps {
	filters: TicketFilters;
	onChange: (next: TicketFilters) => void;
}

export function TicketFiltersForm({ filters, onChange }: TicketFiltersProps) {
	const update = (key: keyof TicketFilters, value: string) => {
		onChange({ ...filters, [key]: value || undefined, page: 1 });
	};

	return (
		<div className="flex flex-wrap gap-4 items-end">
			<div>
				<label className="block text-sm text-gray-600">Search</label>
				<input
					className="border rounded px-3 py-2 text-sm"
					placeholder="Search title or desc"
					value={filters.search ?? ""}
					onChange={(e) => update("search", e.target.value)}
				/>
			</div>

			<div>
				<label className="block text-sm text-gray-600">Status</label>
				<select
					className="border rounded px-3 py-2 text-sm"
					value={filters.status ?? ""}
					onChange={(e) => update("status", e.target.value)}>
					{statusOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className="block text-sm text-gray-600">Priority</label>
				<select
					className="border rounded px-3 py-2 text-sm"
					value={filters.priority ?? ""}
					onChange={(e) => update("priority", e.target.value)}>
					{priorityOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className="block text-sm text-gray-600">Sort</label>
				<select
					className="border rounded px-3 py-2 text-sm"
					value={filters.sort ?? "latest"}
					onChange={(e) => update("sort", e.target.value)}>
					<option value="latest">Latest</option>
					<option value="priority">Priority</option>
				</select>
			</div>
		</div>
	);
}

