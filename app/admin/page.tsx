import { Users, Activity, CheckCircle, MapPin } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">System Analytics & District Performance</h1>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { icon: Users, label: 'Total Citizens Onboarded', value: '1,204,500', color: 'text-blue-600', bg: 'bg-blue-100' },
                        { icon: Activity, label: 'Active Schemes Matched', value: '3,450', color: 'text-indigo-600', bg: 'bg-indigo-100' },
                        { icon: CheckCircle, label: 'Applications Approved', value: '890,200', color: 'text-emerald-600', bg: 'bg-emerald-100' },
                        { icon: MapPin, label: 'Districts Reached', value: '718 / 748', color: 'text-amber-600', bg: 'bg-amber-100' },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                                <stat.icon size={24} />
                            </div>
                            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Chart Placeholder */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col min-h-[400px]">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Application Trends (Last 12 Months)</h2>
                        <div className="flex-1 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 font-medium">
                            [Recharts Interactive Graph]
                        </div>
                    </div>

                    {/* District Performance Heatmap List */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Top Performing Districts</h2>
                        <div className="space-y-4">
                            {[
                                { name: 'Pune, Maharashtra', rate: '92%', count: '45,200' },
                                { name: 'Indore, MP', rate: '88%', count: '38,100' },
                                { name: 'Patna, Bihar', rate: '85%', count: '52,400' },
                                { name: 'Jaipur, Rajasthan', rate: '81%', count: '41,050' },
                                { name: 'Surat, Gujarat', rate: '79%', count: '31,800' },
                            ].map((district, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{district.name}</h4>
                                        <p className="text-xs text-gray-500">{district.count} Submissions</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                            {district.rate} Approval
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* AI Agent Execution Logs */}
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Live Agent Operations (Playwright / AI)</h2>
                    <div className="bg-gray-900 p-4 rounded-xl font-mono text-sm text-green-400 h-48 overflow-y-auto space-y-2">
                        <p className="text-gray-500">[{new Date().toISOString()}] Agent System Started...</p>
                        <p>[INFO] Thread-72 &gt; Navigating to pmkisan.gov.in for User ID: USR8231</p>
                        <p>[INFO] Thread-45 &gt; Textract parsing Aadhaar document DOC9912...</p>
                        <p>[SUCCESS] Thread-11 &gt; Ayushman Bharat application API bypass successful. App ID: AB-1293</p>
                        <p className="text-red-400">[ERROR] Thread-92 &gt; CAPTCHA block active on upbhulekh.gov.in. Retrying with 2Captcha bypass...</p>
                        <p>[INFO] Thread-5 &gt; Voice Notification sent: Namaste! Aapke bank account mein PM Kisan ke ₹2000 aa gaye hain.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
