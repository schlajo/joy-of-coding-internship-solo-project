'use client';

import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';

export default function TaskCard({ task }: { task: any }) {
  const handleDelete = async () => {
    await axios.delete(`/api/tasks/${task.id}`);
    window.location.reload(); // Reload to fetch updated tasks
  };

  const handleStatusChange = async () => {
    const newStatus = task.status === 'INCOMPLETE' ? 'COMPLETED' : 'INCOMPLETE';
    await axios.patch(`/api/tasks/${task.id}`, { status: newStatus });
    window.location.reload();
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
      <p className="text-gray-400 mb-4">{task.description}</p>
      <div className="flex justify-between items-center text-gray-300">
        <span className="text-sm">{new Date(task.createdAt).toLocaleDateString()}</span>
        <span
          className={`px-2 py-1 rounded ${
            task.status === 'COMPLETED' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {task.status === 'COMPLETED' ? 'Completed' : 'Incomplete'}
        </span>
      </div>
      {/* Actions */}
      <div className="mt-4 flex justify-end gap-2">
        <button onClick={handleStatusChange} className="text-gray-300 hover:text-green-400">
          <FaEdit />
        </button>
        <button onClick={handleDelete} className="text-gray-300 hover:text-red-400">
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

