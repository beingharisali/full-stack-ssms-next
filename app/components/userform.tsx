"use client";

import React, { useState } from "react";

export default function UserForm() {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    desc: "",
    price: "",
    priority: "",
    status: "",
    createdBy: "",
    assignedTo: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  }

  return (
    <div className="min-h-screen bg-[#1E2939] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#F3F4F6] rounded-xl shadow-xl p-8 space-y-6 border border-[#E5E7EB]"
      >
        <h2 className="text-2xl font-semibold text-[#1E2939] text-center">
          Create New Record
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
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block text-[#1E2939] font-medium mb-1">Price</label>
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
          <input
            type="text"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            placeholder="Low / Medium / High"
            className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E2939]"
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="block text-[#1E2939] font-medium mb-1">Status</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="Pending / Completed / In Progress"
            className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E2939]"
          />
        </div>

        {/* CREATED BY */}
        <div>
          <label className="block text-[#1E2939] font-medium mb-1">
            Created By
          </label>
          <input
            type="text"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            placeholder="Creator name"
            className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E2939]"
          />
        </div>

        {/* ASSIGNED TO */}
        <div>
          <label className="block text-[#1E2939] font-medium mb-1">
            Assigned To
          </label>
          <input
            type="text"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            placeholder="Assigned person"
            className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E2939]"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-[#1E2939] text-white rounded-lg font-semibold hover:bg-[#26354A] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
