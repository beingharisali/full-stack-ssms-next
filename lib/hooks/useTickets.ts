import { useEffect, useState } from "react";
import  {useTickets } from "../hooks/useTickets";
import { TicketsResponse, TicketStatus } from "../types/ticket";

export function useTickets(
  page: number,
  limit: number,
  status: TicketStatus | "all",
  search: string
) {
  const [data, setData] = useState<TicketsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      setLoading(true);

      const res = await api.get<TicketsResponse>("/tickets", {
        params: { page, limit, status, search },
      });

      setData(res.data);
      setLoading(false);
    }

    fetchTickets();
  }, [page, limit, status, search]);

  return { data, loading };
}
