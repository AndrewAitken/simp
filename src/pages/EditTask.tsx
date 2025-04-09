import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Focus, Trash, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTask, TaskCategory, TaskPriority, ReminderOption } from "@/contexts/TaskContext";
import { toast } from "sonner";
import CategoryToggle from "@/components/CategoryToggle";
import TimePicker from "@/components/TimePicker";
import ReminderSelector from "@/components/ReminderSelector";
import SubtaskList from "@/components/SubtaskList";
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
const EditTask = () => {
  const navigate = useNavigate();
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    getTaskById,
    updateTask,
    deleteTask,
    generateSubtasks
  } = useTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState<TaskCategory>("today");
  const [isFocusTask, setIsFocusTask] = useState(false);
  const [reminder, setReminder] = useState<ReminderOption>("none");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subtasks, setSubtasks] = useState<{
    id: string;
    title: string;
    completed: boolean;
  }[]>([]);
  const [isGeneratingSubtasks, setIsGeneratingSubtasks] = useState(false);
  useEffect(() => {
    if (!id) return;
    const task = getTaskById(id);
    if (!task) {
      toast.error("Задача не найдена");
      navigate("/");
      return;
    }
    setTitle(task.title);
    setDescription(task.description || "");
    setTime(task.time || "");
    setCategory(task.category);
    setIsFocusTask(task.priority === "focus");
    setReminder(task.reminder || "none");
    setSubtasks(task.subtasks || []);
  }, [id, getTaskById, navigate]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (!title.trim()) {
      toast.error("Пожалуйста, введите название задачи");
      return;
    }
    updateTask(id, {
      title,
      description: description || undefined,
      time: time || undefined,
      category,
      priority: isFocusTask ? "focus" : "normal",
      reminder: reminder !== "none" ? reminder : undefined,
      subtasks: subtasks
    });
    toast.success("Задача успешно обновлена");
    navigate("/");
  };
  const handleDelete = () => {
    if (!id) return;
    deleteTask(id);
    toast.success("Задача успешно удалена");
    navigate("/");
  };
  const handleGenerateSubtasks = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!title.trim()) {
      toast.error("Для генерации подшагов укажите название задачи");
      return;
    }
    try {
      setIsGeneratingSubtasks(true);
      if (id) {
        const generatedSubtasks = await generateSubtasks(id, title, description);
        setSubtasks(prev => [...prev, ...generatedSubtasks]);
        toast.success("Подшаги успешно сгенерированы");
      }
    } catch (error) {
      console.error("Error generating subtasks:", error);
      toast.error("Ошибка при генерации подшагов");
    } finally {
      setIsGeneratingSubtasks(false);
    }
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  return <div className="min-h-screen bg-background" onClick={e => e.stopPropagation()}>
      <div className="max-w-md mx-auto px-4">
        <header className="py-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="mr-2 text-foreground">
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <h1 className="text-lg text-foreground font-semibold">Редактирование задачи</h1>
            </div>
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-red-500">
                  <Trash className="h-5 w-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-background border-border">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-foreground">Удалить задачу</AlertDialogTitle>
                  <AlertDialogDescription className="text-muted-foreground">
                    Вы уверены, что хотите удалить эту задачу? Это действие нельзя отменить.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-background text-foreground border-border hover:bg-accent">Отмена</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                    Удалить
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </header>

        <form onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
          <div className="space-y-6">
            <div>
              <Input type="text" placeholder="Название задачи" value={title} onChange={e => setTitle(e.target.value)} autoFocus className="text-xl font-medium shadow-none focus-visible:ring-0 h-auto placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-background text-foreground" />
            </div>

            <div>
              <Textarea placeholder="Добавить описание (опционально)" className="min-h-24 shadow-none focus-visible:ring-0 placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-background text-foreground" value={description} onChange={handleTextareaChange} onClick={e => e.stopPropagation()} />
            </div>
            
            {/* Subtasks section */}
            {id && <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Подшаги
                  </h4>
                  <Button variant="outline" size="sm" onClick={handleGenerateSubtasks} disabled={isGeneratingSubtasks} className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Сгенерировать</span>
                  </Button>
                </div>
                <SubtaskList taskId={id} subtasks={subtasks} />
              </div>}

            <div className="border-t border-gray-100 dark:border-zinc-800 pt-4">
              <TimePicker value={time} onChange={setTime} />
            </div>

            <div className="border-t border-gray-100 dark:border-zinc-800 pt-4">
              <ReminderSelector value={reminder} onChange={setReminder} />
            </div>

            <div className="border-t border-gray-100 dark:border-zinc-800 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Focus className="h-4 w-4 mr-2 text-foreground" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Фокусная задача</span>
                </div>
                <Switch checked={isFocusTask} onCheckedChange={setIsFocusTask} />
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-zinc-800 pt-4">
              <CategoryToggle value={category} onChange={setCategory} />
            </div>

            <div className="flex justify-center pt-4 py-[24px]">
              <Button type="submit" className="w-full bg-black hover:bg-gray-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white py-6 rounded-xl">
                Сохранить изменения
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>;
};
export default EditTask;