import { FamilyMember } from '../common/types'; // Adjust the import based on your file structure
import { formatFamilyMemberData } from '../utilities/formatData';

export const fetchFamilyTreeData = async (): Promise<FamilyMember[]> => {
  const apiKey = import.meta.env.VITE_COCKPIT_API_KEY;
  const response = await fetch(`https://www.guicoder.com/familytree/api/content/items/FamilyTree?token=${apiKey}&populate=1`);
  const data = await response.json();
  const formattedData = formatFamilyMemberData(data);
  return formattedData;
};
