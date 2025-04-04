import React from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
const FloatingButton: React.FC = () => {
  return <Link to="/new-task">
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors">
        <Plus className="h-6 w-6" />
      </button>
    </Link>;
};
export default FloatingButton;