
import React from "react";
import { format } from "date-fns";
import { useTask, Task, TaskCategory } from "@/contexts/TaskContext";
import TaskItem from "./TaskItem";
import { cn } from "@/lib/utils";

interface TaskListProps {
  category: TaskCategory;
}

const TaskList: React.FC<TaskListProps> = ({ category }) => {
  const { tasks } = useTask();
  const filteredTasks = tasks.filter((task) => task.category === category);

  const getCategoryColor = (category: TaskCategory) => {
    switch (category) {
      case "today":
        return "bg-today";
      case "tomorrow":
        return "bg-tomorrow";
      case "later":
        return "bg-later";
      default:
        return "bg-gray-300";
    }
  };

  const getCategoryLabel = (category: TaskCategory) => {
    switch (category) {
      case "today":
        return "Today";
      case "tomorrow":
        return "Tomorrow";
      case "later":
        return "Later";
      default:
        return category;
    }
  };

  const getDateSuffix = (category: TaskCategory) => {
    const now = new Date();
    let date;
    
    if (category === "today") {
      date = now;
    } else if (category === "tomorrow") {
      date = new Date(now);
      date.setDate(date.getDate() + 1);
    } else {
      return "";
    }
    
    const day = date.getDate();
    const suffix = format(date, "EEE");
    return `${day} ${suffix}`;
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className={cn("w-3 h-3 rounded-full", getCategoryColor(category))}></div>
          <h2 className="text-2xl font-bold">{getCategoryLabel(category)}</h2>
        </div>
        <div className="text-gray-500 text-lg">{getDateSuffix(category)}</div>
      </div>
      <div>
        {filteredTasks.length === 0 ? (
          <div className="text-gray-400 text-center py-4">No tasks scheduled</div>
        ) : (
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};

export default TaskList;
