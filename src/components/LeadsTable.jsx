import { useState, useContext } from "react";
import { Search, RefreshCw, ChevronRight, MoreHorizontal } from "lucide-react";
import { StatusBadge, QualityBadge } from "./Badges";
import { leadsData } from "../../data/leads";
import { OrgContext } from "../context/OrgContext";
import { LeadDetailContext } from "../context/LeadDetailContext";
import { useDebounce } from "../hooks/useDebounce";

function LeadRow({ lead, onLeadClick }) {
    const realDate = new Date(lead.created_at._seconds * 1000).toLocaleString()
    return (
        <tr
            className="border-b border-gray-100 hover:bg-gray-50 transition-colors group cursor-pointer"
            onClick={() => onLeadClick(lead)}
        >
            <td className="py-3 px-4">
                <span className="text-sm font-medium text-gray-900">{lead.name}</span>
            </td>
            <td className="py-3 px-4">
                <span className="text-sm text-gray-700">{lead.email}</span>
            </td>
            <td className="py-3 px-4">
                <span className="text-sm text-gray-700">{lead.mobile}</span>
            </td>
            <td className="py-3 px-4">
                <span className="text-sm text-gray-700">{realDate}</span>
            </td>
            <td className="py-3 px-4">
                <span className="text-sm text-gray-700">{lead.company}</span>
            </td>
            <td className="py-3 px-4">
                <StatusBadge status={lead.status} />
            </td>

            <td className="py-3 px-4">
                <QualityBadge quality={lead.quality} />
            </td>

            <td className="py-3 px-4">
                <button className="flex items-center gap-0.5 text-sm text-gray-500 hover:text-emerald-600 font-medium transition-colors group-hover:text-emerald-600">
                    More
                    <ChevronRight size={14} />
                </button>
            </td>
        </tr>
    );
}

const columns = [
    { key: "lead_name", label: "Lead Name" },
    { key: "email", label: "Email" },
    { key: "contact", label: "Contact" },
    { key: "date_created", label: "Date Created" },
    { key: "company", label: "Company" },
    { key: "status", label: "Status" },
    { key: "quality", label: "Quality" },
    { key: "actions", label: "Actions" },
];

export default function LeadsTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const { selectedOrgId } = useContext(OrgContext);
    const { setSelectedLead, selectedLead } = useContext(LeadDetailContext);

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
        <div className={`${selectedLead ? 'max-w-180' : ''}  rounded-xl overflow-hidden`}>

            {/* Table header bar */}
            <div className="flex items-center justify-between  py-3">
                <h2 className="text-md font-semibold text-gray-800">Your Leads</h2>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search
                            size={14}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Enter email or phone number..."
                            className="text-sm pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-56 placeholder:text-gray-400"
                        />
                    </div>
                    <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <RefreshCw size={14} className="text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border rounded-xl border-slate-200">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="text-left px-4 py-2.5 text-xs font-semibold  uppercase tracking-wider whitespace-nowrap"
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {filtered.length > 0 ? (
                            filtered.map((lead) => <LeadRow key={lead.id} lead={lead} onLeadClick={setSelectedLead} />)
                        ) : (
                            <tr>
                                <td colSpan={8} className="py-12 text-center text-sm text-gray-400">
                                    No leads found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            {/* <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
               <span>Load more</span>
            </div> */}
        </div>
    );
}