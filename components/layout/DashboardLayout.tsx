"use client";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<Header />
			<div className="flex flex-1">
				<Sidebar />
				<main className="flex-1 flex flex-col">
					<div className="flex-1 p-6">
						{children}
					</div>
					<Footer />
				</main>
			</div>
		</div>
	);
}