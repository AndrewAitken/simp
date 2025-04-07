
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const FloatingButton = () => {
  const navigate = useNavigate();
  
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button 
        className="h-14 w-14 rounded-full bg-black dark:bg-zinc-800 hover:bg-gray-800 dark:hover:bg-zinc-700 shadow-xl" 
        onClick={() => navigate("/new-task")}
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Создать задачу</span>
      </Button>
    </div>
  );
};

export default FloatingButton;
