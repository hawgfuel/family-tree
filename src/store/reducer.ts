import { FamilyMember, FamilyTreeState } from '../common/types';

const initialState = {
    originalData: [],
    filteredData: [],
    dateRange: { startDate: '', endDate: '' },
  };
  
  const familyTreeReducer = (
    state: FamilyTreeState = initialState,
    action: { type: string; data?: FamilyMember[]; range?: { startDate: string; endDate: string } }
  ): FamilyTreeState => {
    switch (action.type) {
      case 'SET_ORIGINAL_DATA':
        return {
          ...state,
          originalData: action.data || [],
          filteredData: action.data || [],
        };
      case 'SET_FILTERED_DATA':
        return {
          ...state,
          filteredData: action.data || [],
        };
      case 'SET_DATE_RANGE':
        return {
          ...state,
          dateRange: action.range || { startDate: '', endDate: '' },
        };
      default:
        return state;
    }
  };
  
  export default familyTreeReducer;
  