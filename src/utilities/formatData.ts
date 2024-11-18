// formatData.ts

export const formatParentData = (parent: any) => {
  if (!parent) return '';

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
    const Father = formatParentData(member.Father);
    const Mother = formatParentData(member.Mother);

    return {
      ...member,
      BirthDate: member.BirthDate ? new Date(member.BirthDate).toLocaleDateString('en-US') : '',
      BaptismDate: member.BaptismDate ? new Date(member.BaptismDate).toLocaleDateString('en-US') : '',
      MarriageDate: member.MarriageDate ? new Date(member.MarriageDate).toLocaleDateString('en-US') : '',
      Father: typeof member.Father === 'object' && member.Father ? `${member.Father.FirstName} ${member.Father.LastName}` : member.Father || '',
      Mother: typeof member.Mother === 'object' && member.Mother ? `${member.Mother.FirstName} ${member.Mother.LastName}` : member.Mother || '',
    };
  });
};
