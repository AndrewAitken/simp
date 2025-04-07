
import React from "react";
import { Check } from "lucide-react";
import { useTask, Task } from "@/contexts/TaskContext";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task
}) => {
  const {
    toggleTaskStatus
  } = useTask();
  const navigate = useNavigate();
  
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTaskStatus(task.id);
  };
  
  const handleTaskClick = () => {
    navigate(`/edit-task/${task.id}`);
  };
  
  return (
    <div className="group mb-4 animate-fade-in">
      {task.time && <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{task.time}</div>}
      <div className="flex items-start gap-3 cursor-pointer" onClick={handleTaskClick}>
        <button 
          onClick={handleToggle} 
          className={cn(
            "flex-shrink-0 w-6 h-6 mt-0.5 rounded-full border border-gray-300 dark:border-zinc-700 flex items-center justify-center transition-colors", 
            task.status === "completed" ? "bg-gray-200 dark:bg-zinc-700" : "bg-white dark:bg-zinc-800"
          )}
        >
          {task.status === "completed" && <Check className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
        </button>
        <div className="flex-1">
          <h3 className={cn(
            "text-foreground",
            task.status === "completed" && "line-through text-gray-400 dark:text-gray-500"
          )}>
            {task.title}
          </h3>
          {task.description && 
            <p className={cn(
              "text-sm mt-1 line-clamp-2", 
              task.status === "completed" ? "text-gray-400 dark:text-gray-500 line-through" : "text-gray-600 dark:text-gray-400"
            )}>
              {task.description}
            </p>
          }
        </div>
      </div>
      <div className="mt-4 border-b border-gray-200 dark:border-zinc-800"></div>
    </div>
  );
};

export default TaskItem;
