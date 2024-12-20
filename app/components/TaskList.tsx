"use client";
import React, { useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

export default function TaskList({
  tasks,
  onUpdate,
}: {
  tasks: any[];
  onUpdate: () => void;
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Open modal for editing or creating
  const handleOpenModal = (task = null) => {
    setSelectedTask(task); // Pass task for editing, or null for creating
    setModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  // Save the task (create or update)
  const handleSaveTask = async (taskData: any) => {
    try {
      const method = taskData.id ? "PUT" : "POST"; // PUT for update, POST for create
      const url = taskData.id ? `/api/tasks/${taskData.id}` : "/api/tasks";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      onUpdate(); // Refresh task list
      handleCloseModal(); // Close modal
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[1fr]">
      {/* Render Task Cards */}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onEdit={() => handleOpenModal(task)} // Open modal for editing
        />
      ))}

      {/* Add New Task Button */}
      <div
        onClick={() => handleOpenModal()} // Open modal to create a new task
        className="flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-all min-h-[200px] h-full"
      >
        <span className="text-gray-400 text-lg">+ Add New Task</span>
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          task={selectedTask} // Pass the selected task (null for new task)
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}
