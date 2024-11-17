export interface FamilyMember {
    FirstName: string;
    LastName: string;
    MiddleName?: string;
    MaidenName?: string;
    BirthDate: string;
    DateDeath?: string;
    Gender?: string;
    BirthPlace: string;
    Church?: string;
    BaptismDate?: string;
    MarriageDate?: string;
    MilitaryService?: string;
    Occupation?: string;
    Education?: string;
    Father?:  string | null;
    Mother?:  string | null;
    History?: string;
  }