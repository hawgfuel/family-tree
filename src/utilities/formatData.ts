// formatData.ts

export const formatParentData = (parent: any) => {
  if (!parent) return ''; // Return empty string if no parent

  return {
    FirstName: parent.FirstName || '',
    LastName: parent.LastName || '',
    MiddleName: parent.MiddleName || '',
    BirthDate: parent.BirthDate ? new Date(parent.BirthDate).toLocaleDateString('en-US') : '',
    BaptismDate: parent.BaptismDate ? new Date(parent.BaptismDate).toLocaleDateString('en-US') : '',
  };
};

export const formatFamilyMemberData = (members: any[]) => {
  return members.map((member) => {
    const Father = formatParentData(member.Father); // Format Father data
    const Mother = formatParentData(member.Mother); // Format Mother data

    return {
      ...member,
      BirthDate: member.BirthDate ? new Date(member.BirthDate).toLocaleDateString('en-US') : '',
      BaptismDate: member.BaptismDate ? new Date(member.BaptismDate).toLocaleDateString('en-US') : '',
      MarriageDate: member.MarriageDate ? new Date(member.MarriageDate).toLocaleDateString('en-US') : '',
      Father: Father,
      Mother: Mother,
    };
  });
};
