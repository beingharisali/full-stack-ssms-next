import React, { useState } from "react";

const AdminPage: React.FC = () => {
  const [title, setTitle] = useState("");

  const assignTicket = async () => {
    await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "ticketAssigned",
        ticket: { id: Date.now().toString(), title, status: "Assigned" },
      }),
    });
    setTitle("");
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ticket Title"
        className="border p-2 mr-2"
      />
      <button onClick={assignTicket} className="bg-blue-500 text-white p-2">
        Assign Ticket
      </button>
    </div>
  );
};

export default AdminPage;
