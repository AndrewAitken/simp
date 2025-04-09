
import React, { createContext, useContext, useState, useEffect } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "sonner";

export type TaskPriority = "focus" | "normal";
export type TaskStatus = "completed" | "pending";
export type TaskCategory = "today" | "tomorrow" | "later";
export type ReminderOption = "none" | "30min" | "1hour" | "2hours" | "1day" | "custom";

export interface Task {
  id: string;
  title: string;
  description?: string;
  time?: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
  reminder?: ReminderOption;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "status">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Example tasks for first-time users
const exampleTasks: Task[] = [
  {
    id: "1",
    title: "Завести первую задачу",
    description: "Нажмите на плюсик внизу экрана, заполните название и описание задачи.",
    category: "today",
    priority: "normal",
    status: "pending",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Редактировать задачу",
    description: "Нажмите на задачу, чтобы отредактировать ее детали или изменить категорию.",
    category: "today",
    priority: "normal",
    status: "pending",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Удалить задачу",
    description: "В режиме редактирования задачи нажмите на корзину, чтобы удалить задачу.",
    category: "tomorrow",
    priority: "normal",
    status: "pending",
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Изучить профиль",
    description: "В профиле вы можете настроить тему приложения и управлять личными данными.",
    category: "later",
    priority: "normal",
    status: "pending",
    createdAt: new Date(),
  }
];

// Check if user is a first-time visitor
const isFirstVisit = () => {
  return localStorage.getItem('hasVisitedBefore') !== 'true';
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load tasks from localStorage
    const storedTasks = localStorage.getItem('tasks');
    
    // If first visit, show example tasks
    if (isFirstVisit()) {
      localStorage.setItem('hasVisitedBefore', 'true');
      return exampleTasks;
    }
    
    // Otherwise return stored tasks or empty array
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to request notification permission
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // Check for tasks with reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      tasks.forEach(task => {
        if (task.status === "pending" && task.reminder && task.time) {
          const [hours, minutes] = task.time.split(":").map(Number);
          const reminderDate = new Date();
          reminderDate.setHours(hours, minutes, 0);

          let timeToRemind = 0;
          switch (task.reminder) {
            case "30min":
              timeToRemind = 30 * 60 * 1000;
              break;
            case "1hour":
              timeToRemind = 60 * 60 * 1000;
              break;
            case "2hours":
              timeToRemind = 2 * 60 * 60 * 1000;
              break;
            case "1day":
              timeToRemind = 24 * 60 * 60 * 1000;
              break;
          }

          const reminderTime = new Date(reminderDate.getTime() - timeToRemind);
          
          // Check if it's time to show notification (within last minute)
          const timeDiff = Math.abs(now.getTime() - reminderTime.getTime());
          if (timeDiff < 60000) {
            // Show notification
            if (Notification.permission === "granted") {
              new Notification("Напоминание о задаче", {
                body: task.title,
                icon: "/favicon.ico"
              });
            }
            toast.info("Напоминание о задаче", {
              description: task.title
            });
          }
        }
      });
    };

    // Check every 60 seconds
    const interval = setInterval(checkReminders, 60000);
    // Run once immediately
    checkReminders();
    
    return () => clearInterval(interval);
  }, [tasks]);

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
  
  const getTaskById = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, toggleTaskStatus, getTaskById }}
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
