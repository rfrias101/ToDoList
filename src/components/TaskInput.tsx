"use client";

import { useState } from "react";

interface TaskInputProps {
  onAddTask: (
    text: string,
    description: string,
    dueDate: string,
    dueTime: string
  ) => void;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;
    onAddTask(text.trim(), description.trim(), dueDate, dueDate ? dueTime : "");
    setText("");
    setDescription("");
    setDueDate("");
    setDueTime("");
  };

  const fieldClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400";

  return (
    <div className="flex flex-col gap-3 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new task..."
        className={fieldClass}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        rows={2}
        className={`${fieldClass} resize-none`}
      />
      <div className="flex gap-3">
        <label className="flex-1 text-sm text-gray-600">
          Due date
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`${fieldClass} mt-1`}
          />
        </label>
        <label className="flex-1 text-sm text-gray-600">
          Time (optional)
          <input
            type="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            disabled={!dueDate}
            className={`${fieldClass} mt-1`}
          />
        </label>
      </div>
      <button
        onClick={handleAdd}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Add Task
      </button>
    </div>
  );
}