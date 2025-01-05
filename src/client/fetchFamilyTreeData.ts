import { FamilyMember } from '../common/types';
import { formatFamilyMemberData } from '../utilities/formatData';

export const fetchFamilyTreeData = async (): Promise<FamilyMember[]> => {
  const response = await fetch(`https://www.guicoder.com/familytree/api/content/items/FamilyTree?populate=1`);
  const data = await response.json();
  const formattedData = formatFamilyMemberData(data);
  return formattedData;
};
