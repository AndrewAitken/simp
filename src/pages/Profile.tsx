import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";
const Profile = () => {
  const navigate = useNavigate();
  const {
    theme,
    setTheme
  } = useTheme();
  const [notifications, setNotifications] = useState(true);
  return <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 pb-12">
        <header className="flex items-center justify-between py-4 mb-6">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-4 text-foreground hover:text-gray-600 dark:hover:text-gray-300">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-foreground">Profile</h1>
          </div>
        </header>

        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold text-foreground">John Doe</h2>
          <p className="text-gray-500 dark:text-gray-400">john.doe@example.com</p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-4">
            <h3 className="text-lg font-medium mb-4 text-foreground">Personal Data</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Name</label>
                <input type="text" value="John Doe" className="w-full p-3 bg-white dark:bg-zinc-800 rounded-lg text-foreground" readOnly />
              </div>
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">About</label>
                <textarea value="Task management enthusiast" className="w-full p-3 bg-white dark:bg-zinc-800 rounded-lg text-foreground resize-none" readOnly rows={2} />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-4">
            <h3 className="text-lg font-medium mb-4 text-foreground">Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Dark Mode</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark/light theme</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={theme === "dark"} onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Enable task reminders</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-4">
            <h3 className="text-lg font-medium mb-4 text-foreground">Billing</h3>
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">Free Plan</p>
              <Button className="w-full bg-black dark:bg-zinc-800 hover:bg-gray-800 dark:hover:bg-zinc-700 text-white">Upgrade to Pro</Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Profile;