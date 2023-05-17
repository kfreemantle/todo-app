import React, { useState, useEffect } from "react";

export const SettingsContext = React.createContext();

const SettingProvider = ({ children }) => {
  const [displayCount, setDisplayCount] = useState(3);
  const [showComplete, setShowComplete] = useState(true);
  const [sort, setSort] = useState('difficulty');

  const saveLocally = () => {
    localStorage.setItem('todo', JSON.stringify({ displayCount, showComplete, sort }));
  };

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('todo'));
    if (storage) {
      setShowComplete(storage.showComplete);
      setDisplayCount(storage.displayCount);
      setSort(storage.sort);
    }
  }, []);

  const contextValue = {
    showComplete,
    setShowComplete,
    displayCount,
    setDisplayCount,
    sort,
    setSort,
    saveLocally,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingProvider;
