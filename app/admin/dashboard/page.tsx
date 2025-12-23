"use client";

import { useEffect, useState } from "react";
import { TicketTable } from "@/components/tickets/TicketTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { getTickets } from "@/services/ticket.api";
import { getAllUsers } from "@/services/auth.api";
import { TicketType } from "@/types/ticket";
import { UserSummary } from "@/types/user";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    inProgressTickets: 0,
    resolvedTickets: 0,
    totalAgents: 0,
    totalClients: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [ticketsData, usersData] = await Promise.all([
          getTickets(),
          getAllUsers(),
        ]);

        const tickets = ticketsData?.tickets || [];
        const users = usersData?.users || [];

        setStats({
          totalTickets: tickets.length,
          openTickets: tickets.filter((t: TicketType) => t.status === "open")
            .length,
          inProgressTickets: tickets.filter(
            (t: TicketType) => t.status === "in-progress"
          ).length,
          resolvedTickets: tickets.filter(
            (t: TicketType) => t.status === "resolved"
          ).length,
          totalAgents: users.filter((u: UserSummary) => u.role === "agent")
            .length,
          totalClients: users.filter((u: UserSummary) => u.role === "client")
            .length,
        });
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    };

    loadStats();
  }, []);

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <DashboardLayout>
        <div className='bg-slate-100 min-h-screen p-4 sm:p-6 space-y-8'>
          {/* Header */}
          <div className='bg-linear-to-r from-slate-800 to-indigo-700 rounded-2xl text-white p-6 sm:p-8 shadow'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <h1 className='text-2xl sm:text-3xl font-bold mb-2'>
                  Admin Dashboard
                </h1>
                <p className='text-slate-200 text-sm sm:text-base'>
                  Monitor system performance and manage support operations
                </p>
              </div>
              <span className='mt-4 sm:mt-0 text-sm font-medium text-emerald-300'>
                ● System Online
              </span>
            </div>
          </div>

          {/* KPI Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6'>
            <StatCard
              title='Total Tickets'
              value={stats.totalTickets}
              color='text-slate-900'
            />
            <StatCard
              title='Open Tickets'
              value={stats.openTickets}
              color='text-rose-600'
            />
            <StatCard
              title='In Progress'
              value={stats.inProgressTickets}
              color='text-amber-600'
            />
            <StatCard
              title='Resolved'
              value={stats.resolvedTickets}
              color='text-emerald-600'
            />
            <StatCard
              title='Total Agents'
              value={stats.totalAgents}
              color='text-indigo-600'
            />
            <StatCard
              title='Total Clients'
              value={stats.totalClients}
              color='text-sky-600'
            />
          </div>

          {/* Tickets Table */}
          <div className='bg-white rounded-xl shadow border border-slate-200'>
            <div className='px-6 py-4 border-b border-slate-200 bg-slate-50'>
              <h2 className='text-lg font-semibold text-slate-800'>
                All Support Tickets
              </h2>
              <p className='text-slate-500 text-sm mt-1'>
                Manage tickets, assign agents, and track progress
              </p>
            </div>
            <div className='p-6'>
              <TicketTable
                mode='admin'
                viewType='table'
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}

/* Reusable Stat Card */
function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition'>
      <p className='text-sm text-slate-500'>{title}</p>
      <p className={`text-2xl font-semibold ${color}`}>{value}</p>
    </div>
  );
}
