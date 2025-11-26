"use client";

import React, { useState } from "react";

interface TicketFormData {
  category: string;
  title: string;
  desc: string;
  price: string;
  priority: string;
}

interface TicketFormProps {
  onSubmit: (data: TicketFormData) => void;
}

export default function TicketForm({ onSubmit }: TicketFormProps) {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    desc: "",
    price: "",
    priority: "Medium",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: typeof formData) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submission
    setFormData({
      category: "",
      title: "",
      desc: "",
      price: "",
      priority: "Medium",
    });
  };



  return (
    <div className="min-h-screen bg-[#1E2939] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#F3F4F6] rounded-xl shadow-xl p-8 space-y-6 border border-[#E5E7EB]"
      >
        <h2 className="text-2xl font-semibold text-[#1E2939] text-center">
          Create New Ticket
        </h2>

        {/* CATEGORY */}
        <div>
          <label className="block text-[#1E2939] font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E2939]"
            required
          />
        </div>

        {/* TITLE */}
        <div>
          <label className="block text-[#1E2939] font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E2939]"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-[#1E2939] font-medium mb-1">
            Description
          </label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full px-4 py-2 h-28 rounded-lg border border-[#E5E7EB] resize-none focus:outline-none focus:ring-2 focus:ring-[#1E2939]"
            required
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block text-[#1E2939] font-medium mb-1">Price (PKR)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E2939]"
          />
        </div>

        {/* PRIORITY */}
        <div>
          <label className="block text-[#1E2939] font-medium mb-1">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E2939]"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-[#1E2939] text-white rounded-lg font-semibold hover:bg-[#26354A] transition"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
}