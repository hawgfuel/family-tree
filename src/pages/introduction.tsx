import { FamilyMember } from '../common/types';

interface IntroductionProps {
    mostCommonFirstName: string;
    oldestFamilyMember: FamilyMember | undefined;  // Allow undefined
    youngestFamilyMember: FamilyMember | undefined;  // Allow undefined
}

export function Introduction({ mostCommonFirstName, oldestFamilyMember, youngestFamilyMember }: IntroductionProps) {
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
        </div>
    );
}
