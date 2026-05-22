import { useState, useContext } from "react";
import {
    LayoutDashboard,
    Rocket,
    ClipboardList,
    MessageSquare,
    Users,
    Radio,
    Globe,
    MessageCircle,
    PhoneCall,
    Table2,
    Building2,
    ChevronRight,
    UserPlus,
    CircleUser,
    Menu,
    X,
} from "lucide-react";

import { organisationData } from "../../data/leads";
import { OrgContext } from "../context/OrgContext";

const iconMap = {
    dashboard: LayoutDashboard,
    rocket: Rocket,
    list: ClipboardList,
    message: MessageSquare,
    users: UserPlus,
    users2: Users,
    speaker: Radio,
    globe: Globe,
    chat: MessageCircle,
    phone: PhoneCall,
    table: Table2,
};

export const navItems = [
    { label: 'Dashboard', icon: 'dashboard' },
    { label: 'Generate Leads', icon: 'rocket' },
    { label: 'Manage Leads', icon: 'list', active: true },
    { label: 'Engage Leads', icon: 'message' },
];

export const controlCenterItems = [
    { label: 'Team Members', icon: 'users2' },
    { label: 'Lead Sources', icon: 'speaker' },
    { label: 'Ad Accounts', icon: 'users' },
    { label: 'WhatsApp Account', icon: 'chat' },
    { label: 'Tele Calling', icon: 'phone' },
    { label: 'CRM Fields', icon: 'table' },
];


function NavItem({ item, onClick, isActive }) {
    const Icon = iconMap[item.icon];
    return (
        <button
            onClick={() => onClick(item.label)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold transition-colors duration-150 ${isActive
                ? "bg-blue-100 text-emerald-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
        >
            {Icon && <Icon size={16} className={isActive ? "text-emerald-600" : "text-gray-500"} />}
            <span>{item.label}</span>
        </button>
    );
}

export default function Sidebar({ isMobileOpen, setIsMobileOpen }) {
    const [activeItem, setActiveItem] = useState("Manage Leads");
    const [showOrgMenu, setShowOrgMenu] = useState(false);
    const { setSelectedOrgId, orgList } = useContext(OrgContext);

    const handleCloseMobile = () => {
        setIsMobileOpen(false);
    };

    const sidebarContent = (
        <>
            {/* Logo */}
            <div className="flex items-center gap-2 px-2 mb-6">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="text-gray-900 font-semibold text-xl tracking-tight">GrowEasy</span>
            </div>

            {/* User */}
            <div className="mb-6  border border-slate-200 p-1 rounded-xl relative hover:bg-gray-50">
                <div className="flex items-center gap-2 px-2 cursor-pointer  rounded-lg py-1 transition-colors"
                    onClick={() => setShowOrgMenu(!showOrgMenu)}
                >
                    {orgList.slice(0, 1).map((item) => {
                        const firstLetter = item.name.charAt(0).toUpperCase();
                        const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-green-500'];
                        const colorIndex = item.name.charCodeAt(0) % colors.length;
                        return (
                            <div key={item.name} className={`w-8 h-8 rounded-lg ${colors[colorIndex]} flex items-center justify-center shrink-0`}>
                                <span className="text-white text-xs font-bold">{firstLetter}</span>
                            </div>
                        );
                    })}

                    <div className="flex-1 min-w-0">
                        {orgList.slice(0, 1).map((item) => (
                            <div key={item.name}>
                                <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.role}</p>
                            </div>
                        ))}
                    </div>

                    <ChevronRight size={14} className={`text-gray-400 transition-transform duration-200 ${showOrgMenu ? 'rotate-90' : ''}`} />
                </div>

                {/* org menu dropdown */}
                {showOrgMenu && (
                    <div className="absolute top-full left-1 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-full">
                        {orgList.slice(1).map((item, index) => {
                            const firstLetter = item.name.charAt(0).toUpperCase();
                            const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-green-500'];
                            const colorIndex = item.name.charCodeAt(0) % colors.length;
                            return (
                                <div
                                    key={item.id}
                                    className={`flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors ${index !== orgList.length - 2 ? 'border-b border-gray-100' : ''}`}
                                    onClick={() => {
                                        setSelectedOrgId(item.id);
                                        setShowOrgMenu(false);
                                    }}
                                >
                                    <div className={`w-8 h-8 rounded-lg ${colors[colorIndex]} flex items-center justify-center shrink-0`}>
                                        <span className="text-white text-xs font-bold">{firstLetter}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.role}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Main Nav */}
            <div className="mb-6">
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">Main</p>
                <nav className="flex flex-col gap-0.5">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.label}
                            item={item}
                            onClick={setActiveItem}
                            isActive={activeItem === item.label}
                        />
                    ))}
                </nav>
            </div>

            {/* Control Center */}
            <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">Control Center</p>
                <nav className="flex flex-col gap-0.5">
                    {controlCenterItems.map((item) => (
                        <NavItem
                            key={item.label}
                            item={item}
                            onClick={setActiveItem}
                            isActive={activeItem === item.label}
                        />
                    ))}
                </nav>
            </div>

            {/* Bottom */}
            <div className="mt-auto pt-4 border-t border-gray-100">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors font-bold">
                    <CircleUser size={15} />
                    <span>Business Center</span>
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-56 min-h-screen bg-white border-r border-gray-200 flex-col py-4 px-3">
                {sidebarContent}
            </aside>

            {/* Mobile Sidebar Overlay and Drawer */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-opacity-50"
                        onClick={handleCloseMobile}
                    />
                    {/* Drawer */}
                    <aside className="absolute left-0 top-0 h-full w-56 bg-white shadow-lg overflow-y-auto flex flex-col py-4 px-3 z-50">
                        {/* Close Button */}
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={handleCloseMobile}
                                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={24} className="text-gray-600" />
                            </button>
                        </div>
                        {sidebarContent}
                    </aside>
                </div>
            )}
        </>
    );
}