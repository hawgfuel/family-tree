export interface FamilyMember {
    FirstName: string;
    LastName: string;
    MiddleName?: string;
    MaidenName?: string;
    BirthDate: string;
    BirthPlace?:string
    DateDeath?: string;
    Gender?: string;
    Church?: string;
    BaptismDate?: string;
    MarriedTo?:{FirstName: string; LastName: string; MiddleName: string; id: string } | null;
    MarriageDate?: string;
    Father?: { FirstName: string; LastName: string; MiddleName: string; id: string } | null;
    Mother?:  { FirstName: string; LastName: string; MiddleName: string; id: string } | null;
    History?: string;
    Children?: [{child: string; id:string}];
    id:string;
  }

export interface FamilyTreeState {
    originalData: FamilyMember[];  // Array of FamilyMember
    filteredData: FamilyMember[];  // Array of FamilyMember
    dateRange: { startDate: string; endDate: string };  // Start and end dates
  }