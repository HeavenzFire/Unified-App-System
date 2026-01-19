
import React, { useState } from 'react';
import AppCard from './AppCard';
import { CodeIcon } from './icons/CodeIcon';
import { generateText } from '../services/geminiService';

const CodeAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (prompt.trim() === '') return;
    setIsLoading(true);
    setCode('');
    const fullPrompt = `Generate a code snippet for the following request. Provide only the code, inside a markdown block. If a language isn't specified, choose a suitable one.\n\nRequest: "${prompt}"`;
    const result = await generateText(fullPrompt);
    setCode(result.replace(/```[a-z]*\n/,'').replace(/```/,'').trim());
    setIsLoading(false);
  };
  
  return (
    <AppCard title="Code Assistant" icon={<CodeIcon />}>
      <div className="flex flex-col h-full">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., a python function to reverse a string"
          rows={2}
          className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />
        <button onClick={handleGenerate} disabled={isLoading} className="w-full bg-cyan-600 hover:bg-cyan-500 rounded-md px-4 py-2 mb-4 transition text-white disabled:opacity-50">
          {isLoading ? 'Generating Code...' : 'Generate Code'}
        </button>
        <div className="flex-grow bg-slate-900/80 rounded-md p-1 overflow-auto border border-slate-700 min-h-[200px]">
           {isLoading && <div className="flex justify-center items-center h-full"><div className="w-8 h-8 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div></div>}
           {code && !isLoading && (
            <pre className="text-sm">
                <code className="text-gray-300 whitespace-pre-wrap">
                    {code}
                </code>
            </pre>
           )}
           {!code && !isLoading && <p className="text-slate-500 text-center pt-16">Your code will appear here.</p>}
        </div>
      </div>
    </AppCard>
  );
};

export default CodeAssistant;
