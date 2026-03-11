/**
 * AdminDashboard — Member 1 (Phase 1 + Phase 2)
 *
 * Features:
 * ✅ Stats cards (total / open / in-progress / resolved)
 * ✅ Sortable & filterable ticket table (severity, status, category, date)
 * ✅ Heatmap map — markers colour-coded by severity score
 * ✅ Ticket detail modal — image, mini-map, status update dropdown
 * ✅ Auto-refresh every 15 seconds
 * ✅ Designed for 1280 px+ desktop layout
 */
import { useState, useEffect, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import MapView, { severityColor } from '../components/MapView';
import { getTickets, getStats, updateTicketStatus } from '../services/api';

// ─── Constants ───────────────────────────────────────────────────────────────

const CAT_ICON = {
    pothole: '🕳️',
    garbage: '🗑️',
    broken_streetlight: '💡',
    waterlogging: '💧',
    other: '⚠️',
    unclassified: '❓',
};

const SEV_CLASS = (s) => {
    if (s >= 8) return 'bg-red-100 text-red-700 border-red-200';
    if (s >= 6) return 'bg-orange-100 text-orange-700 border-orange-200';
    if (s >= 4) return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-green-100 text-green-700 border-green-200';
};

const STATUS_CLASS = {
    open: 'bg-red-100 text-red-700',
    in_progress: 'bg-amber-100 text-amber-700',
    resolved: 'bg-green-100 text-green-700',
};

const REFRESH_MS = 15_000;

// ─── AdminDashboard ───────────────────────────────────────────────────────────

function AdminDashboard() {
    const [tickets, setTickets] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [filters, setFilters] = useState({
        status: '',
        category: '',
        sort: '-severityScore',
    });

    // ── Data fetching ──
    const fetchAll = useCallback(async () => {
        try {
            const params = {};
            if (filters.status)   params.status   = filters.status;
            if (filters.category) params.category = filters.category;
            if (filters.sort)     params.sort     = filters.sort;

            const [ticketsRes, statsRes] = await Promise.all([
                getTickets(params),
                getStats(),
            ]);
            setTickets(ticketsRes.data?.data ?? []);
            setStats(statsRes.data?.data ?? null);
        } catch (err) {
            console.error('Dashboard fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        setLoading(true);
        fetchAll();
    }, [fetchAll]);

    // Auto-refresh every 15 s
    useEffect(() => {
        const timer = setInterval(fetchAll, REFRESH_MS);
        return () => clearInterval(timer);
    }, [fetchAll]);

    // ── Status update ──
    const handleStatusChange = async (id, newStatus) => {
        setUpdatingStatus(true);
        try {
            await updateTicketStatus(id, newStatus);
            setTickets((prev) =>
                prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t)),
            );
            if (selectedTicket?._id === id) {
                setSelectedTicket((prev) => ({ ...prev, status: newStatus }));
            }
            toast.success('Status updated!');
        } catch {
            toast.error('Failed to update status.');
        } finally {
            setUpdatingStatus(false);
        }
    };

    // ── Map markers (memoised to prevent excessive re-renders) ──
    const mapMarkers = useMemo(
        () =>
            tickets
                .filter((t) => t.location?.coordinates?.length === 2)
                .map((t) => ({
                    lng: t.location.coordinates[0],
                    lat: t.location.coordinates[1],
                    severity: t.severityScore,
                    popup: `
                        <div style="font-size:12px;line-height:1.5">
                            <strong>${CAT_ICON[t.aiCategory] ?? '⚠️'} ${(t.aiCategory ?? '').replace('_', ' ')}</strong><br/>
                            Severity: <strong>${t.severityScore}/10</strong><br/>
                            Status: ${(t.status ?? '').replace('_', ' ')}
                        </div>`,
                    onClick: () => setSelectedTicket(t),
                })),
        [tickets],
    );

    // ─── Render ───
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100">

            {/* ── Header ── */}
            <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 pt-16 sticky top-0 z-10">
                <div className="flex items-center justify-between max-w-[1600px] mx-auto">
                    <div>
                        <h1 className="text-xl font-bold text-white">🛡️ Admin Dashboard</h1>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Auto-refreshes every 15 s — {tickets.length} ticket{tickets.length !== 1 ? 's' : ''} loaded
                        </p>
                    </div>
                    <button
                        onClick={fetchAll}
                        className="text-xs px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
                    >
                        ↻ Refresh now
                    </button>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto p-6 space-y-6">

                {/* ── Stats Cards ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="Total"       value={stats?.total                  ?? '—'} icon="📊" accent="border-blue-500" />
                    <StatCard label="Open"        value={stats?.byStatus?.open         ?? '—'} icon="🔴" accent="border-red-500" />
                    <StatCard label="In Progress" value={stats?.byStatus?.in_progress  ?? '—'} icon="🟡" accent="border-amber-500" />
                    <StatCard label="Resolved"    value={stats?.byStatus?.resolved     ?? '—'} icon="🟢" accent="border-green-500" />
                </div>

                {/* ── Main content: Table + Map ── */}
                <div className="flex flex-col xl:flex-row gap-6">

                    {/* ── Left — Filters + Table ── */}
                    <div className="flex-1 min-w-0 space-y-4">

                        {/* Filter bar */}
                        <div className="flex flex-wrap items-center gap-3 bg-gray-900 p-4 rounded-xl border border-gray-800">
                            <FilterSelect
                                value={filters.status}
                                onChange={(v) => setFilters((f) => ({ ...f, status: v }))}
                                label="Status"
                            >
                                <option value="">All Statuses</option>
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                            </FilterSelect>

                            <FilterSelect
                                value={filters.category}
                                onChange={(v) => setFilters((f) => ({ ...f, category: v }))}
                                label="Category"
                            >
                                <option value="">All Categories</option>
                                <option value="pothole">🕳️ Pothole</option>
                                <option value="garbage">🗑️ Garbage</option>
                                <option value="broken_streetlight">💡 Streetlight</option>
                                <option value="waterlogging">💧 Waterlogging</option>
                                <option value="other">⚠️ Other</option>
                            </FilterSelect>

                            <FilterSelect
                                value={filters.sort}
                                onChange={(v) => setFilters((f) => ({ ...f, sort: v }))}
                                label="Sort"
                            >
                                <option value="-severityScore">↓ Severity (High first)</option>
                                <option value="severityScore">↑ Severity (Low first)</option>
                                <option value="-createdAt">↓ Newest first</option>
                                <option value="createdAt">↑ Oldest first</option>
                            </FilterSelect>

                            {(filters.status || filters.category) && (
                                <button
                                    onClick={() => setFilters({ status: '', category: '', sort: '-severityScore' })}
                                    className="text-xs text-gray-400 hover:text-white underline ml-auto"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>

                        {/* Ticket table */}
                        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                            {loading ? (
                                <TableSkeleton />
                            ) : tickets.length === 0 ? (
                                <EmptyState />
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-800 text-xs text-gray-400 uppercase tracking-wide bg-gray-800/50">
                                                <th className="px-4 py-3 text-left w-16">Sev.</th>
                                                <th className="px-4 py-3 text-left">Category</th>
                                                <th className="px-4 py-3 text-left">Status</th>
                                                <th className="px-4 py-3 text-left">Description</th>
                                                <th className="px-4 py-3 text-left whitespace-nowrap">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800">
                                            {tickets.map((t) => (
                                                <tr
                                                    key={t._id}
                                                    onClick={() => setSelectedTicket(t)}
                                                    className="hover:bg-gray-800/60 cursor-pointer transition-colors"
                                                >
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold border ${SEV_CLASS(t.severityScore)}`}
                                                        >
                                                            {t.severityScore}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 font-medium text-gray-200">
                                                        {CAT_ICON[t.aiCategory]}{' '}
                                                        {(t.aiCategory ?? 'unknown').replace('_', ' ')}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_CLASS[t.status] ?? 'bg-gray-700 text-gray-300'}`}
                                                        >
                                                            {(t.status ?? '').replace('_', ' ')}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-400 max-w-[220px] truncate">
                                                        {t.description || '—'}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">
                                                        {new Date(t.createdAt).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Right — Heatmap ── */}
                    <div className="xl:w-[420px] shrink-0">
                        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden sticky top-28">
                            <div className="px-4 py-3 border-b border-gray-800">
                                <h2 className="text-sm font-semibold text-gray-300">🗺️ Issue Heatmap</h2>
                                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mt-1.5">
                                    <LegendDot color="#dc2626" label="Critical (8–10)" />
                                    <LegendDot color="#f97316" label="High (6–7)" />
                                    <LegendDot color="#f59e0b" label="Medium (4–5)" />
                                    <LegendDot color="#22c55e" label="Low (1–3)" />
                                </div>
                            </div>
                            <div className="h-[500px]">
                                <MapView
                                    center={[78.9629, 20.5937]}
                                    zoom={4}
                                    markers={mapMarkers}
                                    interactive
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Ticket Detail Modal ── */}
            {selectedTicket && (
                <TicketModal
                    ticket={selectedTicket}
                    onClose={() => setSelectedTicket(null)}
                    onStatusChange={handleStatusChange}
                    isUpdating={updatingStatus}
                />
            )}
        </div>
    );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, icon, accent }) {
    return (
        <div className={`bg-gray-900 border border-gray-800 border-l-4 ${accent} rounded-xl p-4`}>
            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                    {label}
                </span>
                <span className="text-lg">{icon}</span>
            </div>
            <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
    );
}

function FilterSelect({ value, onChange, children }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="text-sm bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
        >
            {children}
        </select>
    );
}

function LegendDot({ color, label }) {
    return (
        <span className="flex items-center gap-1">
            <span
                className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: color }}
            />
            {label}
        </span>
    );
}

function TableSkeleton() {
    return (
        <div className="p-6 space-y-3 animate-pulse">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-800 rounded-lg" />
            ))}
        </div>
    );
}

