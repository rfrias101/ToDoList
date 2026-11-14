"use client";

import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onToggleArchive: (id: string) => void;
}

export default function TaskItem({
  task,
  onToggleComplete,
  onDeleteTask,
  onToggleArchive,
}: TaskItemProps) {
  // No time set means it's due by the end of that day
  const due = task.dueDate
    ? new Date(`${task.dueDate}T${task.dueTime || "23:59"}`)
    : null;
  const overdue = due !== null && !task.completed && due < new Date();

  const dueLabel = due
    ? task.dueTime
      ? due.toLocaleString([], { dateStyle: "medium", timeStyle: "short" })
      : due.toLocaleDateString([], { dateStyle: "medium" })
    : "";

  return (
    <li className="px-4 py-3 bg-white border border-gray-200 rounded-lg mb-2">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="w-5 h-5 mt-0.5 cursor-pointer"
            title={task.completed ? "Reopen task" : "Close task"}
          />
          <div>
            <p
              className={`font-medium ${
                task.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {task.text}
            </p>
            {task.description && (
              <p className="text-sm text-gray-500 mt-1">{task.description}</p>
            )}
            <div className="text-xs mt-2 space-y-0.5">
              {due && (
                <p
                  className={
                    overdue ? "text-red-500 font-medium" : "text-gray-500"
                  }
                >
                  Due: {dueLabel}
                  {overdue && " (overdue)"}
                </p>
              )}
              <p className="text-gray-400">
                Added: {new Date(task.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onToggleArchive(task.id)}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            {task.archived ? "Restore" : "Archive"}
          </button>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="text-red-500 hover:text-red-700 font-bold text-xl"
            title="Delete task"
          >
            ×
          </button>
        </div>
      </div>
    </li>
  );
}