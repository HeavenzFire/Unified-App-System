
import React, { useState } from 'react';
import AppCard from './AppCard';
import { FileTextIcon } from './icons/FileTextIcon';
import { generateText } from '../services/geminiService';

const TextSummarizer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (inputText.trim().length < 50) {
      setSummary("Please provide a longer text to summarize.");
      return;
    }
    setIsLoading(true);
    setSummary('');
    const prompt = `Summarize the following text into a few key points:\n\n---\n${inputText}\n---\n\nSummary:`;
    const result = await generateText(prompt);
    setSummary(result);
    setIsLoading(false);
  };

  return (
    <AppCard title="Text Summarizer" icon={<FileTextIcon />}>
      <div className="flex flex-col h-full gap-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste text here to summarize..."
          rows={6}
          className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />
        <button onClick={handleSummarize} disabled={isLoading} className="w-full bg-cyan-600 hover:bg-cyan-500 rounded-md py-2 transition text-white disabled:opacity-50">
          {isLoading ? 'Summarizing...' : 'Summarize'}
        </button>
        <div className="flex-grow bg-slate-900/50 rounded-md p-3 overflow-y-auto border border-slate-700 min-h-[150px]">
          {isLoading && <div className="flex justify-center items-center h-full"><div className="w-8 h-8 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div></div>}
          {summary && !isLoading && <p className="whitespace-pre-wrap text-gray-300">{summary}</p>}
          {!summary && !isLoading && <p className="text-slate-500 text-center pt-12">Summary will be generated here.</p>}
        </div>
      </div>
    </AppCard>
  );
};

export default TextSummarizer;
