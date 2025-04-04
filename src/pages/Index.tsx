
import React from "react";
import { TaskProvider } from "@/contexts/TaskContext";
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import FloatingButton from "@/components/FloatingButton";

const Index = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-white pb-20">
        <div className="max-w-md mx-auto px-4">
          <Header />
          <main>
            <TaskList category="today" />
            <TaskList category="tomorrow" />
            <TaskList category="later" />
          </main>
          <FloatingButton />
        </div>
      </div>
    </TaskProvider>
  );
};

export default Index;
