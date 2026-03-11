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
            <div className="fixed top-4 right-4 z-50 flex bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <button
                    onClick={() => setView('citizen')}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${view === 'citizen'
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    🏠 Citizen
                </button>
                <button
                    onClick={() => setView('admin')}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${view === 'admin'
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
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
