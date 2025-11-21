import { useTickets } from '@/lib/hooks/useTickets';
import React, { useState } from 'react'

function page() {
const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const { data, loading } = useTickets(page, limit, status, search);

  return (
    <div className="mt-4 flex gap-3">
        <button
          className="border px-4 py-2 rounded disabled:opacity-50"
          disabled={!data?.hasPrevPage}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <button
          className="border px-4 py-2 rounded disabled:opacity-50"
          disabled={!data?.hasNextPage}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
  )
};

export default page
