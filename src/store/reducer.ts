// reducer.ts
import { createReducer } from '@reduxjs/toolkit';
import { FamilyTreeState, SetOriginalDataAction, SetFilteredDataAction, SetSelectedFamilyMemberAction, SetDateRangeAction } from '../common/types';

const initialState: FamilyTreeState = {
  selectedFamilyMember: null,
  originalData: [],
  filteredData: [],
  dateRange: { startDate: '', endDate: '' },
};

const familyTreeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('SET_ORIGINAL_DATA', (state, action: SetOriginalDataAction) => {
      state.originalData = action.data || [];
      state.filteredData = action.data || [];
    })
    .addCase('SET_FILTERED_DATA', (state, action: SetFilteredDataAction) => {
      state.filteredData = action.data || [];
    })
    .addCase('SET_SELECTED_FAMILY_MEMBER', (state, action: SetSelectedFamilyMemberAction) => {
      state.selectedFamilyMember = action.payload || null;
    })
    .addCase('SET_DATE_RANGE', (state, action: SetDateRangeAction) => {
      state.dateRange = action.range || { startDate: '', endDate: '' };
    });
});

export default familyTreeReducer;
