import { useState, useEffect } from 'react';
import axios from 'axios';

const useTasks = (status?: string) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      const filteredTasks = status
        ? response.data.filter((task: { status: string }) => task.status === status)
        : response.data;
      setTasks(filteredTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [status]);

  return { tasks, loading, refetch: fetchTasks };
};

export default useTasks;
