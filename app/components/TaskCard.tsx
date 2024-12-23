"use client";

import React, { useState } from "react";
import axios from "axios";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import TaskModal from "./TaskModal";

export default function TaskCard({
  task,
  onUpdate,
  onEdit,
}: {
  task: any;
  onUpdate: () => void;
  onEdit?: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
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
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md flex flex-col justify-between min-h-[200px]">
      {/* Top Section: Title and Status Badge */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">{task.title}</h2>
        {/* Status Badge */}
        <span
          className={`px-2 py-1 rounded text-sm font-semibold ${
            task.status === "COMPLETED"
              ? "bg-green-500 text-white"
              : task.status === "IN_PROGRESS"
              ? "bg-yellow-500 text-gray-900"
              : "bg-blue-500 text-gray-200"
          }`}
        >
          {task.status
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/\b\w/g, (char: string) => char.toUpperCase())}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-400 mb-4">{task.description}</p>

      {/* Bottom Section: Created Date and Action Buttons */}
      <div className="flex items-center justify-between text-sm">
        {/* Created Date */}
        <p className="text-gray-500">
          Created on: {new Date(task.createdAt).toLocaleString()}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenModal}
            className="text-blue-500 hover:text-white transition-colors duration-200 p-2 rounded-full"
            title="Edit Task"
          >
            <FaRegEdit size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="text-blue-500 hover:text-red-600 transition-colors duration-200 p-2 rounded-full"
            title="Delete Task"
          >
            <FaTrash size={18} />
          </button>
        </div>
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
