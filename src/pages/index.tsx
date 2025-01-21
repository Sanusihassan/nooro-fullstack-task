import React from 'react';

const TodoApp = () => {
  return (
    <div className="min-h-screen bg-zinc-900 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header with App Title */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-blue-500">🚀</span>
          <h1 className="text-blue-500 font-semibold text-xl">Todo</h1>
          <span className="text-purple-500">App</span>
        </div>

        {/* Create Task Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md mb-8 transition-colors">
          Create Task
        </button>

        {/* Task Counter */}
        <div className="flex justify-between text-sm mb-6">
          <span className="text-gray-400">Tasks <span className="ml-1">0</span></span>
          <span className="text-purple-500">Completed <span className="ml-1">0 of 0</span></span>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center text-center py-16">
          <div className="text-gray-600 mb-4">📋</div>
          <p className="text-gray-400 mb-2">You don't have any tasks registered yet.</p>
          <p className="text-gray-600">Create tasks and organize your to-do items.</p>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;