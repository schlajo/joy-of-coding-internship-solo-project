"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./components/TaskCard";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState(""); // State for new task title
  const [description, setDescription] = useState(""); // State for new task description

  // Fetch all tasks when the page loads
  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to handle new task submission
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/tasks", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks(); // Refresh the tasks list
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Tasks</h1>

      {/* Form to create a new task */}
      <form
        onSubmit={handleCreateTask}
        className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-300 mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            rows={3}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Task
        </button>
      </form>

      {/* Grid to display task cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onUpdate={fetchTasks} />
        ))}
      </div>
    </div>
  );
}
