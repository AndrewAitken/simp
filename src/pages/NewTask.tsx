
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Focus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTask, TaskCategory, TaskPriority, ReminderOption, SubTask } from "@/contexts/TaskContext";
import { toast } from "sonner";
import CategoryToggle from "@/components/CategoryToggle";
import TimePicker from "@/components/TimePicker";
import ReminderSelector from "@/components/ReminderSelector";
import { Switch } from "@/components/ui/switch";
import SubtaskList from "@/components/SubtaskList";

const NewTask = () => {
  const navigate = useNavigate();
  const { addTask } = useTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState<TaskCategory>("today");
  const [isFocusTask, setIsFocusTask] = useState(false);
  const [reminder, setReminder] = useState<ReminderOption>("none");
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);
  
  // Generate temporary task ID for subtask management
  const [tempTaskId] = useState(`temp-${Math.random().toString(36).substring(2, 9)}`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Пожалуйста, введите название задачи");
      return;
    }
    
    addTask({
      title,
      description: description || undefined,
      time: time || undefined,
      category,
      priority: isFocusTask ? "focus" : "normal",
      reminder: reminder !== "none" ? reminder : undefined,
      subtasks: subtasks
    });
    
    toast.success("Задача успешно создана");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4">
        <header className="py-4 mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="mr-2 text-foreground">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="font-bold text-lg text-foreground">Создать новую задачу</h1>
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Input 
                type="text" 
                placeholder="Название задачи" 
                className="text-xl font-medium shadow-none focus-visible:ring-0 h-auto placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-background text-foreground" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                autoFocus 
              />
            </div>

            <div>
              <Textarea 
                placeholder="Добавить описание (опционально)" 
                className="min-h-24 shadow-none focus-visible:ring-0 placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-background text-foreground resize-none" 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
              />
            </div>
            
            {/* Subtasks section */}
            <SubtaskList taskId={tempTaskId} subtasks={subtasks} />

            <div className="border-t border-gray-100 dark:border-zinc-800 pt-4">
              <TimePicker value={time} onChange={setTime} />
            </div>

            <div className="border-t border-gray-100 dark:border-zinc-800 pt-4">
              <ReminderSelector value={reminder} onChange={setReminder} />
            </div>

            <div className="border-t border-gray-100 dark:border-zinc-800 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Focus className="h-4 w-4 mr-2 text-foreground" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Фокусная задача</span>
                </div>
                <Switch 
                  checked={isFocusTask}
                  onCheckedChange={setIsFocusTask}
                />
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-zinc-800 pt-4">
              <CategoryToggle value={category} onChange={setCategory} />
            </div>

            <div className="flex justify-center pt-4">
              <Button type="submit" className="w-full bg-black hover:bg-gray-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white py-6 rounded-xl">
                Создать задачу
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
