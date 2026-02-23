const BASE_URL = 'http://localhost:8000/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        // Clear token if unauthorized (401) or forbidden (403)
        if (response.status === 401 || response.status === 403) {
            console.warn("Auth Error: Clearing token and redirecting.");
            localStorage.removeItem('token');
            // Only redirect if we aren't already on the login page
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `Error: ${response.status}`);
    }
    return response.json();
};

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const api = {
    get: async (endpoint) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    post: async (endpoint, data) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    put: async (endpoint, data) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    delete: async (endpoint) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return handleResponse(response);
    }
};
