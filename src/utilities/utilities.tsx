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

  export function filterByGenerations(
    rootMemberId: string,
    allMembers: FamilyMember[],
    generations: number
  ): FamilyMember[] {
    const visited = new Set<string>();
    const result = new Set<FamilyMember>();
  
    function traverse(memberId: string, currentGeneration: number) {
      if (currentGeneration > generations || visited.has(memberId)) return;
  
      const member = allMembers.find((m) => m.id === memberId);
      if (!member) return;
  
      visited.add(memberId);
  
      // Add Father first if exists
      if (member.Father?.id && !visited.has(member.Father.id)) {
        const father = allMembers.find((m) => m.id === member.Father?.id);
        if (father) {
          result.add(father);
          visited.add(father.id); // Mark Father as visited
        }
      }
  
      // Add Mother second if exists
      if (member.Mother?.id && !visited.has(member.Mother.id)) {
        const mother = allMembers.find((m) => m.id === member.Mother?.id);
        if (mother) {
          result.add(mother);
          visited.add(mother.id); // Mark Mother as visited
        }
      }
  
      // Add the current member
      result.add(member);
  
      // Traverse parents
      if (member.Father?.id) traverse(member.Father.id, currentGeneration + 1);
      if (member.Mother?.id) traverse(member.Mother.id, currentGeneration + 1);
  
      // Traverse children
      if (member.Children) {
        member.Children.forEach((child) =>
          traverse(child.id, currentGeneration + 1)
        );
      }
  
      // Add MarriedTo member if exists and not already added
      if (member.MarriedTo?.id && !visited.has(member.MarriedTo.id)) {
        const spouse = allMembers.find((m) => m.id === member.MarriedTo?.id);
        if (spouse) {
          result.add(spouse);
          visited.add(spouse.id); // Mark spouse as visited
        }
      }
    }
  
    traverse(rootMemberId, 0);
  
    // Convert result set to an array and ensure order is correct
    return Array.from(result);
  }
  
  
  
  
