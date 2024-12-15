"use client";

import React from "react";
import axios from "axios";

export default function TaskCard({
  task,
  onUpdate,
}: {
  task: any;
  onUpdate: () => void;
}) {
  // Function to update the task status to IN_PROGRESS
  const handleStatusChange = async () => {
    try {
      await axios.patch(`/api/tasks/${task.id}`, { status: "IN_PROGRESS" });
      onUpdate(); // Refresh task list
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleComplete = async () => {
    try {
      await axios.patch(`/api/tasks/${task.id}`, { status: "COMPLETED" });
      onUpdate(); // Refresh task list
    } catch (error: any) {  // Use 'any' for error to access its properties
      console.error("Failed to mark task as completed:", error);
      alert("Failed to mark task as completed. Check console for details.");
    }
  };
  

  // Function to delete a task
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${task.id}`);
      onUpdate(); // Refresh task list
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Function to toggle the important status
  const handleImportantToggle = async () => {
    try {
      await axios.patch(`/api/tasks/${task.id}`, {
        important: !task.important, // Toggle the "important" status
      });
      onUpdate(); // Refresh task list
    } catch (error) {
      console.error("Failed to update task importance:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
      <p className="text-gray-400 mb-4">{task.description}</p>

      {/* Status Badge */}
      <span
        className={`px-2 py-1 rounded text-sm font-semibold ${
          task.status === "COMPLETED"
            ? "bg-green-500 text-white"
            : task.status === "IN_PROGRESS"
            ? "bg-yellow-500 text-gray-900"
            : "bg-gray-600 text-gray-200"
        }`}
      >
        {task.status}
      </span>

      {/* Important Badge */}
      {task.important && (
        <span className="ml-2 px-2 py-1 rounded text-sm font-semibold bg-red-500 text-white">
          IMPORTANT
        </span>
      )}

      {/* Action Buttons */}
      <div className="mt-4 flex space-x-2">
        {task.status === "OPEN" && (
          <button
            onClick={handleStatusChange}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Mark as In Progress
          </button>
        )}

        {task.status !== "COMPLETED" && (
          <button
            onClick={handleComplete}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            Mark as Complete
          </button>
        )}

        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>

        {!task.important && (
          <button
            onClick={handleImportantToggle}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
          >
            Mark as Important
          </button>
        )}
      </div>
    </div>
  );
}
