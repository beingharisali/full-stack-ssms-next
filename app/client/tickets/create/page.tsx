"use client";

import { useRouter } from "next/navigation";
import { TicketForm } from "@/components/tickets/TicketForm";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function ClientCreateTicket() {
	const router = useRouter();

	const handleTicketCreated = () => {
		router.push("/client/dashboard");
	};

	return (
		<DashboardLayout>
			<div className="max-w-4xl mx-auto">
				<div className="bg-white rounded-xl shadow-lg border border-gray-200">
					<div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
						<h2 className="text-xl font-bold text-gray-800">🎟️ Create Support Ticket</h2>
						<p className="text-gray-600 text-sm mt-1">Describe your issue and we'll help you resolve it</p>
					</div>
					<div className="p-6">
						<TicketForm onCreated={handleTicketCreated} />
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}