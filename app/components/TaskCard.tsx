"use client";

import React, { useState } from "react";
import axios from "axios";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import TaskModal from "./TaskModal"; // Assuming TaskModal is in the same directory

export default function TaskCard({
  task,
  onUpdate,
}: {
  task: any;
  onUpdate: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [isEditing, setIsEditing] = useState(false); // Track edit mode (if needed for inline editing)
  const [title, setTitle] = useState(task.title); // Editable title
  const [description, setDescription] = useState(task.description); // Editable description

  // Handle task deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${task.id}`);
      onUpdate(); // Refresh task list
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Failed to delete task. Check console for details.");
    }
  };

  // Handle open modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle save after editing
  const handleSave = async (updatedTask: any) => {
    try {
      await axios.patch(`/api/tasks/${task.id}`, updatedTask);
      setIsModalOpen(false); // Close modal
      onUpdate(); // Refresh the task list
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Failed to update task. Check console for details.");
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

      {/* Action Buttons */}
      <div className="mt-4 flex gap-2">
        {/* Edit Button (opens the modal) */}
        <button
          onClick={handleOpenModal}
          className="text-blue-500 hover:text-white transition-colors duration-200 p-2 rounded-full"
          title="Edit Task"
        >
          <FaRegEdit size={18} />
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="text-blue-500 hover:text-red-600 transition-colors duration-200 p-2 rounded-full"
          title="Delete Task"
        >
          <FaTrash size={18} />
        </button>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={task}
        onSave={handleSave}
      />
    </div>
  );
}
