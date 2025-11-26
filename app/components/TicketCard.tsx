import React, { useState } from "react";

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

interface TicketCardProps {
  ticket: Ticket;
  onUpdateStatus?: (id: string, status: string) => void;
  onAssignAgent?: (id: string, agent: string) => void;
  isEditable?: boolean;
  showAssign?: boolean;
}

const TicketCard: React.FC<TicketCardProps> = ({ 
  ticket, 
  onUpdateStatus, 
  onAssignAgent,
  isEditable = false,
  showAssign = false
}) => {
  const [status, setStatus] = useState(ticket.status);
  const [assignedTo, setAssignedTo] = useState(ticket.assignedTo);
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    if (onUpdateStatus) {
      onUpdateStatus(ticket.id, newStatus);
    }
  };

  const handleAssignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAgent = e.target.value;
    setAssignedTo(newAgent);
    if (onAssignAgent) {
      onAssignAgent(ticket.id, newAgent);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-gray-600/30 text-gray-300";
      case "In Progress": return "bg-blue-600/20 text-blue-300";
      case "Completed": return "bg-green-600/20 text-green-300";
      default: return "bg-gray-600/30 text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-600/20 text-red-400";
      case "Medium": return "bg-yellow-600/20 text-yellow-300";
      case "Low": return "bg-green-600/20 text-green-300";
      default: return "bg-gray-600/30 text-gray-300";
    }
  };

  return (
    <div className="bg-[#0D1628] p-7 rounded-2xl shadow-xl border border-gray-800 hover:border-blue-500/40 transition-all">
      {/* TOP SECTION */}
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-2xl font-semibold">{ticket.title}</h3>
          <p className="text-sm text-gray-400 mt-1">
            Category: {ticket.category}
          </p>
        </div>

        {/* BADGES */}
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority}
          </span>

          {isEditable ? (
            <select
              value={status}
              onChange={handleStatusChange}
              className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-transparent border ${getStatusColor(status)}`}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          ) : (
            <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="mt-4 text-gray-300 leading-relaxed border-l-2 border-gray-700 pl-4">
        {ticket.desc}
      </p>

      {/* INFO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6 text-gray-300 text-sm">
        <div>
          <p className="font-semibold text-gray-400">Price</p>
          <p>{ticket.price} PKR</p>
        </div>

        <div>
          <p className="font-semibold text-gray-400">Created By</p>
          <p>{ticket.createdBy}</p>
        </div>

        {showAssign ? (
          <div>
            <p className="font-semibold text-gray-400">Assigned To</p>
            {isEditable ? (
              <select
                value={assignedTo}
                onChange={handleAssignChange}
                className="bg-[#111B30] border border-gray-700 rounded-lg p-1 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Unassigned</option>
                <option value="Agent A">Agent A</option>
                <option value="Agent B">Agent B</option>
                <option value="Agent C">Agent C</option>
              </select>
            ) : (
              <p>{ticket.assignedTo || "Unassigned"}</p>
            )}
          </div>
        ) : (
          <div>
            <p className="font-semibold text-gray-400">Assigned To</p>
            <p>{ticket.assignedTo || "Unassigned"}</p>
          </div>
        )}

        <div>
          <p className="font-semibold text-gray-400">Created At</p>
          <p>{ticket.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;