import React from 'react';
import { Trash2, Pencil } from 'lucide-react';
import Link from 'next/link';

interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TaskList = ({ tasks, onToggleComplete, onDelete }: TaskListProps) => {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center gap-3 bg-zinc-800 p-4 rounded-lg group"
          style={{ borderLeft: `4px solid ${task.color}` }}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="h-5 w-5 rounded border-gray-600 text-blue-600 focus:ring-blue-600"
          />
          <span
            className="flex-1 text-gray-300 truncate"
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.title}
          </span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link
              href={`/task/${task.id}`}
              className="text-gray-400 hover:text-blue-500"
            >
              <Pencil className="w-5 h-5" />
            </Link>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};