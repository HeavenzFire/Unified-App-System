
import React, { useState } from 'react';
import AppCard from './AppCard';
import { TargetIcon } from './icons/TargetIcon';
import { Plan, AuditLogEntry } from '../types';
import { generatePlan } from '../services/geminiService';

const SystemGovernor: React.FC = () => {
    const [request, setRequest] = useState('');
    const [plan, setPlan] = useState<Plan | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);

    const handleProcessRequest = async () => {
        if (request.trim() === '') return;
        setIsLoading(true);
        setPlan(null);
        const generatedPlan = await generatePlan(request);
        if (generatedPlan) {
            setPlan(generatedPlan);
        } else {
            // Handle error case, maybe show a message
        }
        setIsLoading(false);
    };

    const handleDecision = (outcome: 'Approved' | 'Rejected') => {
        if (!plan) return;
        const newLogEntry: AuditLogEntry = {
            id: Date.now(),
            request,
            plan,
            outcome,
            timestamp: new Date().toISOString(),
        };
        setAuditLog([newLogEntry, ...auditLog]);
        setPlan(null);
        setRequest('');
    };
    
    const getRiskColor = (risk: 'Low' | 'Medium' | 'High') => {
        if (risk === 'Low') return 'text-green-400';
        if (risk === 'Medium') return 'text-yellow-400';
        if (risk === 'High') return 'text-red-500';
        return 'text-gray-400';
    };

    return (
        <AppCard title="System Governor" icon={<TargetIcon />}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Side: Input & Plan */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-orbitron text-gray-300">Submit Goal</h3>
                    <textarea
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                        placeholder="Define a high-level objective... e.g., 'Draft a python script to parse a CSV file and then suggest a name for the script.'"
                        rows={3}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                        disabled={isLoading || !!plan}
                    />
                    <button onClick={handleProcessRequest} disabled={isLoading || !!plan} className="w-full bg-cyan-600 hover:bg-cyan-500 rounded-md px-4 py-2 transition text-white disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
                         {isLoading ? 'Analyzing...' : 'Process Request'}
                    </button>

                    {plan && !isLoading && (
                        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 animate-fade-in">
                            <h3 className="font-orbitron text-lg mb-3 text-cyan-400">Execution Plan</h3>
                            <div className="space-y-2 text-sm">
                                <p><strong>Intent:</strong> {plan.intent}</p>
                                <p><strong>Risk Level:</strong> <span className={getRiskColor(plan.risk)}>{plan.risk}</span></p>
                                <p><strong>Module:</strong> <span className="font-mono bg-slate-700/50 px-2 py-1 rounded">{plan.action.module}</span></p>
                                <p><strong>Prompt:</strong></p>
                                <p className="bg-slate-800 p-2 rounded border border-slate-600 text-gray-300 whitespace-pre-wrap">{plan.action.prompt}</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <button onClick={() => handleDecision('Approved')} className="flex-1 bg-green-600 hover:bg-green-500 rounded-md py-2 transition text-white">Execute Plan</button>
                                <button onClick={() => handleDecision('Rejected')} className="flex-1 bg-red-600 hover:bg-red-500 rounded-md py-2 transition text-white">Reject Plan</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side: Audit Log */}
                <div className="flex flex-col">
                    <h3 className="font-orbitron text-gray-300 mb-4">Audit Log</h3>
                    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 flex-grow min-h-[250px] overflow-y-auto">
                        {auditLog.length === 0 ? (
                            <p className="text-slate-500 text-center pt-16">No operations logged.</p>
                        ) : (
                            <div className="space-y-3">
                                {auditLog.map(entry => (
                                    <div key={entry.id} className="text-xs p-2 bg-slate-800/60 rounded border-l-4 border-slate-600">
                                        <div className="flex justify-between items-center">
                                            <span className={`font-bold ${entry.outcome === 'Approved' ? 'text-green-400' : 'text-red-400'}`}>{entry.outcome.toUpperCase()}</span>
                                            <span className="text-slate-500">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                        <p className="text-slate-300 mt-1 truncate">Req: "{entry.request}"</p>
                                        <p className="text-slate-400 mt-1">→ routed to <span className="font-mono text-cyan-400">{entry.plan.action.module}</span></p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppCard>
    );
};

export default SystemGovernor;
