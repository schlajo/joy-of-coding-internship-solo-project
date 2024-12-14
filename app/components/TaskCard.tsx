"use client";

import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function TaskCard({
  task,
  onUpdate,
}: {
  task: any;
  onUpdate: () => void;
}) {
  // Handle status change (mark as In Progress or Completed)
  const handleStatusChange = async () => {
    try {
      await axios.patch(`/api/tasks/${task.id}`, {
        status: task.status === "IN_PROGRESS" ? "COMPLETED" : "IN_PROGRESS",
      });
      onUpdate(); // Refresh task list
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  // Handle task deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${task.id}`);
      onUpdate(); // Refresh task list
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{task.title}</h2>
      <p className="text-gray-400 mb-4">{task.description}</p>
      <p className="text-gray-300 mb-4">
        Status:{" "}
        <span
          className={
            task.status === "COMPLETED"
              ? "text-green-500 font-semibold"
              : "text-yellow-500 font-semibold"
          }
        >
          {task.status}
        </span>
      </p>
      <div className="flex justify-between items-center">
        <button
          onClick={handleStatusChange}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          {task.status === "IN_PROGRESS" ? "Mark Completed" : "Mark In Progress"}
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  );
}
