
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useTask, SubTask } from "@/contexts/TaskContext";
import SubtaskItem from "./SubtaskItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SubtaskListProps {
  taskId: string;
  subtasks: SubTask[];
  disabled?: boolean;
}

const SubtaskList: React.FC<SubtaskListProps> = ({ 
  taskId, 
  subtasks = [], 
  disabled = false 
}) => {
  const { addSubtask, removeSubtask, toggleSubtaskStatus } = useTask();
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSubtask = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (newSubtaskTitle.trim()) {
      addSubtask(taskId, newSubtaskTitle.trim());
      setNewSubtaskTitle("");
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSubtask(e);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      setIsAdding(false);
      setNewSubtaskTitle("");
    }
  };

  const startAdding = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubtaskTitle(e.target.value);
  };

  return (
    <div className="mt-1 space-y-1" onClick={e => e.stopPropagation()}>
      {subtasks.length > 0 && (
        <div className="pl-1">
          <div className="space-y-1">
            {subtasks.map((subtask) => (
              <SubtaskItem 
                key={subtask.id}
                subtask={subtask}
                onToggle={() => toggleSubtaskStatus(taskId, subtask.id)}
                onRemove={() => removeSubtask(taskId, subtask.id)}
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      )}

      {!disabled && (
        <div className="mt-2">
          {isAdding ? (
            <div className="flex items-center gap-2 mt-2" onClick={e => e.stopPropagation()}>
              <Input
                type="text"
                value={newSubtaskTitle}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onClick={e => e.stopPropagation()}
                placeholder="Название подзадачи"
                className="flex-1 h-8 text-sm"
                autoFocus
              />
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleAddSubtask}
                className="h-8"
                type="button"
              >
                Добавить
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={startAdding}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Plus className="h-4 w-4 mr-1" />
              Добавить подшаг
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SubtaskList;
