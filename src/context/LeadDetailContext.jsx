import { createContext, useState } from "react";

export const LeadDetailContext = createContext();

export function LeadDetailProvider({ children }) {
    const [selectedLead, setSelectedLead] = useState(null);

    return (
        <LeadDetailContext.Provider value={{ selectedLead, setSelectedLead }}>
            {children}
        </LeadDetailContext.Provider>
    );
}
