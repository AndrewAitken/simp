
import React from "react";
import { useTask } from "@/contexts/TaskContext";
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import FloatingButton from "@/components/FloatingButton";

const Index = () => {
  const { tasks } = useTask();
  
  // Get focus tasks
  const focusTasks = tasks.filter(task => task.priority === "focus" && task.status !== "completed");
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 pb-24">
        <Header />
        
        {focusTasks.length > 0 && (
          <div className="mb-8">
            <h2 className="font-bold text-xl mb-4">Focus</h2>
            {focusTasks.map(task => (
              <div key={task.id} className="bg-gray-50 p-4 rounded-xl mb-2">
                <h3 className="font-medium">{task.title}</h3>
                {task.description && (
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
        
        <TaskList category="today" />
        <TaskList category="tomorrow" />
        <TaskList category="later" />
        
        <FloatingButton />
      </div>
    </div>
  );
};

export default Index;
