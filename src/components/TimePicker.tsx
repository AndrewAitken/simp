
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
}
const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState(() => {
    if (value) {
      const [h] = value.split(":");
      return parseInt(h, 10);
    }
    return new Date().getHours();
  });
  const [minutes, setMinutes] = useState(() => {
    if (value) {
      const [, m] = value.split(":");
      return parseInt(m, 10);
    }
    return 0;
  });
  const [period, setPeriod] = useState(() => {
    if (value) {
      const [h] = value.split(":");
      return parseInt(h, 10) >= 12 ? "PM" : "AM";
    }
    return new Date().getHours() >= 12 ? "PM" : "AM";
  });
  const formatDisplayHour = (h: number): number => {
    if (period === "AM") {
      return h === 0 ? 12 : h;
    }
    return h === 12 ? 12 : h - 12;
  };
  const handleSave = () => {
    let h = hours;
    if (period === "PM" && h < 12) {
      h += 12;
    } else if (period === "AM" && h === 12) {
      h = 0;
    }
    const formattedTime = `${String(h).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    onChange(formattedTime);
    setIsOpen(false);
  };
  const handleHourChange = (newHour: number) => {
    if (newHour >= 1 && newHour <= 12) {
      setHours(period === "AM" ? newHour === 12 ? 0 : newHour : newHour === 12 ? 12 : newHour + 12);
    }
  };
  const handleMinuteChange = (newMinute: number) => {
    if (newMinute >= 0 && newMinute <= 59) {
      setMinutes(newMinute);
    }
  };
  const handlePeriodToggle = () => {
    const newPeriod = period === "AM" ? "PM" : "AM";
    setPeriod(newPeriod);

    // Adjust hours based on period change
    if (newPeriod === "PM" && hours < 12) {
      setHours(hours + 12);
    } else if (newPeriod === "AM" && hours >= 12) {
      setHours(hours - 12);
    }
  };
  const displayHour = formatDisplayHour(hours);
  return <div>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <div className="flex items-center cursor-pointer">
            <Clock className="h-4 w-4 mr-2 text-foreground" />
            <span className={cn("text-sm", value ? "text-foreground font-medium" : "text-gray-500 dark:text-gray-400")}>
              {value ? `Время: ${displayHour}:${String(minutes).padStart(2, "0")} ${period}` : "Время (опционально)"}
            </span>
          </div>
        </DrawerTrigger>
        <DrawerContent className="max-w-full sm:max-w-md mx-auto bg-background dark:bg-zinc-950">
          <div className="p-4">
            
            <div className="flex items-center justify-center mb-8">
              <div className="relative flex items-center justify-center">
                <div className="flex items-center justify-center text-5xl">
                  <div className="flex flex-col items-center mx-2">
                    <button className="text-gray-300 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-300" onClick={() => handleHourChange(displayHour + 1)}>
                      {displayHour === 12 ? 1 : displayHour + 1}
                    </button>
                    <button className="text-foreground text-6xl font-bold my-4">
                      {String(displayHour).padStart(2, "0")}
                    </button>
                    <button className="text-gray-300 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-300" onClick={() => handleHourChange(displayHour - 1 || 12)}>
                      {displayHour === 1 ? 12 : displayHour - 1}
                    </button>
                  </div>
                  <div className="text-5xl font-bold mx-2 text-foreground">:</div>
                  <div className="flex flex-col items-center mx-2">
                    <button className="text-gray-300 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-300" onClick={() => handleMinuteChange((minutes + 5) % 60)}>
                      {String((minutes + 5) % 60).padStart(2, "0")}
                    </button>
                    <button className="text-foreground text-6xl font-bold my-4">
                      {String(minutes).padStart(2, "0")}
                    </button>
                    <button className="text-gray-300 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-300" onClick={() => handleMinuteChange((minutes - 5 + 60) % 60)}>
                      {String((minutes - 5 + 60) % 60).padStart(2, "0")}
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsOpen(false)} className="w-[49%] py-6 rounded-xl border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-200">
                Отмена
              </Button>
              <Button onClick={handleSave} className="w-[49%] bg-black hover:bg-gray-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white py-6 rounded-xl">
                Сохранить
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>;
};
export default TimePicker;
