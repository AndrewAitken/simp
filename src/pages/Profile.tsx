
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut, Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const {
    theme,
    setTheme
  } = useTheme();
  const [notifications, setNotifications] = useState(true);

  // Profile data states
  const [name, setName] = useState("Джон Доу");
  const [about, setAbout] = useState("Энтузиаст управления задачами");

  // Editing states
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempAbout, setTempAbout] = useState(about);

  // Handlers for name field
  const startEditingName = () => {
    setTempName(name);
    setIsEditingName(true);
  };
  const saveName = () => {
    setName(tempName);
    setIsEditingName(false);
  };
  const cancelEditName = () => {
    setIsEditingName(false);
  };

  // Handlers for about field
  const startEditingAbout = () => {
    setTempAbout(about);
    setIsEditingAbout(true);
  };
  const saveAbout = () => {
    setAbout(tempAbout);
    setIsEditingAbout(false);
  };
  const cancelEditAbout = () => {
    setIsEditingAbout(false);
  };

  // Handle sign out
  const handleSignOut = () => {
    // Here would be sign out logic when authentication is implemented
    console.log("Выход из системы");
    // For now just navigate to home
    navigate("/");
  };
  
  // Handle pro subscription
  const handleProUpgrade = () => {
    toast.info("Будет позже 🚀");
  };
  
  return <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 pb-12">
        <header className="flex items-center justify-between py-4 mb-6">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-4 text-foreground hover:text-gray-600 dark:hover:text-gray-300">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="font-bold text-foreground text-lg">Профиль</h1>
          </div>
        </header>

        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src="https://github.com/shadcn.png" alt="Пользователь" />
            <AvatarFallback>П</AvatarFallback>
          </Avatar>
          <h2 className="font-semibold text-foreground text-2xl">{name}</h2>
          <p className="text-gray-500 dark:text-gray-400">john.doe@example.com</p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-4">
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Имя</label>
                {isEditingName ? <div>
                    <Input type="text" value={tempName} onChange={e => setTempName(e.target.value)} className="w-full p-3 bg-white dark:bg-zinc-800 rounded-lg text-foreground mb-2" />
                    <div className="flex space-x-2">
                      <Button onClick={saveName} size="sm" variant="default">Сохранить</Button>
                      <Button onClick={cancelEditName} size="sm" variant="outline">Отмена</Button>
                    </div>
                  </div> : <div className="w-full p-3 bg-white dark:bg-zinc-800 rounded-lg text-foreground cursor-pointer" onClick={startEditingName}>
                    {name}
                  </div>}
              </div>
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">О себе</label>
                {isEditingAbout ? <div>
                    <Textarea value={tempAbout} onChange={e => setTempAbout(e.target.value)} className="w-full p-3 bg-white dark:bg-zinc-800 rounded-lg text-foreground mb-2" rows={2} />
                    <div className="flex space-x-2">
                      <Button onClick={saveAbout} size="sm" variant="default">Сохранить</Button>
                      <Button onClick={cancelEditAbout} size="sm" variant="outline">Отмена</Button>
                    </div>
                  </div> : <div className="w-full p-3 bg-white dark:bg-zinc-800 rounded-lg text-foreground resize-none cursor-pointer" onClick={startEditingAbout}>
                    {about}
                  </div>}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-4">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Темный режим</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Переключить темную/светлую тему</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={theme === "dark"} onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Уведомления</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Включить напоминания о задачах</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-4">
            <h3 className="mb-4 text-foreground text-base font-semibold">Тарифный план</h3>
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">Бесплатный план</p>
              <Button 
                className="w-full bg-black dark:bg-zinc-800 hover:bg-gray-800 dark:hover:bg-zinc-700 text-white py-[24px] rounded-xl" 
                onClick={handleProUpgrade}
              >
                Перейти на Про
              </Button>
            </div>
          </div>
          
          <Button onClick={handleSignOut} variant="destructive" className="w-full flex items-center justify-center py-[24px] rounded-xl">
            <LogOut className="mr-2 h-4 w-4" />
            Выйти из системы
          </Button>
        </div>
      </div>
    </div>;
};
export default Profile;
