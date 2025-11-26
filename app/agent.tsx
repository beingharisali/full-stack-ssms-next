import React, { useEffect, useState } from "react";
import { connectSocket } from "../utils/socket";
import TicketCard from "../components/TicketCard";

interface Ticket {
  id: string;
  title: string;
  status: string;
}

const AgentDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const socket = connectSocket();

    socket.on("ticketAssigned", (ticket: Ticket) => {
      setTickets((prev) => [...prev, ticket]);
    });

    socket.on("ticketUpdated", (updatedTicket: Ticket) => {
      setTickets((prev) =>
        prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t))
      );
    });

    return () => {
      socket.off("ticketAssigned");
      socket.off("ticketUpdated");
    };
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Agent Dashboard</h1>
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default AgentDashboard;
