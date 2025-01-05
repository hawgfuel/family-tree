// types.ts
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
    originalData: FamilyMember[];
    filteredData: FamilyMember[];
    selectedFamilyMember: FamilyMember | null;
    dateRange: { startDate: string; endDate: string };
  }

// Duplicate interfaces in actions.ts
// Action Interfaces (Optional: for clarity, but not required if you prefer inline types in the reducer)
export interface SetOriginalDataAction {
  type: 'SET_ORIGINAL_DATA';
  data?: FamilyMember[];
}

export interface SetFilteredDataAction {
  type: 'SET_FILTERED_DATA';
  data?: FamilyMember[];
}

export interface SetSelectedFamilyMemberAction {
  type: 'SET_SELECTED_FAMILY_MEMBER';
  payload: FamilyMember | null;
}

export interface SetDateRangeAction {
  type: 'SET_DATE_RANGE';
  range?: { startDate: string; endDate: string };
}

// Combine all action types for use in the reducer
export type FamilyTreeAction =
  | SetOriginalDataAction
  | SetFilteredDataAction
  | SetSelectedFamilyMemberAction
  | SetDateRangeAction;
