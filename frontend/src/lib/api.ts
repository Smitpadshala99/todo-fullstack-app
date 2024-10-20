import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://todo-fullstack-app-20t7.onrender.com/api'
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth endpoints
export const register = (data: { name: string; email: string; password: string }) => 
    api.post('/users/register', data);

export const login = (data: { email: string; password: string }) => 
    api.post('/users/login', data);

// Todo endpoints
export const getTodos = () => api.get('/todos');
export const createTodo = (text: string) => api.post('/todos', { text });
export const updateTodo = (id: string, data: any) => api.put(`/todos/${id}`, data);
export const deleteTodo = (id: string) => api.delete(`/todos/${id}`);

