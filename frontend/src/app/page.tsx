'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import TodoList from '@/components/TodoList';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import { Toaster } from 'react-hot-toast';
import { FiList, FiLogOut, FiUser } from 'react-icons/fi';

export default function Home() {
    const { user, isLoading, logout } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Toaster position="top-right" />
            <main className="flex-grow container mx-auto px-4 py-8">
                {user ? (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                                <FiList className="mr-2 text-3xl text-blue-500" /> My Todo List
                            </h1>
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out flex items-center"
                            >
                                <FiLogOut className="mr-2" /> Logout
                            </button>
                        </div>
                        <TodoList />
                    </div>
                ) : (
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
                            <FiUser className="mr-2 text-3xl text-blue-500" />
                            {isRegistering ? 'Create an Account' : 'Login to Your Todo List'}
                        </h1>
                        {isRegistering ? <RegisterForm /> : <LoginForm />}
                        <button
                            onClick={() => setIsRegistering(!isRegistering)}
                            className="w-full mt-6 text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out"
                        >
                            {isRegistering
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </button>
                    </div>
                )}
            </main>
            <footer className="bg-gray-800 text-white py-4 text-center">
                <p>Made with ❤️ by Smit Padshala</p>
            </footer>
        </div>
    );
}