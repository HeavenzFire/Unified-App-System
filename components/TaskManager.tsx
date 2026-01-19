
import React, { useState } from 'react';
import { Task } from '../types';
import AppCard from './AppCard';
import { CheckSquareIcon } from './icons/CheckSquareIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { PlusIcon } from './icons/PlusIcon';
import { Trash2Icon } from './icons/Trash2Icon';
import { generateText } from '../services/geminiService';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'System diagnostics', completed: true },
    { id: 2, text: 'Deploy core modules', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const suggestTask = async () => {
    setIsLoading(true);
    const existingTasks = tasks.map(t => `- ${t.text} (${t.completed ? 'done' : 'todo'})`).join('\n');
    const prompt = `Based on the following tasks, suggest a single, actionable next task. Be concise. The new task should not be in the list already.\n\nExisting Tasks:\n${existingTasks}\n\nSuggested Task:`;
    const suggestion = await generateText(prompt);
    if (!suggestion.startsWith("Error:")) {
      setNewTask(suggestion.replace(/\"/g, ""));
    }
    setIsLoading(false);
  };

  return (
    <AppCard title="Task Manager" icon={<CheckSquareIcon />}>
      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />
        <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 rounded-md p-2 transition text-white">
          <PlusIcon />
        </button>
      </form>
      <button 
        onClick={suggestTask} 
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 rounded-md p-2 mb-4 transition text-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed">
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <SparklesIcon />
            <span>Suggest Task</span>
          </>
        )}
      </button>
      <div className="space-y-2 overflow-y-auto max-h-60 pr-2">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center justify-between bg-slate-700/30 p-2 rounded-md">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} className="form-checkbox h-5 w-5 rounded bg-slate-600 border-slate-500 text-cyan-500 focus:ring-cyan-500"/>
              <span className={`${task.completed ? 'line-through text-slate-500' : ''}`}>{task.text}</span>
            </div>
            <button onClick={() => deleteTask(task.id)} className="text-slate-500 hover:text-red-500 transition">
              <Trash2Icon />
            </button>
          </div>
        ))}
      </div>
    </AppCard>
  );
};

export default TaskManager;
