'use client';

import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import Navbar from '../NavBar';
import axios from 'axios';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when the page loads
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Navbar at the top */}
      <Navbar />

      {/* Content */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">All Tasks</h1>
        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {/* Placeholder card for adding a new task */}
          <div className="flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg h-40">
            <span className="text-gray-400">+ Add New Task</span>
          </div>
        </div>
      </div>
    </div>
  );
}
