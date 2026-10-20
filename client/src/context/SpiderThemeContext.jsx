import { createContext, useContext, useState, useEffect } from 'react';

const SpiderThemeContext = createContext();

export function SpiderThemeProvider({ children }) {
  const [isSpiderMode, setIsSpiderMode] = useState(() => {
    const saved = localStorage.getItem('sivzz_spider_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('sivzz_spider_mode', JSON.stringify(isSpiderMode));
    if (isSpiderMode) {
      document.body.classList.add('spider-mode-active');
      document.body.classList.remove('normal-mode-active');
    } else {
      document.body.classList.remove('spider-mode-active');
      document.body.classList.add('normal-mode-active');
    }
  }, [isSpiderMode]);

  const toggleSpiderMode = () => {
    setIsSpiderMode((prev) => !prev);
  };

  return (
    <SpiderThemeContext.Provider value={{ isSpiderMode, toggleSpiderMode, setIsSpiderMode }}>
      {children}
    </SpiderThemeContext.Provider>
  );
}

export function useSpiderTheme() {
  const context = useContext(SpiderThemeContext);
  if (!context) {
    throw new Error('useSpiderTheme must be used within a SpiderThemeProvider');
  }
  return context;
}
