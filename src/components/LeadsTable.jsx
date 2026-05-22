import { useState, useContext, useEffect } from "react";
import { Search, RefreshCw, ChevronRight, MoreHorizontal, Calendar, X } from "lucide-react";
import { StatusBadge, QualityBadge } from "./Badges";
import { leadsData } from "../../data/leads";
import { OrgContext } from "../context/OrgContext";
import { LeadDetailContext } from "../context/LeadDetailContext";
import { useDebounce } from "../hooks/useDebounce";

const columns = [
    { key: "lead_name", label: "Lead Name", hideClass: "" },
    { key: "email", label: "Email", hideClass: "hidden sm:table-cell" },
    { key: "contact", label: "Contact", hideClass: "hidden lg:table-cell" },
    { key: "date_created", label: "Date Created", hideClass: "hidden md:table-cell" },
    { key: "company", label: "Company", hideClass: "hidden lg:table-cell" },
    { key: "follow_up", label: "Follow Up", hideClass: "hidden md:table-cell" },
    { key: "status", label: "Status", hideClass: "" },
    { key: "quality", label: "Quality", hideClass: "hidden md:table-cell" },
    { key: "actions", label: "Actions", hideClass: "" },
];

const LeadRow = ({ lead, onLeadClick, onFollowUpClick }) => {
    console.log(lead)
    const realDate = new Date(lead.created_at._seconds * 1000).toLocaleString()

    const renderCell = (column) => {
        switch (column.key) {
            case "lead_name":
                return <span className="text-sm font-medium text-gray-900">{lead.name}</span>;
            case "email":
                return <span className="text-sm text-gray-700">{lead.email}</span>;
            case "contact":
                return <span className="text-sm text-gray-700">{lead.mobile}</span>;
            case "date_created":
                return <span className="text-sm text-gray-700">{realDate}</span>;
            case "company":
                return <span className="text-sm text-gray-700">{lead.company}</span>;
            case "status":
                return <StatusBadge status={lead.leadStatus} />;
            case "follow_up":
                return (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onFollowUpClick(lead);
                        }}
                        className="flex items-center gap-2 border border-emerald-200 p-1 px-2 rounded-xl text-xs text-gray-500 hover:text-emerald-600 font-medium transition-colors"
                    >
                        <Calendar size={12} /> Set Follow Up
                    </button>
                );
            case "quality":
                return <QualityBadge quality={lead.quality} />;
            case "actions":
                return (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onLeadClick(lead);
                        }}
                        className="flex items-center gap-0.5 text-sm text-gray-500 hover:text-emerald-600 font-medium transition-colors cursor-pointer"
                    >
                        More
                        <ChevronRight size={14} />
                    </button>
                );
            default:
                return null;
        }
    }

    return (
        <tr
            className="border-b border-gray-100 hover:bg-gray-50 transition-colors group"
        >
            {columns.map((column) => (
                <td key={column.key} className={`py-3 px-4 ${column.hideClass}`}>
                    {renderCell(column)}
                </td>
            ))}
        </tr>
    );
}

const FollowUpPopup = ({ isOpen, onClose, leadName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/80"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-lg w-74 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Set Next Follow Up</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X size={18} className="text-gray-400" />
                    </button>
                </div>

                {/* Lead Name */}
                <p className="text-sm text-gray-600 mb-4">
                    for <span className="font-bold text-black">{leadName}</span>
                </p>

                {/* Content */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Follow Up Date & Time
                    </label>
                    <p className="text-sm text-gray-600 border border-slate-200 p-2 rounded-xl w-fit px-4">19 May 2026, 10:30</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 justify-between">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800 transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function LeadsTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFollowUpModal, setShowFollowUpModal] = useState(false);
    const [selectedFollowUpLead, setSelectedFollowUpLead] = useState(null);
    const [isZoom100, setIsZoom100] = useState(true);
    const { selectedOrgId } = useContext(OrgContext);
    const { selectedLead, setSelectedLead } = useContext(LeadDetailContext);

    useEffect(() => {
        const checkZoom = () => {
            const zoomLevel = window.outerWidth / window.innerWidth;
            setIsZoom100(Math.abs(zoomLevel - 1) < 0.01);
        };

        checkZoom();
        window.addEventListener('resize', checkZoom);
        return () => window.removeEventListener('resize', checkZoom);
    }, []);

    const debouncedQuery = useDebounce(searchQuery, 300)

    const filtered = leadsData.filter((lead) => {
        // Filter by organization ID
        if (lead.org_id !== selectedOrgId) return false;

        // Filter by search query
        if (!debouncedQuery) return true;
        const q = debouncedQuery.toLowerCase();
        // console.log(q)
        return (
            lead?.email?.toLowerCase().includes(q) ||
            lead?.contact?.toLowerCase().includes(q)
        );
    });

    return (
        <div className={`${selectedLead ? (isZoom100 ? 'w-4xl' : 'w-full') : ''}  rounded-xl overflow-hidden`}>

            {/* Table header bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-3">
                <h2 className="text-md font-bold">Your Leads</h2>
                <div className="flex items-center gap-2">
                    <div className="relative flex-1 sm:flex-none flex items-center">

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Enter email or phone number..."
                            className="text-sm p-2 py-2 border border-gray-200 rounded-l-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full sm:w-88 placeholder:text-gray-400"
                        />
                        <div className="bg-emerald-800 py-3 px-3 rounded-r-lg">
                            <Search
                                size={14}
                                className="text-white"
                            />
                        </div>
                    </div>
                    <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shrink-0">
                        <RefreshCw size={14} className="text-gray-500" />
                    </button>
                </div>
            </div>
            <FollowUpPopup
                isOpen={showFollowUpModal}
                onClose={() => setShowFollowUpModal(false)}
                leadName={selectedFollowUpLead?.name}
            />
            {/* Table */}
            <div className="overflow-x-auto border rounded-xl border-slate-200 shadow-lg">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${column.hideClass}`}
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {filtered.length > 0 ? (
                            filtered.map((lead) => (
                                <LeadRow
                                    key={lead.id}
                                    lead={lead}
                                    onLeadClick={setSelectedLead}
                                    onFollowUpClick={(lead) => {
                                        setSelectedFollowUpLead(lead);
                                        setShowFollowUpModal(true);
                                    }}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="py-12 text-center text-sm text-gray-400">
                                    No leads found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
