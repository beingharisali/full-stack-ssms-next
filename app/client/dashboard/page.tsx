"use client";

import { useState } from "react";
import Link from "next/link";
import { TicketTable } from "@/components/tickets/TicketTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoleGuard } from "@/components/auth/RoleGuard";

export default function ClientDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <RoleGuard allowedRoles={["client"]}>
      <DashboardLayout>
        <div>
          <div className="space-y-8 bg-slate-50">
            {/* Welcome Section */}
            <div className=" rounded-2xl text-white p-6 sm:p-9 bg-linear-to-r from-slate-800 to-blue-700">
              <div className="text-center">
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold mb-2">
                    Client Dashboard
                  </h1>
                  <p className="text-white text-sm sm:text-base">
                    Create tickets, track progress, and get help from our
                    support team.
                  </p>
                </div>
              </div>
            </div>

            {/* Tickets Section */}
            <div className=" rounded-xl shadow-sm border bg-white border-slate-200">
              <div className="p-6">
                <TicketTable
                  mode="client"
                  refreshKey={refreshKey}
                  viewType="card"
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}
