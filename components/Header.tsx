
import React, { useState, useEffect } from 'react';
import { SystemStatus } from '../types';
import { CpuIcon } from './icons/CpuIcon';

const Header: React.FC = () => {
    const [status, setStatus] = useState<SystemStatus>(SystemStatus.ONLINE);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getStatusColor = () => {
        switch(status) {
            case SystemStatus.ONLINE: return 'text-green-400';
            case SystemStatus.PROCESSING: return 'text-yellow-400 animate-pulse';
            case SystemStatus.ERROR: return 'text-red-500';
            default: return 'text-cyan-400';
        }
    };

    return (
        <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 p-4 sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <CpuIcon className="h-8 w-8 text-cyan-400"/>
                    <h1 className="text-2xl font-bold font-orbitron text-gray-100 tracking-wider">
                        UNIFIED <span className="text-cyan-400">SYSTEM</span>
                    </h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-2 font-mono text-sm">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor().replace('text-', 'bg-')}`}></div>
                        <span className={`${getStatusColor()}`}>{status}</span>
                    </div>
                    <div className="font-mono text-lg text-slate-400">
                        {time.toLocaleTimeString()}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
