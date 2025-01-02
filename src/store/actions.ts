import { FamilyMember } from '../common/types';

export const SET_ORIGINAL_DATA = 'SET_ORIGINAL_DATA';
export const SET_FILTERED_DATA = 'SET_FILTERED_DATA';
export const SET_DATE_RANGE = 'SET_DATE_RANGE';

export const setOriginalData = (data: FamilyMember[]) => ({
  type: SET_ORIGINAL_DATA as typeof SET_ORIGINAL_DATA,
  data,
});

export const setFilteredData = (data: FamilyMember[]) => ({
  type: SET_FILTERED_DATA as typeof SET_FILTERED_DATA,
  data,
});

export const setDateRange = (range: { startDate: string; endDate: string }) => ({
  type: SET_DATE_RANGE as typeof SET_DATE_RANGE,
  range,
});

// Infer Action Types
export type FamilyTreeAction =
  | ReturnType<typeof setOriginalData>
  | ReturnType<typeof setFilteredData>
  | ReturnType<typeof setDateRange>;
