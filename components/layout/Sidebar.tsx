"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";

export function Sidebar() {
	const { user } = useAuthContext();
	const pathname = usePathname();
	const [collapsed, setCollapsed] = useState(false);

	const getMenuItems = () => {
		switch (user?.role) {
			case "admin":
				return [
					{ href: "/admin/dashboard", label: "Dashboard", icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" },
					{ href: "/admin/agents", label: "Agents", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" },
					{ href: "/admin/tickets/create", label: "Create Ticket", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6" },
					{ href: "/admin/users", label: "All Users", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
				];
			case "agent":
				return [
					{ href: "/agent/dashboard", label: "Dashboard", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" },
					{ href: "/agent/activity", label: "Activity", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
					{ href: "/agent/tickets/all", label: "All Tickets", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
				];
			case "client":
				return [
					{ href: "/client/dashboard", label: "My Tickets", icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" },
					{ href: "/client/tickets/create", label: "New Ticket", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6" },
				];
			default:
				return [];
		}
	};

	const menuItems = getMenuItems();

	return (
		<aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} min-h-screen flex flex-col`}>
			<div className="p-4 border-b border-gray-200">
				<div className="flex items-center justify-between">
					{!collapsed && (
						<h2 className="text-lg font-semibold text-gray-900">
							{user?.role === "admin" ? "Admin" : 
							 user?.role === "agent" ? "Agent" : "Client"}
						</h2>
					)}
					<button
						onClick={() => setCollapsed(!collapsed)}
						className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
						<svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
						</svg>
					</button>
				</div>
			</div>
			
			<nav className="flex-1 p-4 space-y-2">
				{menuItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className={`group flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
							pathname === item.href
								? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
								: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
						}`}
						title={collapsed ? item.label : undefined}>
						<svg className={`w-5 h-5 ${collapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
						</svg>
						{!collapsed && (
							<span className="font-medium">{item.label}</span>
						)}
					</Link>
				))}
			</nav>
		</aside>
	);
}