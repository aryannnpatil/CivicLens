import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 30000, // 30s — AI classification can take time
    headers: {
        'ngrok-skip-browser-warning': 'true',
    },
});

// Attach admin JWT token if present
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Redirect to login on 401
API.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401 && window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
            localStorage.removeItem('admin_token');
            window.location.href = '/admin/login';
        }
        return Promise.reject(err);
    }
);

/**
 * Submit a new civic issue report
 * @param {FormData} formData - Must contain: photo (File), longitude, latitude, description (optional)
 */
export const submitTicket = (formData) =>
    API.post('/tickets', formData, {
        // Upload + AI classification over ngrok can exceed the default 30s timeout.
        timeout: 120000,
    });

/**
 * Fetch all tickets with optional filters
 * @param {Object} params - { status, category, sort, page, limit }
 */
export const getTickets = (params) => API.get('/tickets', { params });

/**
 * Get a single ticket by ID
 */
export const getTicketById = (id) => API.get(`/tickets/${id}`);

/**
 * Update ticket status
 * @param {string} id
 * @param {string} status - 'open' | 'in_progress' | 'resolved'
 */
export const updateTicketStatus = (id, status) =>
    API.patch(`/tickets/${id}`, { status });

/**
 * Get dashboard aggregate stats
 */
export const getStats = () => API.get('/stats');

export default API;
