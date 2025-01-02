// src/App.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { fetchFamilyTreeData } from './client/fetchFamilyTreeData';
import { setOriginalData, setFilteredData } from './store/actions';
import { MainContent } from './pages/content';
import { useTheme } from './contexts/ThemeContext';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // Ensure ThemeProvider is wrapping this
  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery({
    queryKey: ['familyTree'],
    queryFn: fetchFamilyTreeData,
  });

  useEffect(() => {
    if (data) {
      // Dispatch to Redux store
      dispatch(setOriginalData(data));
      dispatch(setFilteredData(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
        <div>
          <button className="clear-all" onClick={toggleTheme}>
            Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
          <MainContent />
        </div>
  );
};

export default App;
