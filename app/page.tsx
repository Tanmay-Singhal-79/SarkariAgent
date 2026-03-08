'use client';

import VoiceAssistant from '@/components/VoiceAssistant';
import SchemeCards from '@/components/SchemeCards';
import AgentSimulatorModal from '@/components/AgentSimulatorModal';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false });

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Scene3D />

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-600 dark:from-blue-400 dark:via-blue-300 dark:to-indigo-200" style={{ lineHeight: 1.1 }}>
          Talk to Your<br />Welfare <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600">Assistant</span>
        </h1>

        <p className="mt-4 max-w-2xl text-xl text-gray-700 dark:text-gray-300 font-medium">
          Tap the microphone and say &quot;Namaste&quot;. I will find the government schemes you are eligible for and fill the forms automatically.
        </p>

        {/* Dashboard Preview / Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: 'Schemes Found', value: '10,000+' },
            { label: 'Applications Filed', value: '45,210' },
            { label: 'Languages Supported', value: '22' },
            { label: 'Success Rate', value: '98%' },
          ].map((stat) => (
            <div key={stat.label} className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-blue-800 dark:text-blue-300">{stat.value}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Schemes Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-32">
        <SchemeCards />
      </section>

      {/* Persistent Voice Assistant */}
      <VoiceAssistant />

      {/* Simulator Overlay */}
      <AgentSimulatorModal />

      {/* Footer minimal */}
      <footer className="w-full text-center pb-6 text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} SarkariAgent - Designed for India
      </footer>
    </div>
  );
}
