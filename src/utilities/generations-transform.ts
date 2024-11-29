
import { FamilyMember } from '../common/types';

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
  
      // Add siblings (children of the same parents)
      if (member.Father?.id || member.Mother?.id) {
        allMembers
          .filter(
            (m) =>
              (m.Father?.id === member.Father?.id || m.Mother?.id === member.Mother?.id) &&
              m.id !== member.id && // Exclude the current member
              !visited.has(m.id) // Exclude already visited members
          )
          .forEach((sibling) => {
            result.add(sibling);
            visited.add(sibling.id); // Mark siblings as visited
          });
      }
  
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
  
  