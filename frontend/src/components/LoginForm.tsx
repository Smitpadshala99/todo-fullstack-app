import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FiMail, FiLock } from 'react-icons/fi';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
                <label htmlFor="email" className="text-sm font-medium text-black block mb-2">
                    Email
                </label>
                <div className="flex items-center">
                    <FiMail className="absolute left-3 bottom-1 transform -translate-y-1/2 text-black" />
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 rounded-md bg-white bg-opacity-20 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="you@example.com"
                        required
                    />
                </div>
            </div>
            <div className="relative">
                <label htmlFor="password" className="text-sm font-medium text-black block mb-2">
                    Password
                </label>
                <div className="flex items-center">
                    <FiLock className="absolute left-3 bottom-1 transform -translate-y-1/2 text-black" />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 rounded-md bg-white bg-opacity-20 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="••••••••"
                        required
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 transition duration-300 ease-in-out"
            >
                Login
            </button>
        </form>
    );
}