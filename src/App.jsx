import Sidebar from "./components/Sidebar";
import ManageLeads from "./components/ManageLeads";
import { OrgProvider } from "./context/OrgContext";
import { LeadDetailProvider } from "./context/LeadDetailContext";
import { useState, useEffect } from "react";

export default function App() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <OrgProvider>
      <LeadDetailProvider>
        <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
          <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
          <ManageLeads isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
        </div>
      </LeadDetailProvider>
    </OrgProvider>
  );
}