
import React, { useState } from 'react';
import AppCard from './AppCard';
import { ImageIcon } from './icons/ImageIcon';
import { generateImage } from '../services/geminiService';

const ImageInspirer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (prompt.trim() === '') return;
    setIsLoading(true);
    setError(null);
    setImageUrl(null);
    const result = await generateImage(prompt);
    if (result) {
      setImageUrl(result);
    } else {
      setError("Failed to generate image. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <AppCard title="Image Inspirer" icon={<ImageIcon />}>
      <div className="flex flex-col md:flex-row gap-4 h-full">
        <div className="md:w-1/3 flex flex-col gap-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A futuristic city skyline at dusk, neon lights, flying vehicles..."
            rows={4}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition flex-grow"
          />
          <button onClick={handleGenerate} disabled={isLoading} className="w-full bg-cyan-600 hover:bg-cyan-500 rounded-md py-3 transition text-white disabled:opacity-50">
            {isLoading ? 'Generating...' : 'Generate Image'}
          </button>
        </div>
        <div className="md:w-2/3 flex-grow bg-slate-900/50 rounded-md p-4 overflow-hidden border border-slate-700 flex items-center justify-center min-h-[300px]">
          {isLoading && (
            <div className="text-center text-slate-400">
              <div className="w-12 h-12 mx-auto border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
              <p className="mt-4">Initializing visual cortex...</p>
            </div>
          )}
          {error && !isLoading && <p className="text-red-500">{error}</p>}
          {!isLoading && imageUrl && (
             <img src={imageUrl} alt={prompt} className="w-full h-full object-contain rounded-md" />
          )}
          {!isLoading && !imageUrl && !error && (
            <div className="text-center text-slate-500">
              <ImageIcon className="mx-auto w-16 h-16 opacity-30" />
              <p className="mt-2">Image will be rendered here</p>
            </div>
          )}
        </div>
      </div>
    </AppCard>
  );
};

export default ImageInspirer;
