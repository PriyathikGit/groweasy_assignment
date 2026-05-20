import { useContext, useState } from "react";
import { X, ChevronDown, Phone, Mail, MapPin, User, Briefcase, Clock, Pencil, BarChart3, Share, Share2Icon, Bot, MessageCircle, CircleCheck, Plus, Zap } from "lucide-react";
import { LeadDetailContext } from "../context/LeadDetailContext";
import { detialedLeadData } from "../../data/leads";

export default function LeadDetailPanel() {
    const { selectedLead, setSelectedLead } = useContext(LeadDetailContext);
    const [showActivities, setShowActivities] = useState(false);

    if (!selectedLead) return null;

    const detailedData = detialedLeadData.find((d) => d.lead.id === selectedLead.id);
    const activities = detailedData?.activities || [];
    const lead = selectedLead;

    // get activity icon
    const getActivityIcon = (activityType) => {
        switch (activityType) {
            case 'PHONE_CALL':
                return <Phone size={12} className="text-blue-600" />;
            case 'WA_MESSAGE':
                return <MessageCircle size={12} className="text-green-600" />;
            case 'CUSTOM':
                return <Pencil size={12} className="text-purple-600" />;
            case 'NEW_LEAD':
                return <Plus size={12} className="text-orange-600" />;
            default:
                return <Zap size={12} className="text-gray-600" />;
        }
    };

    // activity type color
    const getActivityColor = (activityType) => {
        switch (activityType) {
            case 'PHONE_CALL':
                return 'bg-blue-100';
            case 'WA_MESSAGE':
                return 'bg-green-100';
            case 'CUSTOM':
                return 'bg-purple-100';
            case 'NEW_LEAD':
                return 'bg-orange-100';
            default:
                return 'bg-gray-100';
        }
    };

    console.log(detailedData)
    return (
        <div className="w-96 flex-1 h-full bg-white border-l border-gray-200 overflow-y-auto flex flex-col rounded-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-gray-100 sticky top-0 bg-white gap-3">
                <span className="text-sm font-semibold text-gray-800">{lead.name}</span>
                <div className="flex items-center gap-2">
                    <div className="flex gap-2 items-center bg-red-100 p-1 pl-2 justify-center text-red-500 rounded-xl font-semibold whitespace-nowrap">
                        <span className="text-xs">{detailedData?.lead.status}</span>
                        <Pencil height={11} />
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-400 p-1 rounded-xl items-center flex border-slate-300 border whitespace-nowrap">Quality <ChevronDown height={11} /></span>
                </div>
                <button
                    onClick={() => setSelectedLead(null)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
                >
                    <X size={15} className="text-gray-400" />
                </button>
            </div>

            {/* icon row  */}
            <div className="flex gap-4 px-4 py-2 border-gray-100">
                <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 cursor-pointer transition-colors">
                    <Phone size={15} className="text-gray-600" />
                </div>
                <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 cursor-pointer transition-colors">
                    <MessageCircle size={15} className="text-gray-600" />
                </div>
                <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 cursor-pointer transition-colors">
                    <Share2Icon size={15} className="text-gray-600" />
                </div>
                <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 cursor-pointer transition-colors">
                    <Bot size={15} className="text-gray-600" />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-4 py-2 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center  gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                        <Mail size={15} className="text-gray-600 shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-medium mb-1">EMAIL</p>
                            <p className="text-xs text-gray-900 font-semibold break-all line-clamp-2">{lead.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                        <Phone size={15} className="text-gray-600 shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-medium mb-1">CONTACT</p>
                            <p className="text-xs text-gray-900 font-semibold">{lead.mobile}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                        <Pencil size={15} className="shrink-0 mt-0.5 text-gray-600" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-medium mb-1">STATUS</p>
                            <p className="text-xs font-semibold">{detailedData?.lead.status || 'N/A'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                        <BarChart3 size={15} className="text-gray-600 shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-medium mb-1">QUALITY</p>
                            <p className="text-xs text-gray-900 font-semibold">-</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                        <User size={15} className="text-gray-600 shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-medium mb-1">OWNER</p>
                            <p className="text-xs text-gray-900 font-semibold truncate">{lead.name || 'Not assigned'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                        <Briefcase size={15} className="text-gray-600 shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-medium mb-1">SOURCE</p>
                            <p className="text-xs text-gray-900 font-semibold">{lead.source?.type || 'Unknown'}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 cursor-pointer transition-colors">
                            <Phone size={18} className="text-green-600 shrink-0 mt-0.5" />
                        </div>

                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-medium mb-1">CALL STATUS TODAY</p>
                            <p className="text-sm text-gray-900 font-semibold">
                                {detailedData?.lead.crm?.last_call_done_at
                                    ? `You have called this lead today.`
                                    : 'No call made today'}
                            </p>

                        </div>
                        <div className="p-2 pt-0 pl-1 rounded-xl bg-green-200 items-center justify-center">
                            {detailedData?.lead.crm?.last_call_done_at && (
                                <p className="text-xs text-green-900 font-semibold mt-2 flex items-center gap-1">
                                    <CircleCheck height={14} />
                                    Done
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Activities */}
                {activities && activities.length > 0 && (
                    <div className="relative">
                        <button
                            onClick={() => setShowActivities(!showActivities)}
                            className="w-full flex items-center justify-between px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <div className="text-left">
                                <p className="text-xs text-gray-500 font-medium">ACTIVITIES</p>
                                <p className="text-sm text-gray-900 font-semibold">{activities.length} activities</p>
                            </div>
                            <ChevronDown
                                size={16}
                                className={`text-gray-400 transition-transform ${showActivities ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {/* Timeline Activities */}
                        {showActivities && (
                            <div className="mt-3">
                                {activities.map((activity, index) => (
                                    <div
                                        key={activity.id}
                                        className="relative pb-6"
                                    >
                                        {/* Timeline line */}
                                        {index !== activities.length - 1 && (
                                            <div className="absolute left-4 top-2 w-0.5 h-full bg-gray-200"></div>
                                        )}

                                        {/* Timeline content */}
                                        <div className="flex gap-3">
                                            {/* Activity Type Icon */}
                                            <div className={`relative pt-1 flex items-center justify-center w-8 h-8 ${getActivityColor(activity.type)} rounded-full border-2 border-white shrink-0`}>
                                                {getActivityIcon(activity.type)}
                                            </div>

                                            {/* Activity details */}
                                            <div className="flex-1 border border-slate-200 p-4 rounded-xl">
                                                <div className="flex items-start justify-between mb-1">
                                                    <p className="text-xs text-gray-400 font-medium">
                                                        {activity.created_at._seconds
                                                            ? new Date(activity.created_at._seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                            : 'N/A'}
                                                    </p>
                                                </div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {activity.title}
                                                </p>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    {activity.description}
                                                </p>
                                                {activity.metadata?.content && (
                                                    <p className="text-xs text-gray-600 mt-2 whitespace-pre-wrap">
                                                        {activity.metadata.content}
                                                    </p>
                                                )}
                                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded inline-block mt-2">
                                                    {activity.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
