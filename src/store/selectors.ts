// selectors.ts
import { RootState } from './store';

export const selectSelectedFamilyMember = (state: RootState) => state.familyTree.selectedFamilyMember;
