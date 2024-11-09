import { FamilyMember } from '../common/types';
import {downloadCSV} from '../components/download-csv/download-csv';

interface IntroductionProps {
    mostCommonFirstName: string;
    oldestFamilyMember: FamilyMember | undefined;
    youngestFamilyMember: FamilyMember | undefined;
    filteredData: FamilyMember[];  // Corrected this to an array of FamilyMember
  }
  

export function Introduction({ mostCommonFirstName, oldestFamilyMember, youngestFamilyMember, filteredData}: IntroductionProps) {
    return (
        <div className='introduction'>
            <h1>Werstler Family Tree</h1>
            <p>Most common first name: {mostCommonFirstName}</p>
            <p>
                Oldest family member: {oldestFamilyMember ? `${oldestFamilyMember.FirstName} ${oldestFamilyMember.LastName} Born: ${oldestFamilyMember.BirthDate}` : "No data available"}
            </p>
            <p>
                Youngest family member: {youngestFamilyMember ? `${youngestFamilyMember.FirstName} ${youngestFamilyMember.LastName} Born: ${youngestFamilyMember.BirthDate}` : "No data available"}
            </p>
            <p>Download <a className='csv-download' onClick={() => downloadCSV(filteredData)}>CSV</a> of filtered table data.</p>
        </div>
    );
}
