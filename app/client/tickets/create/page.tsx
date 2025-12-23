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
      <div className="max-w-5xl mx-auto ">
        <div className="rounded-xl shadow-lg border border-slate-200 bg-white p-7 ">
          <div className="px-9 py-8 border-b border-slate-200  text-center mb-4">
            <h2 className="text-3xl font-bold text-slate-800">
              {" "}
              Create Support Ticket
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Describe your issue and we'll help you resolve it
            </p>
          </div>
          <div className=" bg-slate-50 rounded-4xl w-200 ml-30 items-center ">
            <TicketForm onCreated={handleTicketCreated} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
