import { FamilyMember } from '../common/types';

export function getImmediateFamily(
  rootMemberId: string,
  allMembers: FamilyMember[]
): FamilyMember[] {
  const visited = new Set<string>();
  const result = new Set<FamilyMember>();

  function traverse(memberId: string) {
    if (visited.has(memberId)) return;

    const member = allMembers.find((m) => m.id === memberId);
    if (!member) return;

    visited.add(memberId);
    result.add(member);

    // Add father and mother if available
    if (member.Father?.id && !visited.has(member.Father.id)) {
      const father = allMembers.find((m) => m.id === member.Father?.id);
      if (father) {
        result.add(father);
        visited.add(father.id);
      }
    }

    if (member.Mother?.id && !visited.has(member.Mother.id)) {
      const mother = allMembers.find((m) => m.id === member.Mother?.id);
      if (mother) {
        result.add(mother);
        visited.add(mother.id);
      }
    }

    // Add siblings (children of the father or mother)
    if (member.Father?.id || member.Mother?.id) {
      allMembers
        .filter(
          (m) =>
            (m.Father?.id === member.Father?.id || m.Mother?.id === member.Mother?.id) &&
            m.id !== member.id && // Exclude the current member
            !visited.has(m.id)
        )
        .forEach((sibling) => {
          result.add(sibling);
          visited.add(sibling.id);
        });
    }
  }

  traverse(rootMemberId);

  // Convert result set to an array and return it
  const returnVal = Array.from(result);
  if (returnVal.length > 0) {
    const firstItem = returnVal[0];
  
    // Remove the first item and add it to index 2
    returnVal.splice(0, 1); // Removes the item at index 0
    returnVal.splice(2, 0, firstItem); // Inserts it at index 2
  }

  return returnVal;
}
