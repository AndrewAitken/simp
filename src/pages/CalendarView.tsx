
import React, { useState } from "react";
import { useTask } from "@/contexts/TaskContext";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
import { ru } from "date-fns/locale";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CalendarView = () => {
  const { tasks } = useTask();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const todaysTasks = tasks.filter(task => 
    task.category === "today" && 
    task.status === "pending"
  );
  
  const goToPreviousMonth = () => setCurrentMonth(prevMonth => subMonths(prevMonth, 1));
  const goToNextMonth = () => setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto pb-24 px-[20px]">
        <div className="flex items-center justify-between py-4 mb-2">
          <Link to="/" className="flex items-center">
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </Link>
          <h1 className="text-xl font-bold text-foreground">Calendar</h1>
          <div className="w-6"></div> {/* Empty div to balance the header */}
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={goToPreviousMonth} className="p-2">
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <h2 className="text-xl font-bold text-foreground">{format(currentMonth, 'MMMM', { locale: ru })}</h2>
            <button onClick={goToNextMonth} className="p-2">
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
          
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="rounded-xl border-none w-full"
            classNames={{
              day_selected: "bg-blue-200 text-blue-900 dark:bg-blue-900 dark:text-blue-100",
              day_today: "bg-gray-100 text-gray-900 dark:bg-zinc-800 dark:text-gray-100"
            }}
          />
        </div>
        
        <h2 className="text-lg font-bold mb-4">Today</h2>
        
        {todaysTasks.length > 0 ? (
          <div className="space-y-4">
            {todaysTasks.map(task => (
              <Link to={`/edit-task/${task.id}`} key={task.id} className="block">
                <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 border border-gray-100 dark:border-zinc-700">
                  <h3 className="text-foreground font-medium">{task.title}</h3>
                  {task.time && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{task.time}</p>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">Нет задач</p>
        )}
        
        <div className="fixed bottom-6 left-0 right-0 mx-auto w-full max-w-md px-[20px]">
          <Button 
            className="w-full bg-gray-900 hover:bg-black text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full py-6"
            onClick={() => window.location.href = "/new-task"}
          >
            <span className="text-xl mr-2">+</span> New task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
