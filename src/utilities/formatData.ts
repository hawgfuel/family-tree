export const formatFamilyMemberData = (members: any[]) => {
  // Step 1: Map members to a consistent format
  const formattedMembers = members.map((member, index) => ({
    ...member,
    id: member._id,
    History:member.History,
    BirthDate: member.BirthDate ? new Date(member.BirthDate).toLocaleDateString('en-US') : '',
    BaptismDate: member.BaptismDate ? new Date(member.BaptismDate).toLocaleDateString('en-US') : '',
    MarriageDate: member.MarriageDate ? new Date(member.MarriageDate).toLocaleDateString('en-US') : '',
    index, // Keep track of the original order
    Father:
      typeof member.Father === 'object' && member.Father
        ? {
            id: member.Father._id,
            FirstName: member.Father.FirstName,
            LastName: member.Father.LastName,
          }
        : null,
    Mother:
      typeof member.Mother === 'object' && member.Mother
        ? {
            id: member.Mother._id,
            FirstName: member.Mother.FirstName,
            LastName: member.Mother.LastName,
          }
        : null,
    MarriedTo:
      typeof member.MarriedTo === 'object' && member.MarriedTo
        ? {
            id: member.MarriedTo._id,
            FirstName: member.MarriedTo.FirstName,
            LastName: member.MarriedTo.LastName,
          }
        : null,
  }));

  // Step 2: Derive children relationships
  const childrenMap: Record<string, any[]> = {};

  formattedMembers.forEach((member) => {
    if (member.Father?.id) {
      if (!childrenMap[member.Father.id]) {
        childrenMap[member.Father.id] = [];
      }
      childrenMap[member.Father.id].push(member);
    }
    if (member.Mother?.id) {
      if (!childrenMap[member.Mother.id]) {
        childrenMap[member.Mother.id] = [];
      }
      childrenMap[member.Mother.id].push(member);
    }
  });

  const enrichedMembers = formattedMembers.map((member) => ({
    ...member,
    Children: childrenMap[member.id] || [], // Add children array dynamically
  }));

  // Step 3: Sort the enriched members
  return enrichedMembers.sort((a, b) => {
    const dateA = a.BirthDate
      ? new Date(a.BirthDate).getTime()
      : a.MarriageDate
      ? new Date(a.MarriageDate).getTime()
      : null;

    const dateB = b.BirthDate
      ? new Date(b.BirthDate).getTime()
      : b.MarriageDate
      ? new Date(b.MarriageDate).getTime()
      : null;

    // Compare BirthDate or MarriageDate if available
    if (dateA && dateB) return dateA - dateB;
    if (dateA) return -1; // a has a valid date but b does not
    if (dateB) return 1;  // b has a valid date but a does not

    // Fallback to original order based on index
    return a.index - b.index;
  });
};
