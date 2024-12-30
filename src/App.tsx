// src/App.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainContent } from './pages/content';
import { useTheme } from './contexts/ThemeContext';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // Ensure this is inside ThemeProvider

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <button className='clear-all' onClick={toggleTheme}>Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode</button>
        <MainContent />
      </div>
    </QueryClientProvider>
  );
};

export default App;
