import { FamilyMember } from '../common/types';
import { formatFamilyMemberData } from '../utilities/formatData';

export const fetchFamilyTreeData = async (): Promise<FamilyMember[]> => {
  const apiKey = import.meta.env.VITE_COCKPIT_API_KEY;
  const response = await fetch(`https://www.guicoder.com/familytree/api/content/items/FamilyTree`);
  const data = await response.json();
  const formattedData = formatFamilyMemberData(data);
  return formattedData;
};
