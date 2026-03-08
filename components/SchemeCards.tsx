'use client';

import { motion } from 'framer-motion';
import { IndianRupee, Clock, CheckCircle, FileText } from 'lucide-react';
import { useStore } from '@/store';

const mockSchemes = [
    {
        id: 1,
        name: 'PM Kisan Samman Nidhi',
        description: 'Income support of ₹6,000 per year in three equal installments to all land holding farmer families.',
        amount: '₹6,000/year',
        matchScore: 98,
        timeToApply: '5 mins',
        tags: ['Farmers', 'Central'],
        color: 'from-green-500 to-emerald-600'
    },
    {
        id: 2,
        name: 'Ayushman Bharat Yojana',
        description: 'Health cover of ₹5 lakhs per family per year for secondary and tertiary care hospitalization.',
        amount: '₹5,000,000 Cover',
        matchScore: 92,
        timeToApply: '8 mins',
        tags: ['Health', 'All India', 'BPL'],
        color: 'from-blue-500 to-indigo-600'
    },
    {
        id: 3,
        name: 'Pradhan Mantri Awas Yojana',
        description: 'Housing for all scheme to provide pucca houses with basic amenities.',
        amount: '₹1.2 Lakh',
        matchScore: 85,
        timeToApply: '15 mins',
        tags: ['Housing', 'Rural'],
        color: 'from-amber-500 to-orange-600'
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 50, damping: 12 } }
};

export default function SchemeCards() {
    const { schemesDiscovered, startAgent } = useStore();

    if (!schemesDiscovered) return null;

    return (
        <div className="w-full max-w-5xl mx-auto py-12">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-300">
                        Schemes You Are Eligible For
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Based on your voice profile onboarding
                    </p>
                </div>
                <div className="glass-panel px-4 py-2 rounded-full hidden sm:flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-semibold">AI Match Engine Active</span>
                </div>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {mockSchemes.map((scheme) => (
                    <motion.div
                        key={scheme.id}
                        variants={item}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="glass-panel rounded-3xl overflow-hidden relative group"
                    >
                        <div className={`h-2 w-full bg-gradient-to-r ${scheme.color}`} />

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex flex-wrap gap-2">
                                    {scheme.tags.map(tag => (
                                        <span key={tag} className="text-xs font-semibold px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-200">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full border-4 border-green-100 dark:border-green-900 bg-green-50 dark:bg-green-800 text-green-700 dark:text-green-300 font-bold text-sm">
                                    {scheme.matchScore}%
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                                {scheme.name}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3">
                                {scheme.description}
                            </p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-sm font-medium text-gray-800 dark:text-gray-200">
                                    <IndianRupee className="w-5 h-5 mr-2 text-emerald-500" />
                                    {scheme.amount}
                                </div>
                                <div className="flex items-center text-sm font-medium text-gray-800 dark:text-gray-200">
                                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                                    Apply via Agent in {scheme.timeToApply}
                                </div>
                            </div>

                            <button
                                onClick={startAgent}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer z-10 relative"
                            >
                                <FileText className="w-5 h-5" />
                                Auto-Apply with AI
                            </button>
                        </div>

                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-gradient-to-br from-white/10 to-transparent group-hover:scale-150 transition-transform duration-700 ease-out z-0" style={{ pointerEvents: 'none' }} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
