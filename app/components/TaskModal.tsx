"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaTrash, FaRegEdit } from "react-icons/fa";

export default function TaskModal({ isOpen, onClose, task, onSave }: any) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "TO_START");

  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement("body");
    }
  }, []);

  const handleSubmit = () => {
    onSave({ ...task, title, description, status });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-1/3">
        <h2 className="text-2xl mb-4">{task ? "Edit Task" : "Create Task"}</h2>

        {/* Title */}
        <label className="block mb-2">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          placeholder="Task Title"
        />

        {/* Description */}
        <label className="block mb-2">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          placeholder="Task Description"
        />

        {/* Status */}
        <label className="block mb-2">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
        >
          <option value="TO_START">To Start</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
