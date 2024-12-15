'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../../components/TaskCard'; // Adjust the path if needed

const InProgressPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchInProgressTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        const inProgressTasks = response.data.filter((task: any) => task.status === 'IN_PROGRESS');
        setTasks(inProgressTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchInProgressTasks();
  }, []);

  return (
    <div>
      <h1>In Progress Tasks</h1>
      <div className="task-list">
        {tasks.map((task: any) => (
          <TaskCard key={task.id} task={task} onUpdate={function (): void {
            throw new Error('Function not implemented.');
          }} />
        ))}
      </div>
    </div>
  );
};

export default InProgressPage;
