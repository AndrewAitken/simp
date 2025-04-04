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
          <div className="flex items-center text-gray-500 mb-2 cursor-pointer">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {value ? `Time: ${displayHour}:${String(minutes).padStart(2, "0")} ${period}` : "Time (optional)"}
            </span>
          </div>
        </DrawerTrigger>
        <DrawerContent className="max-w-full sm:max-w-md mx-auto">
          <div className="p-4">
            <h3 className="text-center text-2xl font-medium mb-6">Select time</h3>
            <div className="flex items-center justify-center mb-8">
              <div className="relative flex items-center justify-center">
                <div className="flex items-center justify-center text-5xl">
                  <div className="flex flex-col items-center mx-2">
                    <button className="text-gray-300 hover:text-gray-600" onClick={() => handleHourChange(displayHour + 1)}>
                      {displayHour === 12 ? 1 : displayHour + 1}
                    </button>
                    <button className="text-black text-6xl font-bold my-4">
                      {String(displayHour).padStart(2, "0")}
                    </button>
                    <button className="text-gray-300 hover:text-gray-600" onClick={() => handleHourChange(displayHour - 1 || 12)}>
                      {displayHour === 1 ? 12 : displayHour - 1}
                    </button>
                  </div>
                  <div className="text-5xl font-bold mx-2">:</div>
                  <div className="flex flex-col items-center mx-2">
                    <button className="text-gray-300 hover:text-gray-600" onClick={() => handleMinuteChange((minutes + 5) % 60)}>
                      {String((minutes + 5) % 60).padStart(2, "0")}
                    </button>
                    <button className="text-black text-6xl font-bold my-4">
                      {String(minutes).padStart(2, "0")}
                    </button>
                    <button className="text-gray-300 hover:text-gray-600" onClick={() => handleMinuteChange((minutes - 5 + 60) % 60)}>
                      {String((minutes - 5 + 60) % 60).padStart(2, "0")}
                    </button>
                  </div>
                  <div className="ml-6">
                    <button className={cn("block w-20 py-2 text-xl rounded-md mb-2", period === "AM" ? "bg-gray-100 font-bold" : "text-gray-400")} onClick={() => period !== "AM" && handlePeriodToggle()}>
                      AM
                    </button>
                    <button className={cn("block w-20 py-2 text-xl rounded-md", period === "PM" ? "bg-gray-100 font-bold" : "text-gray-400")} onClick={() => period !== "PM" && handlePeriodToggle()}>
                      PM
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsOpen(false)} className="w-[49%] py-6 rounded-xl">
                Cancel
              </Button>
              <Button onClick={handleSave} className="w-[49%] bg-sky-400 hover:bg-sky-500 text-white py-6 rounded-xl">
                Save
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>;
};
export default TimePicker;