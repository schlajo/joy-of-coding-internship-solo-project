'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../../components/TaskCard'; // Adjust the path if needed

const ImportantPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchImportantTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        const importantTasks = response.data.filter((task: any) => task.isImportant === true); // assuming isImportant flag
        setTasks(importantTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchImportantTasks();
  }, []);

  return (
    <div>
      <h1>Important Tasks</h1>
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

export default ImportantPage;
