
import React, { useState } from 'react';
import AppCard from './AppCard';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { generateText } from '../services/geminiService';

const IdeaGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (topic.trim() === '') return;
    setIsLoading(true);
    setIdea('');
    const prompt = `Generate a creative and unique idea about "${topic}". Provide a short title and a one-paragraph description. Format it as: **Title:** [Your Title] \n\n [Your Description]`;
    const result = await generateText(prompt);
    setIdea(result);
    setIsLoading(false);
  };

  return (
    <AppCard title="Idea Generator" icon={<LightbulbIcon />}>
      <div className="flex flex-col h-full">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic..."
            className="flex-grow bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          />
          <button onClick={handleGenerate} disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-500 rounded-md px-4 py-2 transition text-white disabled:opacity-50">
            {isLoading ? '...' : 'Go'}
          </button>
        </div>
        <div className="flex-grow bg-slate-900/50 rounded-md p-3 overflow-y-auto border border-slate-700 min-h-[150px]">
          {isLoading && <div className="flex justify-center items-center h-full"><div className="w-8 h-8 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div></div>}
          {idea && !isLoading && (
            <div className="whitespace-pre-wrap text-gray-300" dangerouslySetInnerHTML={{ __html: idea.replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-400">$1</strong>') }}></div>
          )}
           {!idea && !isLoading && <p className="text-slate-500 text-center pt-8">Your next big idea awaits...</p>}
        </div>
      </div>
    </AppCard>
  );
};

export default IdeaGenerator;
