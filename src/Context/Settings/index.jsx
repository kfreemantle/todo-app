import React, { useState, useEffect } from "react";

export const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {
  const [pageItems, setDisplayCount] = useState(3);
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortField, setSortField] = useState('difficulty');

  const saveLocalStorage = () => {
    localStorage.setItem('pageItems', JSON.stringify(pageItems));
    localStorage.setItem('showCompleted', JSON.stringify(showCompleted));
    localStorage.setItem('sortField', JSON.stringify(sortField));
  };

  useEffect(() => {
    const localPageItems = localStorage.getItem('pageItems');
    const localShowCompleted = localStorage.getItem('showCompleted');
    const localSortField = localStorage.getItem('sortField');

    if (localPageItems) {
      setDisplayCount(JSON.parse(localPageItems));
    }
    if (localShowCompleted) {
      setShowCompleted(JSON.parse(localShowCompleted));
    }
    if (localSortField) {
      setSortField(JSON.parse(localSortField));
    }
  }, []);

  const contextValue = {
    pageItems,
    setDisplayCount,
    showCompleted,
    setShowCompleted,
    sortField,
    setSortField,
    saveLocalStorage,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
