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
    MarriedTo?:{FirstName: string; LastName: string; MiddleName: string; id: string } | null;
    MarriageDate?: string;
    MilitaryService?: string;
    Occupation?: string;
    Education?: string;
    Father: { FirstName: string; LastName: string; MiddleName: string; id: string } | null;
    Mother:  { FirstName: string; LastName: string; MiddleName: string; id: string } | null;
    History?: string;
    id:string;
  }