
import React from "react";
import { Check, X } from "lucide-react";
import { SubTask } from "@/contexts/TaskContext";
import { cn } from "@/lib/utils";

interface SubtaskItemProps {
  subtask: SubTask;
  onToggle: () => void;
  onRemove: () => void;
  disabled?: boolean;
}

const SubtaskItem: React.FC<SubtaskItemProps> = ({ 
  subtask, 
  onToggle, 
  onRemove, 
  disabled = false 
}) => {
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      onToggle();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove();
  };

  return (
    <div className="flex items-center gap-2 py-2 group animate-fade-in" onClick={e => e.stopPropagation()}>
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-md border border-gray-300 dark:border-zinc-700 flex items-center justify-center transition-colors",
          subtask.completed ? "bg-[#e1edff] dark:bg-[#2b3658]" : "bg-[#f0f4ff] dark:bg-zinc-800",
          disabled && "opacity-60 cursor-not-allowed"
        )}
      >
        {subtask.completed && <Check className="h-4 w-4 text-gray-600 dark:text-gray-400" />}
      </button>
      
      <span className={cn(
        "flex-1 text-sm",
        subtask.completed && "line-through text-gray-400 dark:text-gray-500"
      )}>
        {subtask.title}
      </span>
      
      {!disabled && (
        <button 
          type="button"
          onClick={handleRemove}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SubtaskItem;
