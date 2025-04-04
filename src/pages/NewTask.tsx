
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTask, TaskCategory, TaskPriority } from "@/contexts/TaskContext";
import { toast } from "sonner";
import CategoryToggle from "@/components/CategoryToggle";

const NewTask = () => {
  const navigate = useNavigate();
  const { addTask } = useTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState<TaskCategory>("today");
  const [priority, setPriority] = useState<TaskPriority>("normal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a task title");
      return;
    }
    
    addTask({
      title,
      description: description || undefined,
      time: time || undefined,
      category,
      priority,
    });
    
    toast.success("Task created successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4">
        <header className="py-4 mb-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="mr-2"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold">Create new task</h1>
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Task title"
                className="text-xl font-medium border-none shadow-none focus-visible:ring-0 p-0 h-auto placeholder:text-gray-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </div>

            <div>
              <Textarea
                placeholder="Add description (optional)"
                className="min-h-24 border-none shadow-none focus-visible:ring-0 p-0 resize-none placeholder:text-gray-400"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center text-gray-500 mb-2">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">Time (optional)</span>
              </div>
              <Input
                type="time"
                className="border rounded-md p-2"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div>
              <CategoryToggle value={category} onChange={setCategory} />
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-gray-800 text-white py-6 rounded-xl"
              >
                Create Task
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
