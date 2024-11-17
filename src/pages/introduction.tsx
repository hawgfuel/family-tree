import { FamilyMember } from '../common/types';
import {downloadCSV} from '../components/download-csv/download-csv';

interface IntroductionProps {
    introductionData: {
        totalCount: number;
        mostCommonFirstName: string;
        oldestFamilyMember: FamilyMember;
        youngestFamilyMember: FamilyMember;
        filteredData: FamilyMember[]; 
    };
  }
  
  export function Introduction({ introductionData }: IntroductionProps) {
    const {
    totalCount,
      mostCommonFirstName,
      oldestFamilyMember,
      youngestFamilyMember,
      filteredData,
    } = introductionData;
    return (
        <div className='introduction'>
            <h1>Werstler Family Tree</h1>
            <ul className='introduction-data'>
                <li><span>Total number of family members:</span> {totalCount}</li>
                <li><span>Most common first name:</span> {mostCommonFirstName}</li>
                <li>
                    <span>Oldest family member:</span> {oldestFamilyMember ? `${oldestFamilyMember.FirstName} ${oldestFamilyMember.LastName} Born: ${oldestFamilyMember.BirthDate}` : "No data available"}
                </li>
                <li>
                    <span>Youngest family member:</span> {youngestFamilyMember ? `${youngestFamilyMember.FirstName} ${youngestFamilyMember.LastName} Born: ${youngestFamilyMember.BirthDate}` : "No data available"}
                </li>
                <li><span>Download</span> <a className='csv-download' onClick={() => downloadCSV(filteredData)}>CSV</a> of filtered table data and save as an excel doc.</li>
            </ul>
        </div>
    );
}
