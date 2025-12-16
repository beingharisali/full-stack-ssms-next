"use client";

import { useAuthContext } from "@/context/AuthContext";
import { NotificationBell } from "../notifications/NotificationBell";
import { useState } from "react";

export function Header() {
	const { user, logoutUser } = useAuthContext();
	const [showUserMenu, setShowUserMenu] = useState(false);

	return (
		<header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-3">
							<div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-sm">S</span>
							</div>
							<div>
								<h1 className="text-xl font-bold text-gray-900">SSMS</h1>
								<p className="text-xs text-gray-500 hidden sm:block">Support Management</p>
							</div>
						</div>
					</div>
					
					<div className="flex items-center space-x-3">
						<NotificationBell />
						
						<div className="relative">
							<button
								onClick={() => setShowUserMenu(!showUserMenu)}
								className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
								<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
									<span className="text-white font-medium text-sm">
										{user?.firstName?.[0]}{user?.lastName?.[0]}
									</span>
								</div>
								<div className="hidden md:block text-left">
									<p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
									<p className="text-xs text-gray-500 capitalize">{user?.role}</p>
								</div>
								<svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
								</svg>
							</button>
							
							{showUserMenu && (
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
									<div className="px-4 py-2 border-b border-gray-100">
										<p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
										<p className="text-xs text-gray-500">{user?.email}</p>
									</div>
									<button
										onClick={() => {
											logoutUser();
											setShowUserMenu(false);
										}}
										className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
										Sign out
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}