import { FamilyMember } from '../common/types';

export function getMostCommonFirstName(data: FamilyMember[]): string {
    if (data.length === 0) return '';
    const nameCounts = data.reduce((counts, member) => {
      counts[member.FirstName] = (counts[member.FirstName] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
    return Object.keys(nameCounts).reduce((a, b) =>
      nameCounts[a] > nameCounts[b] ? a : b
    );
  }
  
  export function getOldestFamilyMember(data: FamilyMember[]): FamilyMember | null {
    if (data.length === 0) return null;
    return data.reduce((oldest, current) =>
      new Date(current.BirthDate) < new Date(oldest.BirthDate) ? current : oldest
    );
  }

  export function getYoungestFamilyMember(data: FamilyMember[]): FamilyMember | null {
    if (data.length === 0) return null;
    return data.reduce((youngest, current) =>
      new Date(current.BirthDate) > new Date(youngest.BirthDate) ? current : youngest
    );
  }
  
