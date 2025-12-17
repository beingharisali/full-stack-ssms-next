"use client";

import React, { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";

interface NotificationBarItem {
  id: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  duration?: number;
}

export function NotificationBar() {
  const { socket } = useSocket();
  const [notifications, setNotifications] = useState<NotificationBarItem[]>([]);

  useEffect(() => {
    if (!socket) return;

    const addNotification = (message: string, type: NotificationBarItem["type"] = "info", duration = 5000) => {
      const id = Date.now().toString();
      const notification: NotificationBarItem = { id, message, type, duration };
      
      setNotifications(prev => [...prev, notification]);
      
      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }
    };

    const handleNewNotification = (data: any) => {
      addNotification(`New message on ticket ${data.ticketId}`, "info");
    };

    const handleTicketCreated = (data: any) => {
      addNotification(`New ticket "${data.ticket.title}" created`, "success");
    };

    const handleTicketAssigned = (data: any) => {
      addNotification(`Ticket "${data.ticket.title}" has been assigned`, "info");
    };

    const handleTicketUpdated = (data: any) => {
      addNotification(`Ticket "${data.ticket.title}" has been updated`, "warning");
    };

    const handleTicketDeleted = (data: any) => {
      addNotification(`Ticket has been deleted`, "error");
    };

    socket.on("notification:new", handleNewNotification);
    socket.on("ticket:created", handleTicketCreated);
    socket.on("ticket:assigned", handleTicketAssigned);
    socket.on("ticket:updated", handleTicketUpdated);
    socket.on("ticket:deleted", handleTicketDeleted);

    return () => {
      socket.off("notification:new", handleNewNotification);
      socket.off("ticket:created", handleTicketCreated);
      socket.off("ticket:assigned", handleTicketAssigned);
      socket.off("ticket:updated", handleTicketUpdated);
      socket.off("ticket:deleted", handleTicketDeleted);
    };
  }, [socket]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case "warning":
        return (
          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case "error":
        return (
          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`border rounded-lg p-4 shadow-lg transition-all duration-300 ease-in-out transform ${getNotificationStyles(notification.type)}`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">
                {notification.message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={() => removeNotification(notification.id)}
                className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}