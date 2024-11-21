// formatData.ts

export const formatFamilyMemberData = (members: any[]) => {
  return members.map((member) => {
    return {
      ...member,
      id: member._id,
      BirthDate: member.BirthDate ? new Date(member.BirthDate).toLocaleDateString('en-US') : '',
      BaptismDate: member.BaptismDate ? new Date(member.BaptismDate).toLocaleDateString('en-US') : '',
      MarriageDate: member.MarriageDate ? new Date(member.MarriageDate).toLocaleDateString('en-US') : '',
      Father: typeof member.Father === 'object' && member.Father ? { 
        id: member.Father._id, 
        FirstName: member.Father.FirstName, 
        LastName: member.Father.LastName 
      } : null,
      
      Mother: typeof member.Mother === 'object' && member.Mother ? { 
        id: member.Mother._id, 
        FirstName: member.Mother.FirstName, 
        LastName: member.Mother.LastName 
      } : null,

      MarriedTo: typeof member.Mother === 'object' && member.MarriedTo ? { 
        id: member.MarriedTo._id, 
        FirstName: member.MarriedTo.FirstName, 
        LastName: member.MarriedTo.LastName 
      } : null,
    };
  })
  .sort((a, b) => {
    const dateA = a.BirthDate ? new Date(a.BirthDate).getTime() : 0;
    const dateB = b.BirthDate ? new Date(b.BirthDate).getTime() : 0;
    return dateA - dateB;
  });
};
