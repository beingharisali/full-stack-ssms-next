"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export function Sidebar() {
	const { user } = useAuthContext();
	const pathname = usePathname();

	const getMenuItems = () => {
		switch (user?.role) {
			case "admin":
				return [
					{ href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
					{ href: "/admin/agents", label: "Agents", icon: "🎧" },
					{ href: "/admin/tickets/create", label: "Create Ticket", icon: "➕" },
					{ href: "/admin/users", label: "All Users", icon: "👥" },
				];
			case "agent":
				return [
					{ href: "/agent/dashboard", label: "Dashboard", icon: "📈" },
					{ href: "/agent/activity", label: "Activity", icon: "⚡" },
					{ href: "/agent/tickets/all", label: "All Tickets", icon: "🎫" },
				];
			case "client":
				return [
					{ href: "/client/dashboard", label: "My Tickets", icon: "🎫" },
					{ href: "/client/tickets/create", label: "New Ticket", icon: "➕" },
				];
			default:
				return [];
		}
	};

	const menuItems = getMenuItems();

	return (
		<aside className="w-72 min-h-screen flex flex-col bg-slate-50 border-r border-slate-200 shadow-sm">
			<div className="p-6 border-b border-slate-200 bg-white">
				<div className="flex items-center space-x-3">
					<div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center shadow-md">
						<span className="text-white font-bold text-xl">S</span>
					</div>
					<div>
						<h2 className="text-2xl font-bold text-slate-900">SSMS</h2>
						<p className="text-sm text-slate-500 capitalize">{user?.role} Panel</p>
					</div>
				</div>
			</div>
			
			<nav className="flex-1 p-4 space-y-2">
				{menuItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.href}
							href={item.href}
							className={`group flex items-center px-4 py-3.5 rounded-lg transition-all duration-200 ${
								isActive
									? "bg-slate-800 text-white shadow-md"
									: "text-slate-700 hover:bg-white hover:shadow-sm"
							}`}>
							<span className="text-xl mr-3 flex-shrink-0">
								{item.icon}
							</span>
							<span className="font-medium text-sm">{item.label}</span>
						</Link>
					);
				})}
			</nav>

			<div className="p-4 border-t border-slate-200 bg-white">
				<div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
					<div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center shadow-sm">
						<span className="text-white font-semibold text-base">
							{user?.firstName?.[0]}{user?.lastName?.[0]}
						</span>
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-semibold text-slate-900 truncate">
							{user?.firstName} {user?.lastName}
						</p>
						<p className="text-xs text-slate-500 truncate">{user?.email}</p>
					</div>
				</div>
			</div>
		</aside>
	);
}