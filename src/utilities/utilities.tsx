import { FamilyMember } from '../common/types';

export function getMostCommonFirstName(familyMembers: FamilyMember[]): string {
    const nameCount: Record<string, number> = {};

    familyMembers.forEach(member => {
        const firstName = member.FirstName;
        nameCount[firstName] = (nameCount[firstName] || 0) + 1;
    });

    // Find the name with the highest count
    let mostCommonName = "";
    let maxCount = 0;

    for (const name in nameCount) {
        if (nameCount[name] > maxCount) {
            mostCommonName = name;
            maxCount = nameCount[name];
        }
    }

    return mostCommonName;
}

export function getOldestFamilyMember(familyMembers: FamilyMember[]): FamilyMember {

    return familyMembers.reduce((oldest, member) => {
        const oldestBirthDate = new Date(oldest.BirthDate);
        const memberBirthDate = new Date(member.BirthDate);
        return memberBirthDate < oldestBirthDate ? member : oldest;
    });
}

export function getYoungestFamilyMember(familyMembers: FamilyMember[]): FamilyMember {

    return familyMembers.reduce((oldest, member) => {
        const oldestBirthDate = new Date(oldest.BirthDate);
        const memberBirthDate = new Date(member.BirthDate);
        return memberBirthDate > oldestBirthDate ? member : oldest;
    });
}
