
import React from 'react';

interface AppCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const AppCard: React.FC<AppCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-lg border border-slate-700/80 shadow-lg shadow-black/20 h-full flex flex-col transition-all duration-300 hover:border-cyan-500/80 hover:shadow-cyan-500/10">
      <div className="flex items-center gap-3 p-4 border-b border-slate-700">
        <div className="text-cyan-400">{icon}</div>
        <h2 className="font-orbitron text-lg font-medium text-gray-100">{title}</h2>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default AppCard;
