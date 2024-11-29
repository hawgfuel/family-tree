import { FamilyMember } from '../common/types';

export function getMostCommonFirstNameByGender(
  data: FamilyMember[],
  gender: 'male' | 'female'
): string {
  const filteredData = data.filter((member) => member.Gender === gender);
  if (filteredData.length === 0) return '';

  const nameCounts = filteredData.reduce((counts, member) => {
    counts[member.FirstName] = (counts[member.FirstName] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  return Object.keys(nameCounts).reduce((a, b) =>
    nameCounts[a] > nameCounts[b] ? a : b
  );
}
  
export function getMostCommonSurname(data: FamilyMember[]): string {
  if (data.length === 0) return '';
  const surnameCounts = data.reduce((counts, member) => {
    if (member.LastName) {
      counts[member.LastName] = (counts[member.LastName] || 0) + 1;
    }
    return counts;
  }, {} as Record<string, number>);

  return Object.keys(surnameCounts).reduce((a, b) =>
    surnameCounts[a] > surnameCounts[b] ? a : b
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

  export function getFamilyTimeSpan(data: FamilyMember[]): number {
    if (data.length === 0) return 0;
  
    // Find the oldest (earliest birth date) and youngest (latest birth date) family members
    const oldestMember = data.reduce((oldest, current) =>
      new Date(current.BirthDate) < new Date(oldest.BirthDate) ? current : oldest
    );
    const youngestMember = data.reduce((youngest, current) =>
      new Date(current.BirthDate) > new Date(youngest.BirthDate) ? current : youngest
    );
  
    // Calculate the time span in years
    const oldestBirthDate = new Date(oldestMember.BirthDate);
    const youngestBirthDate = new Date(youngestMember.BirthDate);
  
    const timeSpanInMilliseconds = youngestBirthDate.getTime() - oldestBirthDate.getTime();
    const timeSpanInYears = timeSpanInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
  
    return Math.round(timeSpanInYears); // Rounded to the nearest whole number
  }
  
