
import React from "react";
import { useTask } from "@/contexts/TaskContext";
import TaskItem from "./TaskItem";

interface TaskListProps {
  category: "today" | "tomorrow" | "later";
}

const TaskList: React.FC<TaskListProps> = ({ category }) => {
  const { tasks } = useTask();

  // Filter tasks based on category (exclude focus tasks from regular lists)
  const filteredTasks = tasks.filter(task => 
    task.category === category && 
    !(category === "today" && task.priority === "focus")
  );
  
  // Sort tasks: tasks without time first, then by time
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // If only one has time, the one without time comes first
    if (!a.time && b.time) return -1;
    if (a.time && !b.time) return 1;
    
    // If both have time or both don't have time, maintain current order
    return 0;
  });

  // Translate category titles to Russian
  const categoryTitles = {
    today: "Сегодня",
    tomorrow: "Завтра",
    later: "Позже"
  };

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-foreground text-xl font-bold">
        {categoryTitles[category]}
      </h2>
      {sortedTasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">Нет задач</p>
      ) : (
        sortedTasks.map(task => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;
