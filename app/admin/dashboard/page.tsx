"use client";

import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";
import TicketCard from "@/app/components/TicketCard";
import { useState } from "react";

interface Ticket {
  id: string;
  category: string;
  title: string;
  desc: string;
  price: number;
  priority: string;
  status: string;
  createdBy: string;
  assignedTo: string;
  createdAt: string;
}

export default function Page() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "1",
      category: "Hardware Issue",
      title: "Laptop not turning on",
      desc: "User reports laptop does not start after update.",
      price: 5000,
      priority: "High",
      status: "Pending",
      createdBy: "User123",
      assignedTo: "Agent A",
      createdAt: "2024-12-21",
    },
    {
      id: "2",
      category: "Account",
      title: "Password reset issue",
      desc: "User unable to reset account password.",
      price: 0,
      priority: "Medium",
      status: "In Progress",
      createdBy: "User456",
      assignedTo: "Agent B",
      createdAt: "2024-12-20",
    },
    {
      id: "3",
      category: "Software",
      title: "Application crashing",
      desc: "Software keeps crashing when opening large files.",
      price: 2000,
      priority: "Low",
      status: "Completed",
      createdBy: "User789",
      assignedTo: "",
      createdAt: "2024-12-19",
    },
  ]);

  const [sort, setSort] = useState("all");

  const handleUpdateStatus = (id: string, status: string) => {
    setTickets(tickets.map((ticket: Ticket) => 
      ticket.id === id ? { ...ticket, status } : ticket
    ));
  };

  const handleAssignAgent = (id: string, agent: string) => {
    setTickets(tickets.map((ticket: Ticket) => 
      ticket.id === id ? { ...ticket, assignedTo: agent } : ticket
    ));
  };


  const filteredTickets = tickets.filter((ticket: Ticket) => {
    if (sort === "all") return true;
    if (sort === "agent") return ticket.assignedTo !== "";
    if (sort === "priority") return ticket.priority === "High";
    if (sort === "status") return ticket.status === "Pending";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#060C19] text-white">
      <Nav />

       <div className="text-center py-10">
  <h1 className="text-4xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
    Admin Dashboard
  </h1>

  <p className="text-gray-400 mt-2 text-sm md:text-base">
    Monitor, sort, and manage all support tickets in one place.
  </p>
</div>

      <div className="max-w-7xl mx-auto px-4 md:flex gap-6 pb-20">
        {/* LEFT SIDEBAR */}
        <aside className="md:w-64 bg-[#0D1628] rounded-2xl p-5 h-max shadow-lg mb-6 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Sort By</h2>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full bg-[#111B30] border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Tickets</option>
            <option value="agent">Assigned To Agent</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </aside>

        {/* RIGHT SECTION */}
        <main className="flex-1 space-y-6">
          <h2 className="text-xl font-semibold mb-4">All Tickets ({filteredTickets.length})</h2>

          {filteredTickets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No tickets found.</p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <TicketCard 
                key={ticket.id} 
                ticket={ticket} 
                onUpdateStatus={handleUpdateStatus}
                onAssignAgent={handleAssignAgent}
                isEditable={true}
                showAssign={true}
              />
            ))
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}