
import { FamilyMember } from '../../common/types';

export const downloadCSV = (data: FamilyMember[], fileName: string = 'family-tree.csv') => {
  // Create CSV headers
  const headers = ['FirstName', 'MiddleName', 'LastName', 'MaidenName', 'BirthDate', 'BirthPlace', 'Church', 'BaptismDate', 'Married to', 'MarriageDate',  'Father', 'Mother', 'Date of death', 'History']; // Add other fields if needed
  
  // Convert the data array to CSV format
  const csvRows = [
    headers.join(','), // Header row
    ...data.map((member) => [
      member.FirstName,
      member.MiddleName,
      member.LastName,
      member.MaidenName,
      member.BirthDate,
      member.BirthPlace,
      member.Church,
      member.BaptismDate,
      member.MarriedTo,
      member.MarriageDate,
      member.Father,
      member.Mother,
      member.DateDeath,
      member.History,
    ].join(',')), // Data rows
  ];

  // Create a Blob from the CSV string
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

  // Create a link element and trigger download
  const link = document.createElement('a');
  if (link.download !== undefined) {
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName); // Use dynamic filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
