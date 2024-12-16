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
  // Determine next statuses for toggling
  const getNextStatus = (currentStatus: string, direction: "forward" | "backward") => {
    const statuses = ["TO_START", "IN_PROGRESS", "COMPLETED"];
    const currentIndex = statuses.indexOf(currentStatus);

    if (direction === "forward") {
      return statuses[(currentIndex + 1) % statuses.length]; // Cycle forward
    } else {
      return statuses[(currentIndex - 1 + statuses.length) % statuses.length]; // Cycle backward
    }
  };

  // Handle status change
  const handleStatusChange = async (direction: "forward" | "backward") => {
    const nextStatus = getNextStatus(task.status, direction);

    try {
      await axios.patch(`/api/tasks/${task.id}`, { status: nextStatus });
      onUpdate(); // Refresh the task list
    } catch (error) {
      console.error(`Failed to update status to ${nextStatus}:`, error);
      alert("Failed to update status. Check console for details.");
    }
  };

  // Handle task deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${task.id}`);
      onUpdate(); // Refresh the task list
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Failed to delete task. Check console for details.");
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
      {/* Title and Description */}
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

        {/* Delete Task */}
        <Button
          onClick={handleDelete}
          label="Delete"
          color="red"
        />
      </div>
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


