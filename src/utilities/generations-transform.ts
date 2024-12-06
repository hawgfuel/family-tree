
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

    // Only add member if within the allowed generations
    if (currentGeneration <= generations) {
      result.add(member);
    }

    // Traverse parents only if within generation limits
    if (currentGeneration < generations) {
      if (member.Father?.id) traverse(member.Father.id, currentGeneration + 1);
      if (member.Mother?.id) traverse(member.Mother.id, currentGeneration + 1);
    }

    // Traverse children only if within generation limits
    if (currentGeneration < generations && member.Children) {
      member.Children.forEach((child) =>
        traverse(child.id, currentGeneration + 1)
      );
    }

    // Add siblings only if within the same generation
    if (currentGeneration <= generations && (member.Father?.id || member.Mother?.id)) {
      allMembers
        .filter(
          (m) =>
            (m.Father?.id === member.Father?.id || m.Mother?.id === member.Mother?.id) &&
            m.id !== member.id &&
            !visited.has(m.id)
        )
        .forEach((sibling) => {
          result.add(sibling);
          visited.add(sibling.id);
        });
    }

    // Add MarriedTo member only if within the same generation
    if (currentGeneration <= generations && member.MarriedTo?.id && !visited.has(member.MarriedTo.id)) {
      const spouse = allMembers.find((m) => m.id === member.MarriedTo?.id);
      if (spouse) {
        result.add(spouse);
        visited.add(spouse.id);
      }
    }
  }

  traverse(rootMemberId, 0);

  // Convert result set to an array
  return Array.from(result);
}
