import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
export type ReminderOption = "none" | "30min" | "1hour" | "2hours" | "1day" | "custom";
interface ReminderSelectorProps {
  value: ReminderOption;
  onChange: (option: ReminderOption) => void;
}
const ReminderSelector: React.FC<ReminderSelectorProps> = ({
  value,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (option: ReminderOption) => {
    onChange(option);
    setIsOpen(false);
  };
  const getDisplayText = (option: ReminderOption): string => {
    switch (option) {
      case "none":
        return "Без напоминания";
      case "30min":
        return "За 30 минут до события";
      case "1hour":
        return "За час до события";
      case "2hours":
        return "За два часа до события";
      case "1day":
        return "За день до события";
      case "custom":
        return "Свой вариант";
      default:
        return "Установить напоминание";
    }
  };
  return <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <Bell className="h-4 w-4 mr-2 text-foreground" />
          <span className={cn("text-sm", value !== "none" ? "text-foreground font-medium" : "text-gray-500 dark:text-gray-400")}>
            {value !== "none" ? getDisplayText(value) : "Напоминание (опционально)"}
          </span>
        </div>
      </SheetTrigger>
      <SheetContent side="bottom" className="pt-6 pb-10 rounded-t-xl bg-background dark:bg-zinc-950">
        <div className="px-0">
          <h3 className="text-center text-lg font-medium mb-6 text-foreground">Установить напоминание</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button variant="outline" className={cn("h-16 rounded-xl dark:bg-zinc-900 dark:text-white dark:border-zinc-700", value === "none" && "border-2 border-gray-300 dark:border-gray-600")} onClick={() => handleSelect("none")}>
              Без напоминания
            </Button>
            <Button variant="outline" className={cn("h-16 rounded-xl dark:bg-zinc-900 dark:text-white dark:border-zinc-700", value === "1hour" && "border-2 border-gray-300 dark:border-gray-600")} onClick={() => handleSelect("1hour")}>За час до</Button>
            <Button variant="outline" className={cn("h-16 rounded-xl dark:bg-zinc-900 dark:text-white dark:border-zinc-700", value === "2hours" && "border-2 border-gray-300 dark:border-gray-600")} onClick={() => handleSelect("2hours")}>За два часа до</Button>
            <Button variant="outline" className={cn("h-16 rounded-xl dark:bg-zinc-900 dark:text-white dark:border-zinc-700", value === "1day" && "border-2 border-gray-300 dark:border-gray-600")} onClick={() => handleSelect("1day")}>За день до </Button>
            <Button variant="outline" className={cn("h-16 rounded-xl dark:bg-zinc-900 dark:text-white dark:border-zinc-700", value === "30min" && "border-2 border-gray-300 dark:border-gray-600")} onClick={() => handleSelect("30min")}>
              За 30 минут
            </Button>
            <Button variant="outline" className={cn("h-16 rounded-xl dark:bg-zinc-900 dark:text-white dark:border-zinc-700", value === "custom" && "border-2 border-gray-300 dark:border-gray-600")} onClick={() => handleSelect("custom")}>
              Свой вариант
            </Button>
          </div>
          <Button className="w-full bg-black hover:bg-gray-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white py-6 rounded-xl" onClick={() => setIsOpen(false)}>
            Готово
          </Button>
        </div>
      </SheetContent>
    </Sheet>;
};
export default ReminderSelector;