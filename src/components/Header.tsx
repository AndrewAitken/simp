
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Calendar as CalendarIcon } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center py-4 mb-2 px-0">
      <div className="text-2xl font-bold text-foreground">
        <img src="/lovable-uploads/43c540d2-01b0-4879-a770-0926745516a9.png" alt="Simp" className="h-8" />
      </div>
      <div className="flex items-center gap-4">
        <Link to="/calendar" className="rounded-full p-2 bg-gray-100 dark:bg-zinc-800">
          <CalendarIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </Link>
        <Link to="/profile">
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="Пользователь" />
            <AvatarFallback>П</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
};

export default Header;
