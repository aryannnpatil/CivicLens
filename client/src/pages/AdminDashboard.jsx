/**
 * AdminDashboard — TODO: Member 1
 *
 * Features to build:
 * - Ticket table (sortable by severity, filterable by status & category)
 * - Ticket detail modal (image, map pin, status update dropdown)
 * - Map with heatmap layer (markers colored by severity)
 * - Dashboard stats cards (total, open, in_progress, resolved)
 * - Auto-refresh every 15s via React Query or setInterval
 */

function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-center p-8">
                <h1 className="text-3xl font-bold text-white mb-4">🛡️ Admin Dashboard</h1>
                <p className="text-gray-400">Member 1 — Build the admin dashboard here.</p>
            </div>
        </div>
    );
}

export default AdminDashboard;
