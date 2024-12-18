"use client";

import React, { useState } from "react";
import axios from "axios";
import { FaTrash, FaRegEdit } from "react-icons/fa";

export default function TaskCard({
  task,
  onUpdate,
}: {
  task: any;
  onUpdate: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [title, setTitle] = useState(task.title); // Editable title
  const [description, setDescription] = useState(task.description); // Editable description

  // Determine next statuses for toggling
  const getNextStatus = (currentStatus: string, direction: "forward" | "backward") => {
    const statuses = ["TO_START", "IN_PROGRESS", "COMPLETED"];
    const currentIndex = statuses.indexOf(currentStatus);

    if (direction === "forward") {
      return statuses[(currentIndex + 1) % statuses.length];
    } else {
      return statuses[(currentIndex - 1 + statuses.length) % statuses.length];
    }
  };

  // Handle status change
  const handleStatusChange = async (direction: "forward" | "backward") => {
    const nextStatus = getNextStatus(task.status, direction);

    try {
      await axios.patch(`/api/tasks/${task.id}`, { status: nextStatus });
      onUpdate();
    } catch (error) {
      console.error(`Failed to update status to ${nextStatus}:`, error);
      alert("Failed to update status. Check console for details.");
    }
  };

  // Handle task deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${task.id}`);
      onUpdate();
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Failed to delete task. Check console for details.");
    }
  };

  // Handle save after editing
  const handleSave = async () => {
    try {
      await axios.patch(`/api/tasks/${task.id}`, { title, description });
      setIsEditing(false); // Exit edit mode
      onUpdate(); // Refresh the task list
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Failed to update task. Check console for details.");
    }
  };

  // Handle cancel (exit edit mode)
  const handleCancel = () => {
    setIsEditing(false); // Exit edit mode
    setTitle(task.title); // Reset title
    setDescription(task.description); // Reset description
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
      {isEditing ? (
        // Editable Fields when in edit mode
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
            placeholder="Edit Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Edit Description"
          ></textarea>
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-white"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // View mode: Title, Description, and Actions
        <>
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
            {/* Forward Status Toggle */}
            <Button
              onClick={() => handleStatusChange("forward")}
              label={`Move to ${getNextStatus(task.status, "forward")}`}
              color="blue"
            />

            {/* Backward Status Toggle */}
            <Button
              onClick={() => handleStatusChange("backward")}
              label={`Move to ${getNextStatus(task.status, "backward")}`}
              color="gray"
            />

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)} // Enter edit mode
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
        </>
      )}
    </div>
  );
}

/* Reusable Button Component */
const Button = ({
  onClick,
  label,
  color,
}: {
  onClick: () => void;
  label: string;
  color: string;
}) => {
  const baseStyles =
    "px-3 py-1 rounded text-white hover:opacity-90 transition-opacity";
  const colorStyles: { [key: string]: string } = {
    blue: "bg-blue-500 hover:bg-blue-600",
    red: "bg-red-500 hover:bg-red-600",
    gray: "bg-gray-600 hover:bg-gray-700",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${colorStyles[color]}`}>
      {label}
    </button>
  );
};

