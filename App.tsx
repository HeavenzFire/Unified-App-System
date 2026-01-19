
import React from 'react';
import Header from './components/Header';
import TaskManager from './components/TaskManager';
import IdeaGenerator from './components/IdeaGenerator';
import CodeAssistant from './components/CodeAssistant';
import TextSummarizer from './components/TextSummarizer';
import ImageInspirer from './components/ImageInspirer';
import SystemGovernor from './components/SystemGovernor';

const App: React.FC = () => {
  return (
    <div className="bg-slate-900 min-h-screen text-gray-200">
      <div 
        className="absolute inset-0 bg-grid-slate-700/[0.2] bg-[bottom_1px_center] 
                   [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"
      ></div>
      <div className="relative isolate min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
              <SystemGovernor />
            </div>
            <div className="md:col-span-2 lg:col-span-2">
              <TaskManager />
            </div>
            <div className="md:col-span-1 lg:col-span-1">
              <IdeaGenerator />
            </div>
            <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
              <CodeAssistant />
            </div>
            <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
               <TextSummarizer />
            </div>
             <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
              <ImageInspirer />
            </div>
          </div>
        </main>
        <footer className="text-center p-4 text-slate-500 text-sm">
          System Core Initialized. All modules operational.
        </footer>
      </div>
    </div>
  );
};

export default App;
