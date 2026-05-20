import { Users, Phone, Target, TrendingUp } from "lucide-react";

const stats = [
    {
        label: "Total Leads",
        value: "45",
        icon: Users,
        color: "text-blue-500",
        bg: "bg-blue-50",
    },
    {
        label: "Contacted Leads",
        value: "0",
        icon: Phone,
        color: "text-emerald-500",
        bg: "bg-emerald-50",
    },
    {
        label: "Sales Done",
        value: "0",
        icon: Target,
        color: "text-violet-500",
        bg: "bg-violet-50",
    },
    {
        label: "Conversion Rate",
        value: "0.0%",
        icon: TrendingUp,
        color: "text-orange-500",
        bg: "bg-orange-50",
    },
];

function StatCard({ stat }) {
    const Icon = stat.icon;
    return (
        <div className="flex-1 bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between min-w-0">
            <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center shrink-0`}>
                <Icon size={18} className={stat.color} />
            </div>
        </div>
    );
}

export default function PerformanceOverview() {
    return (
        <div className="mb-6">
            <h2 className="text-md font-semibold  mb-3">Performance Overview</h2>
            <div className="flex gap-4">
                {stats.map((stat) => (
                    <StatCard key={stat.label} stat={stat} />
                ))}
            </div>
        </div>
    );
}