import { useContext, useState, useEffect } from "react";
import { X, ChevronDown, Phone, Mail, MapPin, User, Briefcase, Clock, Pencil, BarChart3, Share, Share2Icon, Bot, MessageCircle, CircleCheck, Plus, Zap, Calendar } from "lucide-react";
import { LeadDetailContext } from "../context/LeadDetailContext";
import { detialedLeadData } from "../../data/leads";

export default function LeadDetailPanel() {
    const { selectedLead, setSelectedLead } = useContext(LeadDetailContext);
    const [showActivities, setShowActivities] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (selectedLead) {
            setIsAnimating(true);
        }
    }, [selectedLead]);

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

    const getStatusColor = (leadStatus) => {
        if (leadStatus === 'Bad Lead') {
            return { bg: 'bg-red-100', text: 'text-red-600' };
        }
        return { bg: 'bg-green-100', text: 'text-green-600' };
    };

    console.log(detailedData)
    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 bg-opacity-50 md:hidden z-30 transition-opacity duration-300 ease-in-out ${isAnimating ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={() => setSelectedLead(null)}
            />
            <div className={`fixed md:relative bottom-0 right-0 md:right-auto md:bottom-auto w-full md:w-full h-3/4 md:h-full bg-white border-l border-gray-200 overflow-y-auto flex flex-col rounded-t-xl md:rounded-xl z-40 md:z-auto transform transition-all duration-500 ease-out ${isAnimating
                    ? 'translate-y-0 translate-x-0 opacity-100 md:translate-x-0'
                    : 'translate-y-full md:translate-x-full opacity-0'
                }`}>

                {/* mobile  */}
                <div className="md:hidden flex flex-col md:flex-row md:items-center md:justify-between px-4 py-3 border-gray-100 sticky top-0 bg-white gap-2 md:gap-3">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-800 truncate">{lead.name}</span>
                        <button
                            onClick={() => setSelectedLead(null)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors shrink-0 ml-auto"
                        >
                            <X size={15} className="text-gray-400" />
                        </button>
                    </div>
                    <div className="flex gap-2 flex-col">
                        <div className="flex flex-wrap items-center gap-2 min-w-0">
                            <div className={`flex gap-2 items-center ${getStatusColor(detailedData?.lead.leadStatus).bg} ${getStatusColor(detailedData?.lead.leadStatus).text} p-1 pl-2 justify-center rounded-xl font-semibold whitespace-nowrap`}>
                                <span className="text-xs">{detailedData?.lead.leadStatus}</span>
                                <Pencil height={11} />
                            </div>
                            <span className="text-xs bg-slate-100 text-slate-400 p-1 rounded-xl items-center flex border-slate-300 border whitespace-nowrap">Quality <ChevronDown height={11} /></span>
                        </div>
                        <span className="text-xs flex items-center gap-2 p-1 border border-slate-200 rounded-xl px-2 sm:px-4 text-gray-600 font-bold bg-gray-50 flex-wrap w-fit">Owned By <span className="truncate">{lead.name}</span> <Pencil size={14} className="shrink-0" /></span>
                    </div>

                </div>

                {/* desktop  */}
                <div className="hidden md:flex justify-between items-center px-4 py-3 border-gray-100 sticky top-0 bg-white gap-2 md:gap-3">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-800 truncate">{lead.name}</span>

                    </div>
                    <div className="flex flex-col gap-2 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 min-w-0">
                            <div className={`flex gap-2 items-center ${getStatusColor(detailedData?.lead.leadStatus).bg} ${getStatusColor(detailedData?.lead.leadStatus).text} p-1 pl-2 justify-center rounded-xl font-semibold whitespace-nowrap`}>
                                <span className="text-xs">{detailedData?.lead.leadStatus}</span>
                                <Pencil height={11} />
                            </div>
                            <span className="text-xs bg-slate-100 text-slate-400 p-1 rounded-xl items-center flex border-slate-300 border whitespace-nowrap">Quality <ChevronDown height={11} /></span>
                        </div>
                        <span className="text-xs flex items-center gap-2 p-1 border border-slate-200 rounded-xl px-2 sm:px-4 text-gray-600 font-bold bg-gray-50 flex-wrap w-fit">Owned By <span className="truncate">{lead.name}</span> <Pencil size={14} className="shrink-0" /></span>
                    </div>
                    <button
                        onClick={() => setSelectedLead(null)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors shrink-0 w-fit"
                    >
                        <X size={15} className="text-gray-400" />
                    </button>
                </div>

                {/* icon row  */}
                <div className="flex gap-2 sm:gap-4 px-2 sm:px-4 py-2 border-gray-100 overflow-x-auto">
                    <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 cursor-pointer transition-colors shrink-0">
                        <Phone size={15} className="text-gray-600" />
                    </div>
                    <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 cursor-pointer transition-colors shrink-0">
                        <MessageCircle size={15} className="text-gray-600" />
                    </div>
                    <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 cursor-pointer transition-colors shrink-0">
                        <Share2Icon size={15} className="text-gray-600" />
                    </div>
                    <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 cursor-pointer transition-colors shrink-0">
                        <Bot size={15} className="text-gray-600" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 px-2 sm:px-4 py-2 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6">
                        <div className="flex md:flex-row md:items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors min-w-0">
                            <Mail size={15} className="text-gray-600 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium mb-1">EMAIL</p>
                                <p className="text-xs font-bold break-all line-clamp-2">{lead.email}</p>
                            </div>
                        </div>

                        <div className="flex md:flex-row md:items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors min-w-0">
                            <Phone size={15} className="text-gray-600 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium mb-1">CONTACT</p>
                                <p className="text-xs font-bold break-all">{lead.mobile}</p>
                            </div>
                        </div>

                        <div className="flex md:flex-row md:items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors min-w-0">
                            <Pencil size={15} className="shrink-0 text-gray-600" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium mb-1">STATUS</p>
                                <div className="flex gap-2 items-center flex-wrap">
                                    <p className={`text-xs font-semibold rounded-xl py-1 px-2 ${getStatusColor(detailedData?.lead.leadStatus).bg} ${getStatusColor(detailedData?.lead.leadStatus).text}`}>{detailedData?.lead.leadStatus || 'N/A'}</p>

                                    {detailedData.lead.leadStatus === 'Bad Lead' && <Pencil size={15} className="shrink-0 text-gray-600" />}
                                </div>
                            </div>
                        </div>

                        <div className="flex md:flex-row md:items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors min-w-0">
                            <BarChart3 size={15} className="text-gray-600 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium mb-1">QUALITY</p>
                                <p className="text-xs text-gray-900 font-semibold">--</p>
                            </div>
                        </div>

                        <div className="flex md:flex-row md:items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors min-w-0">
                            <User size={15} className="text-gray-600 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium mb-1">OWNER</p>
                                <p className="text-xs font-bold truncate">{lead.name || 'Not assigned'}</p>
                            </div>
                        </div>

                        <div className="flex md:flex-row md:items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors min-w-0">
                            <Briefcase size={15} className="text-gray-600 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium mb-1">SOURCE</p>
                                <p className="text-xs font-bold">{lead.source?.type || 'Unknown'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 p-2 sm:p-4 rounded-lg border border-green-200 min-w-0">
                        <div className="flex md:flex-row md:items-start gap-2 sm:gap-3 min-w-0">
                            <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 cursor-pointer transition-colors shrink-0">
                                <Phone size={18} className="text-green-600" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm font-extrabold mb-1">CALL STATUS TODAY</p>
                                <p className="text-xs text-gray-500 font-semibold">
                                    {detailedData?.lead.crm?.last_call_done_at
                                        ? `You have called this lead today.`
                                        : 'No call made today'}
                                </p>

                            </div>
                            {detailedData?.lead.crm?.last_call_done_at && <div className="p-2 pt-0 pl-1 rounded-xl bg-green-200 items-center justify-center">

                                <p className="text-xs text-green-900 font-semibold mt-2 flex items-center gap-1">
                                    <CircleCheck height={14} />
                                    Done
                                </p>

                            </div>}
                        </div>
                    </div>

                    {/* follow up  */}
                    <div className="flex flex-col gap-3 border border-slate-200 px-2 sm:px-4 py-4 rounded-xl mb-4">
                        <span className="text-sm font-bold">Follow UP</span>
                        <button className="flex items-center gap-3 text-emerald-700 text-xs sm:text-sm font-bold">
                            <Calendar size={16} className="shrink-0" />
                            <span>Set Follow Up Date</span>
                        </button>
                    </div>
                    {/* Activities */}
                    <div className="flex flex-col gap-3 border border-slate-200 px-2 sm:px-4 p-2 rounded-xl pointer hover:bg-gray-50 bg-gray-50"
                        onClick={() => setShowActivities(!showActivities)}
                    >
                        <div className="flex justify-between">
                            <p className="text-sm font-semibold">Lead Summary</p>
                            <ChevronDown
                                size={16}
                                className={`text-gray-400 transition-transform ${showActivities ? 'rotate-180' : ''
                                    }`}
                            />
                        </div>
                        {activities && activities.length > 0 ? (
                            <div className="relative">
                                <button
                                    className="w-full flex items-center justify-between  rounded-lg transition-colors"
                                >
                                    <div className="text-left">
                                        <p className="text-xs text-gray-400 font-semibold">{activities.length} activities</p>
                                    </div>

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
                                                    <div className="flex-1 border border-slate-200 p-2 sm:p-4 rounded-xl min-w-0">
                                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1 gap-2">
                                                            <p className="text-xs text-gray-400 font-medium whitespace-nowrap">
                                                                {activity.created_at._seconds
                                                                    ? new Date(activity.created_at._seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                                    : 'N/A'}
                                                            </p>
                                                        </div>
                                                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
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
                        ) : <span className="italic text-gray-400 text-xs font-semibold">No summary available</span>}
                    </div>
                </div>
            </div>
        </>
    );
}
