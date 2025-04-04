
import React from "react";
import { Check } from "lucide-react";
import { useTask, Task } from "@/contexts/TaskContext";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskStatus } = useTask();

  const handleToggle = () => {
    toggleTaskStatus(task.id);
  };

  return (
    <div className="group mb-8 animate-fade-in">
      {task.time && (
        <div className="text-sm text-gray-500 mb-2">{task.time}</div>
      )}
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          className={cn(
            "flex-shrink-0 w-6 h-6 mt-0.5 rounded-full border border-gray-300 flex items-center justify-center transition-colors",
            task.status === "completed" ? "bg-gray-200" : "bg-white"
          )}
        >
          {task.status === "completed" && (
            <Check className="h-4 w-4 text-gray-500" />
          )}
        </button>
        <div className="flex-1">
          <h3
            className={cn(
              "text-xl font-medium transition-all group-hover:text-black",
              task.status === "completed"
                ? "text-gray-400 line-through"
                : "text-gray-800"
            )}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={cn(
                "text-sm mt-1",
                task.status === "completed"
                  ? "text-gray-400 line-through"
                  : "text-gray-600"
              )}
            >
              {task.description}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 border-b border-gray-200"></div>
    </div>
  );
};

export default TaskItem;
