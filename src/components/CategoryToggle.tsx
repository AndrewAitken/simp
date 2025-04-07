
import React from "react";
import { cn } from "@/lib/utils";
import { TaskCategory } from "@/contexts/TaskContext";

interface CategoryToggleProps {
  value: TaskCategory;
  onChange: (category: TaskCategory) => void;
  autoSubmit?: boolean;
}

const CategoryToggle: React.FC<CategoryToggleProps> = ({ 
  value, 
  onChange,
  autoSubmit = false
}) => {
  const handleCategoryChange = (category: TaskCategory) => {
    onChange(category);
  };

  return (
    <div className="flex space-x-2 mb-6">
      <button
        type="button"
        onClick={() => handleCategoryChange("today")}
        className={cn(
          "flex items-center px-4 py-2 rounded-full border transition-colors",
          value === "today"
            ? "bg-today/10 border-today/30 text-today"
            : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-zinc-700 dark:text-gray-400 dark:hover:bg-zinc-800"
        )}
      >
        <div className="w-2 h-2 rounded-full bg-today mr-2"></div>
        Сегодня
      </button>
      <button
        type="button"
        onClick={() => handleCategoryChange("tomorrow")}
        className={cn(
          "flex items-center px-4 py-2 rounded-full border transition-colors",
          value === "tomorrow"
            ? "bg-tomorrow/10 border-tomorrow/30 text-tomorrow"
            : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-zinc-700 dark:text-gray-400 dark:hover:bg-zinc-800"
        )}
      >
        <div className="w-2 h-2 rounded-full bg-tomorrow mr-2"></div>
        Завтра
      </button>
      <button
        type="button"
        onClick={() => handleCategoryChange("later")}
        className={cn(
          "flex items-center px-4 py-2 rounded-full border transition-colors",
          value === "later"
            ? "bg-later/10 border-later/30 text-later"
            : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-zinc-700 dark:text-gray-400 dark:hover:bg-zinc-800"
        )}
      >
        <div className="w-2 h-2 rounded-full bg-later mr-2"></div>
        Позже
      </button>
    </div>
  );
};

export default CategoryToggle;
