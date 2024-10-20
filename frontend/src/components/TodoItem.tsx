import { useState } from 'react';
import { Todo } from '@/types';
import { FiCheck, FiTrash2, FiEdit2 } from 'react-icons/fi';

interface TodoItemProps {
    todo: Todo;
    onUpdate: (id: string, data: Partial<Todo>) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(todo.text);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleUpdate = async () => {
        if (text.trim() !== todo.text) {
            await onUpdate(todo._id, { text: text.trim() });
        }
        setIsEditing(false);
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await onDelete(todo._id);
        } catch (error) {
            setIsDeleting(false);
        }
    };

    const handleToggleComplete = async () => {
        await onUpdate(todo._id, { completed: !todo.completed });
    };

    return (
        <div className={`flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm transition-all duration-300 ${isDeleting ? 'opacity-50' : ''}`}>
            <button
                onClick={handleToggleComplete}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                    todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-blue-500'
                }`}
                disabled={isDeleting}
            >
                {todo.completed && <FiCheck className="text-white text-xl" />}
            </button>
            
            {isEditing ? (
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={handleUpdate}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleUpdate();
                        } else if (e.key === 'Escape') {
                            setText(todo.text);
                            setIsEditing(false);
                        }
                    }}
                    className="flex-1 border-b-2 border-blue-500 outline-none py-1 text-lg font-bold text-gray-800"
                    autoFocus
                    disabled={isDeleting}
                />
            ) : (
                <span
                    className={`flex-1 text-lg font-bold ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
                    onDoubleClick={() => !isDeleting && setIsEditing(true)}
                >
                    {todo.text}
                </span>
            )}
            
            <div className="flex gap-2">
                <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
                    disabled={isDeleting}
                >
                    <FiEdit2 className="text-xl" />
                </button>
                <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-600 transition-colors duration-300"
                    disabled={isDeleting}
                >
                    <FiTrash2 className="text-xl" />
                </button>
            </div>
        </div>
    );
}