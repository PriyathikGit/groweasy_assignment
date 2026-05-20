import { createContext, useState } from "react";
import { organisationData } from "../../data/leads";

export const OrgContext = createContext();

export function OrgProvider({ children }) {
  const [selectedOrgId, setSelectedOrgId] = useState(organisationData[0]?.id);
  const [orgList, setOrgList] = useState(organisationData);

  const swapOrganization = (selectedId) => {
    setSelectedOrgId(selectedId);
    
    // Find the index of the selected org
    const selectedIndex = orgList.findIndex(org => org.id === selectedId);
    
    if (selectedIndex > 0) {
      // Swap the selected org with the first org
      const newList = [...orgList];
      [newList[0], newList[selectedIndex]] = [newList[selectedIndex], newList[0]];
      setOrgList(newList);
    }
  };

  return (
    <OrgContext.Provider value={{ selectedOrgId, setSelectedOrgId: swapOrganization, orgList }}>
      {children}
    </OrgContext.Provider>
  );
}
