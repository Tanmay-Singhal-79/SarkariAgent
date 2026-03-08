import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'SarkariAgent - India\'s Voice-First AI Welfare Assistant',
  description: 'AI-powered voice-first welfare assistant matching citizens with government schemes. No typing required.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased min-h-screen flex flex-col`}>
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">S</div>
              <span className="font-bold text-xl tracking-tight text-blue-900 dark:text-blue-100">Sarkari<span className="text-blue-600">Agent</span></span>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors">
                English (Change)
              </button>
              <button className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                Login
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
