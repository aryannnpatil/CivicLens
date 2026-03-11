import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import CitizenReportPage from './pages/CitizenReportPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    const [view, setView] = useState('citizen'); // 'citizen' | 'admin'

    return (
        <BrowserRouter>
            <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
            {/* Hardcoded View Toggle — No Auth */}
            <div className="fixed top-5 right-6 z-50 flex liquid-glass rounded-xl overflow-hidden">
                <button
                    onClick={() => setView('citizen')}
                    className={`px-5 py-2.5 text-sm font-medium transition-colors ${view === 'citizen'
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-slate-600 hover:bg-white/60'
                        }`}
                >
                    🏠 Citizen
                </button>
                <button
                    onClick={() => setView('admin')}
                    className={`px-5 py-2.5 text-sm font-medium transition-colors ${view === 'admin'
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-slate-600 hover:bg-white/60'
                        }`}
                >
                    🛡️ Admin
                </button>
            </div>

            {/* Conditional Rendering based on toggle */}
            {view === 'citizen' ? <CitizenReportPage /> : <AdminDashboard />}
        </BrowserRouter>
    );
}

export default App;
