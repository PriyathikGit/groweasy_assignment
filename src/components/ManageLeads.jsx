import { useContext, useState } from "react";
import FiltersBar from "./FlitersBar";
import PerformanceOverview from "./PerformanceOverview";
import LeadsTable from "./LeadsTable";
import LeadDetailPanel from "./LeadDetailPanel";
import { LeadDetailContext } from "../context/LeadDetailContext";
import Header from "./Header";

export default function ManageLeads({ isMobileOpen, setIsMobileOpen }) {
    const [activeFilter, setActiveFilter] = useState("Last 30 Days");
    const [activeTags, setActiveTags] = useState(["Status: Not Dialed"]);
    const { selectedLead } = useContext(LeadDetailContext)
    console.log(selectedLead)

    const removeTag = (tag) => setActiveTags((prev) => prev.filter((t) => t !== tag));

    return (
        <div className="flex flex-1 flex-col">
            <Header isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
            <main className="flex-1 overflow-y-auto bg-gray-50 p-3 sm:p-4 md:p-6">

                {/* Filters */}
                <FiltersBar
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    activeTags={activeTags}
                    onRemoveTag={removeTag}
                />

                {/* Performance stats */}
                <PerformanceOverview />

                {/* Leads table */}
                <div className={`${selectedLead ? 'flex flex-col lg:flex-row gap-4 h-125' : ''}`}>
                    <div className="flex-1 overflow-hidden min-w-0">
                        <LeadsTable />
                    </div>
                    {selectedLead && <div className="w-full lg:w-fit shrink-0"><LeadDetailPanel /></div>}
                </div>
            </main>
        </div>
    );
}