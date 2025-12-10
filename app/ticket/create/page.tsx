"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function CreateTicketPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    category: "",
    title: "",
    price:"",
    priority:"",
    desc: "",
    status: "open",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    
  }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
// // console.log({...form})
//   }
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
    // console.log("Sending form:", form);

    await Create(form);

    alert("Ticket created successfully!");
    router.push("/ticket/table");

  } catch (error: any) {
    // console.error("Error:", error);

    const message =
      error?.response?.data?.message || "Failed to create ticket";

    alert(message);
  }
}

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Create Ticket</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-4">

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
         <input
          name="price"
          placeholder="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
          <input
          name="priority"
          placeholder="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          name="desc"
          placeholder="Description"
          value={form.desc}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          rows={4}
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create Ticket
        </button>
      </form>
    </div>
  );
}
function Create(form: { category: string; title: string; price: string; priority: string; desc: string; status: string; }) {
    // throw new Error("Function not implemented.");
}

