import { createSlice } from '@reduxjs/toolkit';

const familySlice = createSlice({
  name: 'family',
  initialState: {
    familyMembers: [],
    selectedMember: null,
  },
  reducers: {
    setFamilyMembers: (state, action) => {
      state.familyMembers = action.payload;
    },
    selectFamilyMember: (state, action) => {
      state.selectedMember = action.payload;
    },
  },
});

export const { setFamilyMembers, selectFamilyMember } = familySlice.actions;
export default familySlice.reducer;
