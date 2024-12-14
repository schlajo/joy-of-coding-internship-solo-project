"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";


export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

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

// Add this at the top of the file
const [newTask, setNewTask] = useState({ title: "", description: "" });

// Handle task creation
const handleAddTask = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await axios.post("/api/tasks", newTask);
    setNewTask({ title: "", description: "" }); // Reset form
    fetchTasks(); // Refresh task list
  } catch (error) {
    console.error("Failed to add task:", error);
  }
};


  return (
<div>
<form onSubmit={handleAddTask} className="mb-6">
  <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
  <input
    type="text"
    placeholder="Task Title"
    value={newTask.title}
    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
    className="block w-full p-2 mb-2 rounded border"
    required
  />
  <textarea
    placeholder="Task Description"
    value={newTask.description}
    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
    className="block w-full p-2 mb-2 rounded border"
    required
  />
  <button
    type="submit"
    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
  >
    Add Task
  </button>
</form>


    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task: any) => (
          <TaskCard key={task.id} task={task} onUpdate={fetchTasks} />
        ))}
      </div>
    </div>
  </div>
  );
}

