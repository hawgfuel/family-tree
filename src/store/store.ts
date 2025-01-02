import { configureStore } from '@reduxjs/toolkit';
import familyTreeReducer from './reducer';

const store = configureStore({
  reducer: {
    familyTree: familyTreeReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
