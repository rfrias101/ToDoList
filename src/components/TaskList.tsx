"use client";

import TaskItem from "./TaskItem";
import { Task, View } from "@/components/types/task";

interface TaskListProps {
  tasks: Task[];
  view: View;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onToggleArchive: (id: string) => void;
}

const emptyMessages: Record<View, string> = {
  open: "No tasks yet!",
  closed: "No closed tasks.",
  archived: "No archived tasks.",
};

export default function TaskList({
  tasks,
  view,
  onToggleComplete,
  onDeleteTask,
  onToggleArchive,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8 italic">
        {emptyMessages[view]}
      </p>
    );
  }

  return (
    <ul className="list-none p-0 m-0">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onToggleArchive={onToggleArchive}
        />
      ))}
    </ul>
  );
}
