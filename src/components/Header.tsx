import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
const Header: React.FC = () => {
  return <header className="flex justify-between items-center py-4 mb-2 px-0">
      <div className="text-2xl font-bold text-foreground">Simp</div>
      <Link to="/profile">
        <Avatar className="h-10 w-10 cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="Пользователь" />
          <AvatarFallback>П</AvatarFallback>
        </Avatar>
      </Link>
    </header>;
};
export default Header;