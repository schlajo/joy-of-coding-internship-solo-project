'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../../components/TaskCard'; // Adjust the path if needed

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
}

const ToStartPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Function to refresh task list after any action
  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      const toStartTasks = response.data.filter((task: Task) => task.status === 'OPEN');
      setTasks(toStartTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>To Start Tasks</h1>
      <div className="task-list">
        {tasks.map((task: Task) => (
          <TaskCard key={task.id} task={task} onUpdate={fetchTasks} />
        ))}
      </div>
    </div>
  );
};

export default ToStartPage;
