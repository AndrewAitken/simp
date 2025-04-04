import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Header: React.FC = () => {
  return <header className="flex justify-between items-center py-4 mb-2 px-0">
      <div className="text-3xl font-bold">Simp</div>
      <Avatar className="h-10 w-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </header>;
};
export default Header;