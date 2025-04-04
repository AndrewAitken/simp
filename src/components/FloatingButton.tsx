
import React from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingButton: React.FC = () => {
  return (
    <Link to="/new-task">
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors z-50">
        <Plus className="h-7 w-7" />
      </button>
    </Link>
  );
};

export default FloatingButton;
