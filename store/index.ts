import { create } from 'zustand';

interface UserProfile {
    name: string;
    age: string;
    state: string;
    occupation: string;
}

interface AppState {
    demoStep: number;
    profile: Partial<UserProfile>;
    schemesDiscovered: boolean;
    agentStatus: 'idle' | 'running' | 'success';
    agentTaskLogs: string[];

    incrementDemoStep: () => void;
    setSchemesDiscovered: (val: boolean) => void;
    startAgent: () => void;
    addAgentLog: (log: string) => void;
    setAgentSuccess: () => void;
    resetAgent: () => void;
}

export const useStore = create<AppState>((set) => ({
    demoStep: 0,
    profile: {},
    schemesDiscovered: false,
    agentStatus: 'idle',
    agentTaskLogs: [],

    incrementDemoStep: () => set((state) => ({ demoStep: state.demoStep + 1 })),
    setSchemesDiscovered: (val) => set({ schemesDiscovered: val }),
    startAgent: () => set({ agentStatus: 'running', agentTaskLogs: ['Initiating Headless Browser (Playwright)...'] }),
    addAgentLog: (log) => set((state) => ({ agentTaskLogs: [...state.agentTaskLogs, log] })),
    setAgentSuccess: () => set({ agentStatus: 'success' }),
    resetAgent: () => set({ agentStatus: 'idle', agentTaskLogs: [] })
}));
