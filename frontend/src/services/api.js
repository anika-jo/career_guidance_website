const BASE_URL = 'http://localhost:5000/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
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
