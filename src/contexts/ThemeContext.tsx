import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>('light');

  // Set the theme when it changes
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const link = document.getElementById('theme-link') as HTMLLinkElement;
    if (link) {
      link.href = `${document.baseURI}src/styles/${theme}.css?v=${Date.now()}`; // Add timestamp to force reload
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'stylesheet';
      newLink.id = 'theme-link';
      newLink.href = `${document.baseURI}src/styles/${theme}.css?v=${Date.now()}`;
      document.head.appendChild(newLink);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
