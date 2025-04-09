import React from "react";
import { useTask } from "@/contexts/TaskContext";
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import FloatingButton from "@/components/FloatingButton";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const {
    tasks
  } = useTask();
  const navigate = useNavigate();

  // Get focus tasks (all that have priority='focus' and status='pending')
  // Limit to 3 tasks
  const focusTasks = tasks.filter(task => task.priority === "focus" && task.status !== "completed").slice(0, 3);
  const handleTaskClick = (id: string) => {
    navigate(`/edit-task/${id}`);
  };
  return <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto pb-24 px-[20px]">
        <Header />
        
        {focusTasks.length > 0 && <div className="mb-8">
            <h2 className="font-bold mb-4 text-foreground text-lg">Фокус</h2>
            {focusTasks.map(task => <div key={task.id} onClick={() => handleTaskClick(task.id)} className="p-4 rounded-xl mb-2 cursor-pointer bg-[D3DEFF] bg-[#d3deff]">
                <h3 className="text-foreground text-lg font-semibold">{task.title}</h3>
              </div>)}
          </div>}
        
        <TaskList category="today" />
        <TaskList category="tomorrow" />
        <TaskList category="later" />
        
        <FloatingButton />
      </div>
    </div>;
};
export default Index;