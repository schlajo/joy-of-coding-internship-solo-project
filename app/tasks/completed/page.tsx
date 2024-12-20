'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../../components/TaskCard';

const CompletedPage = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        const completedTasks = response.data.filter((task: { status: string; }) => task.status === 'COMPLETED');
        setTasks(completedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchCompletedTasks();
  }, []);

  return (
<div className="min-h-screen bg-gray-900 text-white p-8">
  <h1 className="text-3xl font-bold mb-6">Completed Tasks</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[1fr]">
    {tasks.map((task) => (
      <TaskCard key={task.id} task={task} onUpdate={() => {}} />
    ))}
  </div>
</div>


  );
};

export default CompletedPage;

