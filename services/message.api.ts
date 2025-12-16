import { http } from "./http";
import { TicketMessage } from "@/types/ticket";

export const messageAPI = {
  sendMessage: async (ticketId: string, content: string): Promise<{ message: TicketMessage }> => {
    const response = await http.post("/messages", { ticketId, content });
    return response.data;
  },

  getMessages: async (ticketId: string): Promise<{ messages: TicketMessage[] }> => {
    const response = await http.get(`/messages/${ticketId}`);
    return response.data;
  },

  getUnreadCount: async (): Promise<{ unreadCounts: Record<string, number> }> => {
    const response = await http.get("/messages/unread");
    return response.data;
  },
};