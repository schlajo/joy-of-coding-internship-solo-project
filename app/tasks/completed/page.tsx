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
        const completedTasks = response.data.filter((task) => task.status === 'COMPLETED');
        setTasks(completedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchCompletedTasks();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Completed Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onUpdate={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default CompletedPage;
