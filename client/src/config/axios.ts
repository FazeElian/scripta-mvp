import axios from "axios";

export const api = axios.create ({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use((config) => {
    // Get token
    const token = localStorage.getItem("AUTH_TOKEN");
    if(token) {
        // Set token on headers
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})