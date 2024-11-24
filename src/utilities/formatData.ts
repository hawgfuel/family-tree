export const formatFamilyMemberData = (members: any[]) => {
  return members
    .map((member, index) => {
      return {
        ...member,
        id: member._id,
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
          typeof member.Mother === 'object' && member.MarriedTo
            ? {
                id: member.MarriedTo._id,
                FirstName: member.MarriedTo.FirstName,
                LastName: member.MarriedTo.LastName,
              }
            : null,
      };
    })
    .sort((a, b) => {
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
