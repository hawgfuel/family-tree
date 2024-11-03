import { FamilyMember } from '../common/types'; // Adjust the import based on your file structure

export const fetchFamilyTreeData = async (): Promise<FamilyMember[]> => {
  const response = await fetch('https://www.guicoder.com/familytree/api/content/items/FamilyTree');
  const data = await response.json();

  // Format dates as needed
  const formattedData = data.map((member: any) => { // Change 'any' to the actual type if possible
    return {
      ...member,
      BirthDate: member.BirthDate ? new Date(member.BirthDate).toLocaleDateString('en-US') : '',
      BaptismDate: member.BaptismDate ? new Date(member.BaptismDate).toLocaleDateString('en-US') : '',
      MarriageDate: member.MarriageDate ? new Date(member.MarriageDate).toLocaleDateString('en-US') : '',
    };
  });

  return formattedData;
};