function EmptyState() {
    return (
        <div className="p-12 text-center text-gray-500">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-medium">No tickets match your filters</p>
            <p className="text-xs mt-1">Try clearing the filters or refreshing</p>
        </div>
    );
}

// ─── TicketModal ──────────────────────────────────────────────────────────────

function TicketModal({ ticket, onClose, onStatusChange, isUpdating }) {
    const [status, setStatus] = useState(ticket.status);

    const hasCoords = ticket.location?.coordinates?.length === 2;
    const [lng, lat] = hasCoords ? ticket.location.coordinates : [null, null];

    const miniMarkers = hasCoords
        ? [{ lng, lat, severity: ticket.severityScore }]
        : [];

    const handleSave = () => {
        if (status !== ticket.status) onStatusChange(ticket._id, status);
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal header */}
                <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-gray-900 rounded-t-2xl z-10">
                    <h2 className="font-bold text-white">
                        {CAT_ICON[ticket.aiCategory]} Ticket Detail
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-xl leading-none transition-colors"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* Photo */}
                {ticket.photoUrl && (
                    <div className="h-52 bg-gray-800">
                        <img
                            src={ticket.photoUrl}
                            alt="Reported issue"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="p-5 space-y-5">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-bold border ${SEV_CLASS(ticket.severityScore)}`}
                        >
                            Severity {ticket.severityScore}/10
                        </span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_CLASS[ticket.status] ?? 'bg-gray-700 text-gray-300'}`}
                        >
                            {(ticket.status ?? '').replace('_', ' ')}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs bg-gray-700 text-gray-300">
                            {((ticket.aiConfidence ?? 0) * 100).toFixed(0)}% confidence
                        </span>
                    </div>

                    {/* Category */}
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Category</p>
                        <p className="text-white font-medium capitalize">
                            {CAT_ICON[ticket.aiCategory]}{' '}
                            {(ticket.aiCategory ?? 'unknown').replace('_', ' ')}
                        </p>
                    </div>

                    {/* Description */}
                    {ticket.description && (
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                Description
                            </p>
                            <p className="text-gray-200 text-sm leading-relaxed">
                                {ticket.description}
                            </p>
                        </div>
                    )}

                    {/* Mini map */}
                    {hasCoords && (
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                                Location
                            </p>
                            <div className="h-40 rounded-xl overflow-hidden border border-gray-700">
                                <MapView
                                    center={[lng, lat]}
                                    zoom={14}
                                    markers={miniMarkers}
                                    interactive={false}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {lat.toFixed(5)}, {lng.toFixed(5)}
                            </p>
                        </div>
                    )}

                    {/* Status update */}
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                            Update Status
                        </p>
                        <div className="flex gap-2">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="flex-1 text-sm bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                            >
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                            </select>
                            <button
                                onClick={handleSave}
                                disabled={isUpdating || status === ticket.status}
                                className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
                            >
                                {isUpdating ? '…' : 'Save'}
                            </button>
                        </div>
                    </div>

                    {/* Timestamp */}
                    <p className="text-xs text-gray-600">
                        Reported {new Date(ticket.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;

