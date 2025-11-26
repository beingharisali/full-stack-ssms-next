"use client";

import { useState } from "react";
import Nav from "@/app/components/nav";
import Footer from "@/app/components/footer";
import TicketCard from "@/app/components/TicketCard";

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

export default function AgentTicketsPage() {
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
      assignedTo: "Agent A",
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
      assignedTo: "Agent B",
      createdAt: "2024-12-19",
    },
  ]);

  const handleUpdateStatus = (id: string, status: string) => {
    setTickets(tickets.map((ticket: Ticket) => 
      ticket.id === id ? { ...ticket, status } : ticket
    ));
  };


  const agentTickets = tickets.filter((ticket: Ticket) => ticket.assignedTo === "Agent A");

  return (
    <div className="min-h-screen bg-[#060C19] text-white">
      <Nav />
      
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
          Agent Dashboard
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Manage your assigned tickets and update their status
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">My Assigned Tickets ({agentTickets.length})</h2>
          
          {agentTickets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">You don't have any assigned tickets.</p>
            </div>
          ) : (
            agentTickets.map((ticket) => (
              <TicketCard 
                key={ticket.id} 
                ticket={ticket} 
                onUpdateStatus={handleUpdateStatus}
                isEditable={true}
              />
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}