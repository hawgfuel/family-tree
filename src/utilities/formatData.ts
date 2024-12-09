
export const formatFamilyMemberData = (
  members: any[],
  dateRange: { startDate?: string; endDate?: string } = {}
) => {
  const { startDate = '', endDate = '' } = dateRange;

  // Step 1: Parse dates if valid
  const parsedStartDate = startDate ? new Date(startDate) : null;
  const parsedEndDate = endDate ? new Date(endDate) : null;

  // Validate the date range
  const isValidDateRange =
    parsedStartDate &&
    parsedEndDate &&
    parsedStartDate <= parsedEndDate;

  // Step 2: Map members to a consistent format
  const formattedMembers = members.map((member, index) => ({
    ...member,
    id: member._id || member.id,
    History: member.History,
    BirthDate: member.BirthDate ? new Date(member.BirthDate).toLocaleDateString('en-US') : '',
    BaptismDate: member.BaptismDate ? new Date(member.BaptismDate).toLocaleDateString('en-US') : '',
    MarriageDate: member.MarriageDate ? new Date(member.MarriageDate).toLocaleDateString('en-US') : '',
    index, // Keep track of the original order
    Father:
      typeof member.Father === 'object' && member.Father
        ? {
            id: member.Father._id || member.Father.id,
            FirstName: member.Father.FirstName,
            MiddleName: member.Father?.MiddleName?.charAt(0) || '',
            LastName: member.Father.LastName,
          }
        : null,
    Mother:
      typeof member.Mother === 'object' && member.Mother
        ? {
            id: member.Mother._id || member.Mother.id,
            FirstName: member.Mother.FirstName,
            MiddleName: member.Mother?.MiddleName?.charAt(0) || '',
            LastName: member.Mother.LastName,
          }
        : null,
    MarriedTo:
      typeof member.MarriedTo === 'object' && member.MarriedTo
        ? {
            id: member.MarriedTo._id || member.MarriedTo.id,
            FirstName: member.MarriedTo.FirstName,
            MiddleName: member.MarriedTo?.MiddleName?.charAt(0) || '',
            LastName: member.MarriedTo.LastName,
          }
        : null,
  }));

  // Step 3: Filter members by date range if valid
  const filteredMembers = isValidDateRange
    ? formattedMembers.filter((member) => {
        const birthDate = member.BirthDate ? new Date(member.BirthDate) : null;
        const marriageDate = member.MarriageDate ? new Date(member.MarriageDate) : null;
        const dateOfDeath = member.DateDeath ? new Date(member.DateDeath) : null;
        // Check if any date falls within the range
        const isWithinRange = (date: Date | null) =>
          date && parsedStartDate && parsedEndDate && date >= parsedStartDate && date <= parsedEndDate;

        return isWithinRange(birthDate) || isWithinRange(marriageDate) || isWithinRange(dateOfDeath);
      })
    : formattedMembers;

  // Step 4: Derive children relationships
  const childrenMap: Record<string, any[]> = {};

  filteredMembers.forEach((member) => {
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

  const enrichedMembers = filteredMembers.map((member) => ({
    ...member,
    Children: childrenMap[member.id] || [], // Add children array dynamically
  }));

// Step 5: Sort the enriched members
return enrichedMembers.sort((a, b) => {
  const dateA = a.BirthDate
    ? new Date(a.BirthDate).getTime()
    : a.MarriageDate
    ? new Date(a.MarriageDate).getTime()
    : a.DateDeath
    ? new Date(a.DateDeath).getTime()
    : null;

  const dateB = b.BirthDate
    ? new Date(b.BirthDate).getTime()
    : b.MarriageDate
    ? new Date(b.MarriageDate).getTime()
    : b.DateDeath
    ? new Date(b.DateDeath).getTime()
    : null;

  // Compare BirthDate, MarriageDate, or DateDeath if available
  if (dateA && dateB) return dateA - dateB;
  if (dateA) return -1; // a has a valid date but b does not
  if (dateB) return 1;  // b has a valid date but a does not

  // Fallback to original order based on index
  return a.index - b.index;
});

};
