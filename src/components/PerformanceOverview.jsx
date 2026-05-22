import { Users, Phone, Target, TrendingUp } from "lucide-react";
import {leadsData} from "../../data/leads"
const stats = [
    {
        label: "Total Leads",
        value: leadsData.length,
        icon: Users
    },
    {
        label: "Contacted Leads",
        value: "0",
        icon: Phone
    },
    {
        label: "Sales Done",
        value: "0",
        icon: Target
    },
    {
        label: "Conversion Rate",
        value: "0.0%",
        icon: TrendingUp
    },
];

function StatCard({ stat }) {
    const Icon = stat.icon;
    return (
        <div className="w-full sm:flex-1  bg-white border border-gray-200 rounded-xl px-5 py-6 flex flex-col" style={{ boxShadow: "inset -50px -30px 60px rgba(59, 130, 246, 0.12)" }}>
            <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-semibold text-gray-500">{stat.label}</p>
                <Icon size={16} className="text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
        </div>
    );
}

export default function PerformanceOverview() {
    return (
        <div className="mb-6">
            <h2 className="text-md font-semibold  mb-3">Performance Overview</h2>
            <div className="flex gap-4 flex-wrap">
                {stats.map((stat) => (
                    <StatCard key={stat.label} stat={stat} />
                ))}
            </div>
        </div>
    );
}