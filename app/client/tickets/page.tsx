"use client";

import { useState } from "react";
import Nav from "@/app/components/nav";
import Footer from "@/app/components/footer";
import TicketCard from "@/app/components/TicketCard";
import TicketForm from "@/app/components/TicketForm";

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

export default function ClientTicketsPage() {
  const [activeTab, setActiveTab] = useState<"create" | "view">("create");
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "1",
      category: "Hardware Issue",
      title: "Laptop not turning on",
      desc: "User reports laptop does not start after update.",
      price: 5000,
      priority: "High",
      status: "Pending",
      createdBy: "Client123",
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
      createdBy: "Client123",
      assignedTo: "Agent B",
      createdAt: "2024-12-20",
    },
  ]);

  const handleCreateTicket = (data: any) => {
    const newTicket: Ticket = {
      id: (tickets.length + 1).toString(),
      category: data.category,
      title: data.title,
      desc: data.desc,
      price: parseInt(data.price) || 0,
      priority: data.priority,
      status: "Pending",
      createdBy: "Client123",
      assignedTo: "",
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setTickets([newTicket, ...tickets]);
    alert("Ticket created successfully!");
  };


  const clientTickets = tickets.filter((ticket: Ticket) => ticket.createdBy === "Client123");

  return (
    <div className="min-h-screen bg-[#060C19] text-white">
      <Nav />
      
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
          Client Tickets
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Create new tickets or view your existing ones
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* TABS */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            className={`py-3 px-6 font-medium text-sm md:text-base ${
              activeTab === "create"
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("create")}
          >
            Create Ticket
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm md:text-base ${
              activeTab === "view"
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("view")}
          >
            My Tickets
          </button>
        </div>

        {/* TAB CONTENT */}
        {activeTab === "create" ? (
          <TicketForm onSubmit={handleCreateTicket} />
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">My Tickets ({clientTickets.length})</h2>
            
            {clientTickets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">You haven't created any tickets yet.</p>
              </div>
            ) : (
              clientTickets.map((ticket) => (
                <TicketCard 
                  key={ticket.id} 
                  ticket={ticket} 
                />
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}