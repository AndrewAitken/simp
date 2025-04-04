
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent,
  SheetTrigger 
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type ReminderOption = "none" | "30min" | "1hour" | "2hours" | "1day" | "custom";

interface ReminderSelectorProps {
  value: ReminderOption;
  onChange: (option: ReminderOption) => void;
}

const ReminderSelector: React.FC<ReminderSelectorProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: ReminderOption) => {
    onChange(option);
    setIsOpen(false);
  };

  const getDisplayText = (option: ReminderOption): string => {
    switch (option) {
      case "none":
        return "No reminder";
      case "30min":
        return "30 minutes before";
      case "1hour":
        return "In an hour";
      case "2hours": 
        return "In two hours";
      case "1day":
        return "A day before";
      case "custom":
        return "Custom";
      default:
        return "Set reminder";
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <Bell className="h-4 w-4 mr-2" />
          <span className={cn("text-sm", value !== "none" ? "text-black font-medium" : "text-gray-500")}>
            {value !== "none" ? getDisplayText(value) : "Reminder (optional)"}
          </span>
        </div>
      </SheetTrigger>
      <SheetContent side="bottom" className="pt-6 pb-10 rounded-t-xl">
        <div className="px-4">
          <h3 className="text-center text-2xl font-medium mb-6">Set Reminder</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button
              variant="outline"
              className={cn(
                "h-16 rounded-xl", 
                value === "none" && "border-2 border-gray-300"
              )}
              onClick={() => handleSelect("none")}
            >
              No Reminder
            </Button>
            <Button
              variant="outline"
              className={cn(
                "h-16 rounded-xl", 
                value === "1hour" && "border-2 border-gray-300"
              )}
              onClick={() => handleSelect("1hour")}
            >
              In an Hour
            </Button>
            <Button
              variant="outline"
              className={cn(
                "h-16 rounded-xl", 
                value === "2hours" && "border-2 border-gray-300"
              )}
              onClick={() => handleSelect("2hours")}
            >
              In Two Hours
            </Button>
            <Button
              variant="outline"
              className={cn(
                "h-16 rounded-xl", 
                value === "1day" && "border-2 border-gray-300"
              )}
              onClick={() => handleSelect("1day")}
            >
              Day Before
            </Button>
            <Button
              variant="outline"
              className={cn(
                "h-16 rounded-xl", 
                value === "30min" && "border-2 border-gray-300"
              )}
              onClick={() => handleSelect("30min")}
            >
              30 Minutes Before
            </Button>
            <Button
              variant="outline"
              className={cn(
                "h-16 rounded-xl", 
                value === "custom" && "border-2 border-gray-300"
              )}
              onClick={() => handleSelect("custom")}
            >
              Custom
            </Button>
          </div>
          <Button
            className="w-full bg-sky-400 hover:bg-sky-500 text-white py-6 rounded-xl"
            onClick={() => setIsOpen(false)}
          >
            Done
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ReminderSelector;
