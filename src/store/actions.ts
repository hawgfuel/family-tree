// actions.ts
import { FamilyMember } from '../common/types';

// Action Types
export const SET_ORIGINAL_DATA = 'SET_ORIGINAL_DATA';
export const SET_FILTERED_DATA = 'SET_FILTERED_DATA';
export const SET_SELECTED_FAMILY_MEMBER = 'SET_SELECTED_FAMILY_MEMBER';
export const SET_DATE_RANGE = 'SET_DATE_RANGE';

// Action Creators
export const setOriginalData = (data: FamilyMember[]) => ({
  type: SET_ORIGINAL_DATA,
  data,
});

export const setFilteredData = (data: FamilyMember[]) => ({
  type: SET_FILTERED_DATA,
  data,
});

export const setSelectedFamilyMember = (payload: FamilyMember | null) => ({
  type: SET_SELECTED_FAMILY_MEMBER,
  payload,
});

export const setDateRange = (range: { startDate: string; endDate: string }) => ({
  type: SET_DATE_RANGE,
  range,
});

