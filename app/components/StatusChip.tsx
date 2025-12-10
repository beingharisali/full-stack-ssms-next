import React from "react";

type TicketStatus = "open" | "in_progress" | "resolved";

export const StatusChip = ({ status }: { status: TicketStatus }) => {
  const styles: Record<TicketStatus, string> = {
    open: "bg-red-100 text-red-700",
    in_progress: "bg-yellow-100 text-yellow-700",
    resolved: "bg-green-100 text-green-700",
  };

  const labels: Record<TicketStatus, string> = {
    open: "Open",
    in_progress: "In Progress",
    resolved: "Resolved",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};
