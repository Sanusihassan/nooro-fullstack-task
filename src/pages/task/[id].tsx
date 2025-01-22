import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

const colors = [
  { id: 'red', value: '#EF4444' },
  { id: 'orange', value: '#F97316' },
  { id: 'yellow', value: '#EAB308' },
  { id: 'green', value: '#22C55E' },
  { id: 'blue', value: '#3B82F6' },
  { id: 'indigo', value: '#6366F1' },
  { id: 'purple', value: '#A855F7' },
  { id: 'pink', value: '#EC4899' },
  { id: 'brown', value: '#92400E' }
];

const UpdateTaskPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedColor, setSelectedColor] = useState(colors[0].value);
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://fictional-garbanzo-xpg46v5vxvjfvqwq-3001.app.github.dev';

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${apiUrl}/tasks/${id}`);
        console.log(response)
        setTitle(response.data.title);
        setSelectedColor(response.data.color);
      } catch (err) {
        setError('Failed to fetch task details');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await axios.put(`${apiUrl}/tasks/${id}`, {
        title: title.trim(),
        color: selectedColor,
      });
      router.push('/');
    } catch (err) {
      setError('Failed to update task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!id) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 p-4 flex items-center justify-center">
        <p className="text-blue-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-blue-500">🚀</span>
          <h1 className="text-blue-500 font-semibold text-xl">Todo</h1>
          <span className="text-purple-500">App</span>
        </div>

        <Link href="/" className="inline-flex items-center text-blue-500 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-blue-500 mb-2">Title</label>
            <input
              type="text"
              placeholder="Ex: Brush your teeth"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-800 border-0 rounded-md p-3 text-gray-200 placeholder:text-gray-600 focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
          </div>

          <div>
            <label className="block text-blue-500 mb-2">Color</label>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  className={`w-8 h-8 rounded-full transition-transform ${
                    selectedColor === color.value ? 'scale-110 ring-2 ring-gray-400' : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setSelectedColor(color.value)}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Updating Task...' : 'Update Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskPage;