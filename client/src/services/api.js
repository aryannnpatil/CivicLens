import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 30000, // 30s — AI classification can take time
});

/**
 * Submit a new civic issue report
 * @param {FormData} formData - Must contain: photo (File), longitude, latitude, description (optional)
 */
export const submitTicket = (formData) => API.post('/tickets', formData);

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
