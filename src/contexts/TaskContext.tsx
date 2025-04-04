
import React, { createContext, useContext, useState, useEffect } from "react";
import { format } from "date-fns";

export type TaskPriority = "focus" | "normal";
export type TaskStatus = "completed" | "pending";
export type TaskCategory = "today" | "tomorrow" | "later";

export interface Task {
  id: string;
  title: string;
  description?: string;
  time?: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "status">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Mock data for initial tasks
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Record podcast video",
    description: "Don't forget to ask confirmation with the guest from Stanford.",
    time: "15:30",
    category: "today",
    priority: "normal",
    status: "completed",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Dinner with Anna",
    time: "19:00",
    category: "today",
    priority: "normal",
    status: "pending",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Write blog post",
    category: "today",
    priority: "normal",
    status: "completed",
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Send podcast script",
    category: "today",
    priority: "normal",
    status: "completed",
    createdAt: new Date(),
  },
  {
    id: "5",
    title: "Update Notion template",
    category: "tomorrow",
    priority: "normal",
    status: "pending",
    createdAt: new Date(),
  },
  {
    id: "6",
    title: "Plan content calendar",
    time: "19:00",
    category: "later",
    priority: "normal",
    status: "pending",
    createdAt: new Date(Date.now() + 86400000 * 7),
  },
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (task: Omit<Task, "id" | "createdAt" | "status">) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substring(2, 9),
      status: "pending",
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, toggleTaskStatus }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
