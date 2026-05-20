import Sidebar from "./components/Sidebar";
import ManageLeads from "./components/ManageLeads";
import { OrgProvider } from "./context/OrgContext";
import { LeadDetailProvider } from "./context/LeadDetailContext";
import { useEffect } from "react";

export default function App() {

  return (
    <OrgProvider>
      <LeadDetailProvider>
        <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
          <Sidebar />
          <ManageLeads />
        </div>
      </LeadDetailProvider>
    </OrgProvider>
  );
}