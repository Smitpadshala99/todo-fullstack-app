import { useState, useEffect } from 'react';
import { Todo } from '@/types';
import { getTodos, createTodo, updateTodo, deleteTodo } from '@/lib/api';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import toast from 'react-hot-toast';
import { FiLoader } from 'react-icons/fi';

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await getTodos();
            setTodos(response.data);
        } catch (error) {
            console.error('Error loading todos:', error);
            setError('Failed to load todos. Please try again.');
            toast.error('Failed to load todos');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async (text: string) => {
        try {
            const response = await createTodo(text);
            setTodos(prevTodos => [...prevTodos, response.data]);
            toast.success('Todo added successfully');
        } catch (error) {
            console.error('Error adding todo:', error);
            toast.error('Failed to add todo');
        }
    };

    const handleUpdate = async (id: string, data: Partial<Todo>) => {
        try {
            const response = await updateTodo(id, data);
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo._id === id ? { ...todo, ...response.data } : todo
                )
            );
            toast.success('Todo updated successfully');
        } catch (error) {
            console.error('Error updating todo:', error);
            toast.error('Failed to update todo');
            loadTodos();
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTodo(id);
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
            toast.success('Todo deleted successfully');
        } catch (error) {
            console.error('Error deleting todo:', error);
            toast.error('Failed to delete todo');
            loadTodos();
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FiLoader className="animate-spin text-4xl text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                <p>{error}</p>
                <button
                    onClick={loadTodos}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AddTodo onAdd={handleAdd} />
            <div className="space-y-4">
                {todos.map(todo => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
                {todos.length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                        No todos yet. Add one above!
                    </p>
                )}
            </div>
        </div>
    );
}
