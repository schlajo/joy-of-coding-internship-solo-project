'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../../components/TaskCard'; // Adjust the path if needed

const CompletedPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        const completedTasks = response.data.filter((task: any) => task.status === 'COMPLETED');
        setTasks(completedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchCompletedTasks();
  }, []);

  return (
    <div>
      <h1>Completed Tasks</h1>
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

export default CompletedPage;
