import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { TaskList } from '@/components/TaskList';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
}

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://fictional-garbanzo-xpg46v5vxvjfvqwq-3001.app.github.dev';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/tasks`);
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      await axios.put(`${apiUrl}/tasks/${id}`, { completed: !task.completed });
      setTasks(tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await axios.delete(`${apiUrl}/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-zinc-900 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-blue-500">🚀</span>
          <h1 className="text-blue-500 font-semibold text-xl">Todo</h1>
          <span className="text-purple-500">App</span>
        </div>

        <Link
          href="/add-task"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md mb-8 transition-colors text-center"
        >
          Create Task
        </Link>

        <div className="flex justify-between text-sm mb-6">
          <span className="text-gray-400">Tasks <span className="ml-1">{tasks.length}</span></span>
          <span className="text-purple-500">Completed <span className="ml-1">{completedCount} of {tasks.length}</span></span>
        </div>

        {isLoading ? (
          <div className="text-center py-16 text-gray-400">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="text-gray-600 mb-4">📋</div>
            <p className="text-gray-400 mb-2">You don't have any tasks registered yet.</p>
            <p className="text-gray-600">Create tasks and organize your to-do items.</p>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default TodoApp;