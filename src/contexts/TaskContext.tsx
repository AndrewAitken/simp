
import React, { createContext, useContext, useState, useEffect } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "sonner";

export type TaskPriority = "focus" | "normal";
export type TaskStatus = "completed" | "pending";
export type TaskCategory = "today" | "tomorrow" | "later";
export type ReminderOption = "none" | "30min" | "1hour" | "2hours" | "1day" | "custom";

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

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
  subtasks?: SubTask[];
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "status">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  addSubtask: (taskId: string, subtaskTitle: string) => void;
  removeSubtask: (taskId: string, subtaskId: string) => void;
  toggleSubtaskStatus: (taskId: string, subtaskId: string) => void;
  generateSubtasks: (taskId: string, title: string, description?: string) => Promise<SubTask[]>;
  generateSubtasksFromText: (title: string, description?: string) => Promise<SubTask[]>;
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
    subtasks: [
      { id: "1-1", title: "Придумать название", completed: true },
      { id: "1-2", title: "Добавить описание", completed: false },
    ]
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
      subtasks: task.subtasks || []
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

  // Add new subtask to a task
  const addSubtask = (taskId: string, subtaskTitle: string) => {
    if (!subtaskTitle.trim()) return;
    
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const subtasks = task.subtasks || [];
          return {
            ...task,
            subtasks: [
              ...subtasks, 
              { 
                id: Math.random().toString(36).substring(2, 9), 
                title: subtaskTitle, 
                completed: false 
              }
            ]
          };
        }
        return task;
      })
    );
  };

  // Remove subtask from a task
  const removeSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId && task.subtasks) {
          return {
            ...task,
            subtasks: task.subtasks.filter((subtask) => subtask.id !== subtaskId)
          };
        }
        return task;
      })
    );
  };

  // Toggle subtask completion status
  const toggleSubtaskStatus = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId && task.subtasks) {
          return {
            ...task,
            subtasks: task.subtasks.map((subtask) =>
              subtask.id === subtaskId
                ? { ...subtask, completed: !subtask.completed }
                : subtask
            )
          };
        }
        return task;
      })
    );
  };

  // Generate subtasks for an existing task using a simple algorithm
  const generateSubtasks = async (taskId: string, title: string, description?: string): Promise<SubTask[]> => {
    // Simulate a delay to mimic API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const taskText = `${title}${description ? " " + description : ""}`;
    
    // Generate 5 subtasks based on the task
    const generatedSubtasks = generateSubtasksList(taskText);
    
    // Add them to the task
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const existingSubtasks = task.subtasks || [];
          return {
            ...task,
            subtasks: [
              ...existingSubtasks,
              ...generatedSubtasks
            ]
          };
        }
        return task;
      })
    );
    
    return generatedSubtasks;
  };
  
  // Generate subtasks from text without adding them to any task
  const generateSubtasksFromText = async (title: string, description?: string): Promise<SubTask[]> => {
    // Simulate a delay to mimic API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const taskText = `${title}${description ? " " + description : ""}`;
    
    // Generate 5 subtasks based on the task
    return generateSubtasksList(taskText);
  };
  
  // Helper function to generate subtasks
  const generateSubtasksList = (text: string): SubTask[] => {
    // Basic logic to generate subtasks based on the text
    // You could replace this with an actual AI API call in the future
    
    // Common subtask patterns for different types of tasks
    const planningSubtasks = [
      "Составить план действий",
      "Определить сроки выполнения",
      "Распределить задачи между участниками",
      "Подготовить необходимые материалы",
      "Провести установочную встречу"
    ];
    
    const researchSubtasks = [
      "Определить ключевые вопросы",
      "Собрать информацию из различных источников",
      "Проанализировать собранные данные",
      "Составить отчет о результатах",
      "Представить выводы"
    ];
    
    const developmentSubtasks = [
      "Написать техническое задание",
      "Разработать прототип",
      "Провести тестирование",
      "Внести необходимые изменения",
      "Подготовить к запуску"
    ];
    
    const writingSubtasks = [
      "Составить план документа",
      "Написать черновик",
      "Проверить на ошибки",
      "Внести правки",
      "Подготовить финальную версию"
    ];
    
    const organizationalSubtasks = [
      "Определить необходимые ресурсы",
      "Составить график работ",
      "Распределить ответственности",
      "Провести координационную встречу",
      "Подготовить отчет о ходе работ"
    ];
    
    const cleaningSubtasks = [
      "Составить список вещей для уборки",
      "Подготовить чистящие средства",
      "Убрать основные помещения",
      "Провести влажную уборку",
      "Вынести мусор"
    ];
    
    // Choose which set of subtasks to use based on keywords in the text
    const lowerText = text.toLowerCase();
    let selectedSubtasks;
    
    if (lowerText.includes("план") || lowerText.includes("планир")) {
      selectedSubtasks = planningSubtasks;
    } else if (lowerText.includes("исслед") || lowerText.includes("анализ") || lowerText.includes("изуч")) {
      selectedSubtasks = researchSubtasks;
    } else if (lowerText.includes("разраб") || lowerText.includes("создан") || lowerText.includes("программ")) {
      selectedSubtasks = developmentSubtasks;
    } else if (lowerText.includes("пис") || lowerText.includes("статья") || lowerText.includes("текст") || lowerText.includes("документ")) {
      selectedSubtasks = writingSubtasks;
    } else if (lowerText.includes("организ") || lowerText.includes("управл") || lowerText.includes("координ")) {
      selectedSubtasks = organizationalSubtasks;
    } else if (lowerText.includes("убор") || lowerText.includes("чист") || lowerText.includes("порядок")) {
      selectedSubtasks = cleaningSubtasks;
    } else {
      // Default to organizational subtasks if no match
      selectedSubtasks = organizationalSubtasks;
    }
    
    return selectedSubtasks.map(title => ({
      id: Math.random().toString(36).substring(2, 9),
      title,
      completed: false
    }));
  };

  return (
    <TaskContext.Provider
      value={{ 
        tasks, 
        addTask, 
        updateTask, 
        deleteTask, 
        toggleTaskStatus, 
        getTaskById,
        addSubtask,
        removeSubtask,
        toggleSubtaskStatus,
        generateSubtasks,
        generateSubtasksFromText
      }}
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
