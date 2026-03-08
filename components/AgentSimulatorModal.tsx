'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Globe, ShieldCheck, CheckCircle2, User, FileText, Database } from 'lucide-react';
import { useStore } from '@/store';

export default function AgentSimulatorModal() {
    const { agentStatus, agentTaskLogs, addAgentLog, setAgentSuccess, resetAgent } = useStore();
    const [formState, setFormState] = useState({ name: '', state: '', amount: '', aadhaar: '' });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (agentStatus === 'running') {
            setFormState({ name: '', state: '', amount: '', aadhaar: '' });
            setProgress(0);

            const script = [
                { time: 1000, log: 'Navigating to pmkisan.gov.in/Registration...' },
                { time: 2000, log: 'Parsing Document Vault (Textract: Aadhaar, Bank Details)...', action: () => setProgress(30) },
                {
                    time: 3500, log: 'Injecting Profile Data into Form DOM...', action: () => {
                        setFormState(s => ({ ...s, name: 'SarkariAgent Auto-Fill' }));
                        setProgress(50);
                    }
                },
                {
                    time: 4500, log: 'Typing fields natively...', action: () => {
                        setFormState(s => ({ ...s, state: 'Uttar Pradesh', amount: '2 Hectares', aadhaar: 'XXXX-XXXX-1934' }));
                        setProgress(75);
                    }
                },
                { time: 6000, log: 'Bypassing CAPTCHA via Vision AI API...' },
                { time: 7500, log: 'Submitting Payload...', action: () => setProgress(90) },
                {
                    time: 9000, log: 'Application Successful! ID: PMK-2900192', action: () => {
                        setProgress(100);
                        setAgentSuccess();
                    }
                },
            ];

            script.forEach(({ time, log, action }) => {
                setTimeout(() => {
                    addAgentLog(log);
                    if (action) action();
                }, time);
            });
        }
    }, [agentStatus, addAgentLog, setAgentSuccess]);

    if (agentStatus === 'idle') return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 grid grid-cols-1 md:grid-cols-5"
                >
                    {/* Left: Terminal Log */}
                    <div className="md:col-span-2 bg-gray-950 p-6 flex flex-col border-r border-gray-800">
                        <div className="flex items-center gap-2 mb-6">
                            <Terminal className="text-emerald-500 w-5 h-5" />
                            <h3 className="text-white font-mono text-sm font-semibold tracking-wider">PLAYWRIGHT ENGINE</h3>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 font-mono text-xs text-gray-400">
                            {agentTaskLogs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="leading-relaxed"
                                >
                                    <span className="text-emerald-500 mr-2">➜</span>
                                    {log.includes('Successful') ? <span className="text-emerald-400">{log}</span> : log}
                                </motion.div>
                            ))}
                            {agentStatus === 'running' && (
                                <motion.div
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="text-gray-600"
                                >
                                    _ executing...
                                </motion.div>
                            )}
                        </div>

                        <div className="mt-6">
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-emerald-500"
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-500 font-mono">
                                <span>SYSTEM STATUS</span>
                                <span>{progress}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Simulated Browser */}
                    <div className="md:col-span-3 bg-gray-50 dark:bg-gray-900 flex flex-col">
                        <div className="h-12 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 gap-4 bg-white dark:bg-gray-950">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-md h-7 flex items-center px-3 gap-2">
                                <Globe className="w-4 h-4 text-gray-400" />
                                <span className="text-xs text-gray-500 font-medium">https://pmkisan.gov.in/Registration</span>
                                <ShieldCheck className="w-4 h-4 text-green-500 ml-auto" />
                            </div>
                        </div>

                        <div className="flex-1 p-8 relative">
                            {agentStatus === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-10"
                                >
                                    <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-4" />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Submitted!</h2>
                                    <p className="text-gray-500 mb-8">AI completely filled the form securely.</p>
                                    <button
                                        onClick={resetAgent}
                                        className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"
                                    >
                                        Close Simulation
                                    </button>
                                </motion.div>
                            ) : null}

                            <div className="max-w-md mx-auto space-y-5 opacity-50 select-none pointer-events-none">
                                <h2 className="text-lg font-bold text-blue-900 dark:text-blue-300 border-b pb-2 mb-4">Farmer Registration Form</h2>

                                <div className="space-y-4">
                                    <div className="flex gap-2 items-center bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <User className="w-5 h-5 text-gray-400" />
                                        <input disabled value={formState.name} className="bg-transparent flex-1 text-gray-800 dark:text-gray-200 font-medium placeholder-gray-400" placeholder="Beneficiary Name" />
                                    </div>

                                    <div className="flex gap-2 items-center bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <Globe className="w-5 h-5 text-gray-400" />
                                        <input disabled value={formState.state} className="bg-transparent flex-1 text-gray-800 dark:text-gray-200 font-medium placeholder-gray-400" placeholder="State/District" />
                                    </div>

                                    <div className="flex gap-2 items-center bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <Database className="w-5 h-5 text-gray-400" />
                                        <input disabled value={formState.amount} className="bg-transparent flex-1 text-gray-800 dark:text-gray-200 font-medium placeholder-gray-400" placeholder="Land Holding Size" />
                                    </div>

                                    <div className="flex gap-2 items-center bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <FileText className="w-5 h-5 text-gray-400" />
                                        <input disabled value={formState.aadhaar} className="bg-transparent flex-1 text-gray-800 dark:text-gray-200 font-medium placeholder-gray-400" placeholder="Aadhaar ID" />
                                    </div>

                                    <button disabled className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg mt-6 opacity-80">
                                        Secure Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
