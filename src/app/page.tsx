"use client";

import { useState } from "react";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import { Task, View } from "@/components/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<View>("open");

  const addTask = (
    text: string,
    description: string,
    dueDate: string,
    dueTime: string
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      description,
      dueDate,
      dueTime,
      createdAt: new Date().toISOString(),
      completed: false,
      archived: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleArchive = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, archived: !task.archived } : task
      )
    );
  };

  const matchesView = (task: Task, v: View) => {
    if (v === "archived") return task.archived;
    if (task.archived) return false;
    return v === "closed" ? task.completed : !task.completed;
  };

  const visibleTasks = tasks.filter((task) => matchesView(task, view));

  const clearAll = () => {
    setTasks(tasks.filter((task) => !matchesView(task, view)));
  };

  const count = (v: View) => tasks.filter((t) => matchesView(t, v)).length;

  const tabs: { id: View; label: string }[] = [
    { id: "open", label: "Open" },
    { id: "closed", label: "Closed" },
    { id: "archived", label: "Archived" },
  ];

  const tabClass = (tab: View) =>
    `flex-1 py-2 rounded-lg font-medium transition-colors ${
      view === tab
        ? "bg-blue-500 text-white"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">
          To Do List
        </h1>

        <TaskInput onAddTask={addTask} />

        <div className="flex gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={tabClass(tab.id)}
              onClick={() => setView(tab.id)}
            >
              {tab.label} ({count(tab.id)})
            </button>
          ))}
        </div>

        <TaskList
          tasks={visibleTasks}
          view={view}
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask}
          onToggleArchive={toggleArchive}
        />

        {visibleTasks.length > 0 && (
          <button
            onClick={clearAll}
            className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Clear All {view === "open" ? "" : view === "closed" ? "Closed " : "Archived "}
            Tasks
          </button>
        )}
      </div>
    </div>
  );
}