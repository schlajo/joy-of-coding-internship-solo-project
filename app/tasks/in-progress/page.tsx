'use client';

import React from 'react';
import TaskCard from '../../components/TaskCard';
import useTasks from '../../hooks/useTasks';

const InProgressPage = () => {
  const { tasks, loading, refetch } = useTasks('IN_PROGRESS');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">In Progress Tasks</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onUpdate={refetch} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InProgressPage;

