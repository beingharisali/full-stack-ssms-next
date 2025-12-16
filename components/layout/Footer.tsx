export function Footer() {
	return (
		<footer className="bg-white border-t border-gray-200 py-6 mt-auto">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
					<div className="flex items-center space-x-4">
						<div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-sm">S</span>
						</div>
						<div>
							<h3 className="text-sm font-semibold text-gray-900">Support Management System</h3>
							<p className="text-xs text-gray-500">Professional ticket management solution</p>
						</div>
					</div>
					<div className="flex items-center space-x-6 text-xs text-gray-500">
						<span>© 2024 SSMS</span>
						<span className="hidden sm:inline">•</span>
						<span>Version 1.0.0</span>
						<span className="hidden sm:inline">•</span>
						<span className="flex items-center space-x-1">
							<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
							<span>System Online</span>
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}