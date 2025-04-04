
import React from "react";
import { cn } from "@/lib/utils";
import { TaskCategory } from "@/contexts/TaskContext";

interface CategoryToggleProps {
  value: TaskCategory;
  onChange: (category: TaskCategory) => void;
}

const CategoryToggle: React.FC<CategoryToggleProps> = ({ value, onChange }) => {
  return (
    <div className="flex space-x-2 mb-6">
      <button
        onClick={() => onChange("today")}
        className={cn(
          "flex items-center px-4 py-2 rounded-full border transition-colors",
          value === "today"
            ? "bg-today/10 border-today/30 text-today"
            : "border-gray-200 text-gray-600 hover:bg-gray-50"
        )}
      >
        <div className="w-2 h-2 rounded-full bg-today mr-2"></div>
        Today
      </button>
      <button
        onClick={() => onChange("tomorrow")}
        className={cn(
          "flex items-center px-4 py-2 rounded-full border transition-colors",
          value === "tomorrow"
            ? "bg-tomorrow/10 border-tomorrow/30 text-tomorrow"
            : "border-gray-200 text-gray-600 hover:bg-gray-50"
        )}
      >
        <div className="w-2 h-2 rounded-full bg-tomorrow mr-2"></div>
        Tomorrow
      </button>
      <button
        onClick={() => onChange("later")}
        className={cn(
          "flex items-center px-4 py-2 rounded-full border transition-colors",
          value === "later"
            ? "bg-later/10 border-later/30 text-later"
            : "border-gray-200 text-gray-600 hover:bg-gray-50"
        )}
      >
        <div className="w-2 h-2 rounded-full bg-later mr-2"></div>
        Later
      </button>
    </div>
  );
};

export default CategoryToggle;
