export type TicketStatus = "open" | "in_progress" | "resolved";

export interface ticket  { 
    category: string,
      title: string,
       desc: string,
       priority:string,
       status: string,
       price:string,
        }
       export interface TicketsResponse {
  docs: ticket[];
  page: number;
  totalPages: number;
  totalDocs: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}