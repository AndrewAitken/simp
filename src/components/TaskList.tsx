
import React from "react";
import { useTask } from "@/contexts/TaskContext";
import TaskItem from "./TaskItem";
interface TaskListProps {
  category: "today" | "tomorrow" | "later";
}
const TaskList: React.FC<TaskListProps> = ({
  category
}) => {
  const {
    tasks
  } = useTask();

  // Filter tasks based on category (exclude focus tasks from regular lists)
  const filteredTasks = tasks.filter(task => task.category === category && !(category === "today" && task.priority === "focus"));

  // Translate category titles to Russian
  const categoryTitles = {
    today: "Сегодня",
    tomorrow: "Завтра",
    later: "Позже"
  };
  
  // Color classes for category circles
  const circleColors = {
    today: "bg-today",
    tomorrow: "bg-tomorrow",
    later: "bg-later"
  };
  
  return <div className="mb-8">
      <h2 className="font-bold mb-2 text-foreground text-base flex items-center">
        <div className={`w-3 h-3 rounded-full ${circleColors[category]} mr-2`}></div>
        {categoryTitles[category]}
      </h2>
      {filteredTasks.length === 0 ? <p className="text-gray-500 dark:text-gray-400 text-center py-4">Нет задач</p> : filteredTasks.map(task => <TaskItem key={task.id} task={task} />)}
    </div>;
};
export default TaskList;
