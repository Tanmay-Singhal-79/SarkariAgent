'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Volume2 } from 'lucide-react';
import { useStore } from '@/store';

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export default function VoiceAssistant() {
    const { demoStep, incrementDemoStep, setSchemesDiscovered } = useStore();

    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const recognitionRef = useRef<any>(null);
    const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = 'hi-IN';

                recognition.onresult = (event: any) => {
                    let currentTranscript = '';
                    for (let i = 0; i < event.results.length; ++i) {
                        currentTranscript += event.results[i][0].transcript + ' ';
                    }
                    const text = currentTranscript.trim();
                    setTranscript(text);

                    // Reset silence timeout
                    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
                    silenceTimeoutRef.current = setTimeout(() => {
                        // If silent for 3 seconds, artificially stop and process
                        recognition.stop();
                    }, 3000);
                };

                recognition.onend = () => {
                    setIsListening(false);
                };

                recognitionRef.current = recognition;
            }
        }
        return () => {
            if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        }
    }, []);

    // Initial greeting
    useEffect(() => {
        if (demoStep === 0) {
            setResponse("Namaste! Mujhe tap karein aur kahein aapko kaunsi sahayata chahiye.");
        }
    }, [demoStep]);

    // Process user speech when listening stops
    useEffect(() => {
        if (!isListening && transcript && transcript !== 'Listening...') {
            setIsProcessing(true);

            // Artificial delay to simulate AI thinking
            setTimeout(() => {
                setIsProcessing(false);
                const lower = transcript.toLowerCase();

                if (lower.includes("kisan") || lower.includes("farmer") || lower.includes("kheti") || lower.includes("kisaan") || lower.includes("up") || lower.includes("uttar pradesh") || lower.includes("bihar")) {
                    setResponse(`Maine suna: "${transcript}". Aap PM Kisan Samman Nidhi ke liye bilkul eligible hain. Maine form match kar liya hai, niche schemes check karein!`);
                    setSchemesDiscovered(true);
                    if (demoStep === 1) incrementDemoStep();
                } else if (lower.includes("namaste") || lower.includes("hello") || lower.includes("hi") || lower.includes("yojana") || lower.includes("scheme")) {
                    setResponse(`Namaste! Maine suna "${transcript}". Bilkul, main form bharne mein madad karunga. Kripaya apna state aur kaam (occupation) batayein.`);
                    if (demoStep === 0) incrementDemoStep();
                } else {
                    setResponse(`Achha, aap keh rahe hain: "${transcript}". Uske aadhar par PM Kisan Scheme best rahegi. Niche scheme check karein!`);
                    setSchemesDiscovered(true);
                }
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isListening]);

    const toggleListen = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        } else {
            if (recognitionRef.current) {
                setTranscript('Listening...');
                setResponse('');
                try {
                    recognitionRef.current.start();
                    setIsListening(true);

                    // Initial silence timeout in case they tap but say nothing
                    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
                    silenceTimeoutRef.current = setTimeout(() => {
                        recognitionRef.current?.stop();
                    }, 5000);
                } catch (err) {
                    console.error('Speech recognition err:', err);
                }
            } else {
                alert('Speech Recognition is not supported in this browser. Please use Chrome/Edge.');
            }
        }
    };

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
            <AnimatePresence>
                {(transcript || response || isProcessing) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-6 p-4 rounded-2xl glass-panel max-w-sm w-full shadow-2xl space-y-3"
                    >
                        {transcript && transcript !== 'Listening...' && (
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Aap (User)</span>
                                <p className="bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 rounded-xl rounded-br-none p-3 text-sm">
                                    {transcript}
                                </p>
                            </div>
                        )}

                        {isProcessing && (
                            <div className="flex gap-1 justify-start p-2">
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="w-2 h-2 bg-blue-500 rounded-full" />
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-blue-500 rounded-full" />
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-blue-500 rounded-full" />
                            </div>
                        )}

                        {response && (
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-green-600 dark:text-green-400 mb-1 flex items-center gap-1">
                                    <Volume2 size={12} /> SarkariAgent AI
                                </span>
                                <p className="bg-green-50 dark:bg-green-900/40 text-green-900 dark:text-green-100 border border-green-100 dark:border-green-800 rounded-xl rounded-bl-none p-3 text-sm font-medium">
                                    {response}
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleListen}
                className={`w-20 h-20 rounded-full shadow-2xl flex items-center justify-center transition-colors relative
          ${isListening ? 'bg-red-500 text-white shadow-red-500/50' : 'bg-blue-600 text-white shadow-blue-500/50'}`}
            >
                {isListening && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-4 border-white opacity-30"
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                )}
                <Mic size={32} className={isListening ? 'animate-pulse' : ''} />
            </motion.button>

            <p className="mt-3 text-sm font-semibold text-gray-800 dark:text-gray-200 glass-panel px-4 py-1 rounded-full text-center">
                {isListening ? 'Listening... Bol sakte hain (Tap to Stop)' : 'Tap to Speak'}
            </p>
        </div>
    );
}
