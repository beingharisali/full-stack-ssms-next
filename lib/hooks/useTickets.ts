import { useEffect, useState } from "react";

export const useTickets = (page: number, limit: number, status: string, search: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/ticket/tickets?page=${page}&limit=${limit}&status=${status}&search=${search}`
        );
        const json = await res.json();
        setData(json); // json MUST contain docs, hasNextPage, hasPrevPage etc.
      } catch (err) {
        console.log("Error fetching tickets", err);
      }
      setLoading(false);
    };

    fetchTickets();
  }, [page, limit, status, search]);

  return { data, loading };
};
