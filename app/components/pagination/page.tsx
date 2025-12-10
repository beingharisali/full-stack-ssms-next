"use client";

const Pagination = ({ page, setPage, data }: any) => {
  return (
    <div className="mt-4 flex gap-3">
      <button
        className="border px-4 py-2 rounded disabled:opacity-50"
        disabled={!data?.hasPrevPage}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span className="px-4 py-2">
        Page {data?.page} of {data?.totalPages}
      </span>

      <button
        className="border px-4 py-2 rounded disabled:opacity-50"
        disabled={!data?.hasNextPage}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
