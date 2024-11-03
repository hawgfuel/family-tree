import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainContent } from './pages/main';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainContent />
    </QueryClientProvider>
  );
}

export default App;
