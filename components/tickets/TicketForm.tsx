"use client";

import React, { useState, useEffect } from "react";
import { createTicket, TicketFormPayload } from "@/services/ticket.api";
import { getAgents } from "@/services/agent";
import { AgentType } from "@/types/agent";
import { useAuthContext } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

interface TicketFormProps {
  onCreated?: () => void;
}

const defaultForm: Omit<TicketFormPayload, "files"> = {
  title: "",
  description: "",
  category: "",
  priority: "low",
  assignedTo: "",
};

export function TicketForm({ onCreated }: TicketFormProps) {
  const { user } = useAuthContext();
  const { pushToast } = useToast();
  const [form, setForm] = useState(defaultForm);
  const [files, setFiles] = useState<File[]>([]);
  const [agents, setAgents] = useState<AgentType[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const agentList = await getAgents();
        setAgents(agentList);
      } catch {}
    };
    loadAgents();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.category.trim()
    ) {
      pushToast("All fields are required", "error");
      return;
    }

    try {
      setSubmitting(true);
      await createTicket({ ...form, files });
      pushToast("Ticket created successfully", "success");
      setForm(defaultForm);
      setFiles([]);
      onCreated?.();
    } catch (err) {
      console.error("createTicket error", err);
      pushToast("Failed to create ticket", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl shadow-sm p-6 bg-white">
      <div className="flex items-center space-x-3 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Create New Ticket
          </h2>
          <p className="text-sm text-gray-800">
            Fill out the form below to submit your support request
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-9">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Ticket Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-colors"
              placeholder="Brief description of your issue"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              for="countries"
              class="block mb-2.5 text-sm font-medium text-heading"
            >
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-colors"
              required
            >
              <option value="Select a category" selected>
                Select a category
              </option>
              <option value="Technical">Technical Support</option>
              <option value="Billing">Billing & Payment</option>
              <option value="Account">Account Issues</option>
              <option value="Feature">Feature Request</option>
              <option value="Bug">Bug Report</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            for="message"
            class="block mb-2.5 text-sm font-medium text-heading"
          >
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="bg-neutral-secondary-medium border border-gray-200 rounded-2xl border-default-medium text-heading text-sm rounded-base focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-colors w-full p-3.5 shadow-xs placeholder:text-bodys"
            rows={5}
            placeholder="Please provide as much detail as possible about your issue..."
            required
          />
          <p className="text-xs text-gray-500">
            Minimum 10 characters required
          </p>
        </div>

        <div className="grid gap-6">
          {/* <div className="space-y-2"> */}
          <label className="block text-sm font-medium ">Priority Level</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-colors"
          >
            <option value="Select priority level" selected>
              Select priority level
            </option>
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🔴 High Priority</option>
          </select>
          {/* </div> */}
          {/* <div className="space-y-2"> */}
          <label className="block text-sm font-medium">
            Assign to Agent {user?.role !== "admin" && "(Optional)"}
          </label>
          <select
            name="assignedTo"
            value={form.assignedTo || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-colors"
          >
            <option value="Select an agent" selected>
              Select an agent
            </option>
            <option value="">Unassigned</option>
            {agents.map((agent) => (
              <option key={agent._id} value={agent._id}>
                {`${agent.firstName ?? ""} ${agent.lastName ?? ""}`.trim() ||
                  agent.name ||
                  agent.email}
              </option>
            ))}
          </select>
          {/* </div> */}
          {/* <div className="space-y-2"> */}
          <label
            className="block mb-2.5 text-sm font-medium text-heading"
            for="file_input"
          >
            Upload file
          </label>
          <div className="relative">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {/* </div> */}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {files.map((file, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {file.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            All fields marked with * are required
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-purple-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? <>Creating Ticket...</> : <>Create Ticket</>}
          </button>
        </div>
      </form>
    </div>
  );
}
