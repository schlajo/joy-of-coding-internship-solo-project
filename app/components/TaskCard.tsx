'use client'

import React from "react";
import { Task } from "@prisma/client";
import axios from "axios";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const handleStatusChange = async () => {
    // Update task status to "IN_PROGRESS"
    await axios.patch(`/api/tasks/${task.id}`, { status: "IN_PROGRESS" });
    // Optionally trigger revalidation or state update
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-300">{task.description}</p>
      <p className="text-sm mt-2">
        <span
          className={`${
            task.status === "OPEN"
              ? "text-green-500"
              : task.status === "IN_PROGRESS"
              ? "text-yellow-500"
              : "text-gray-500"
          }`}
        >
          {task.status}
        </span>
      </p>
      {task.status !== "CLOSED" && (
        <button
          onClick={handleStatusChange}
          className="mt-2 text-blue-500 hover:text-blue-700"
        >
          Mark as In Progress
        </button>
      )}
    </div>
  );
};

export default TaskCard;

