"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]); // State to hold all tasks
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on page load
  useEffect(() => {
    fetchTasks();
  }, []);

  // Re-fetch tasks when an update happens
  const handleTaskUpdate = () => {
    fetchTasks();
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">All Tasks</h1>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList tasks={tasks} onUpdate={handleTaskUpdate} />
      )}
    </main>
  );
}
