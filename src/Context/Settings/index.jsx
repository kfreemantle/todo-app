import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export const SettingsContext = React.createContext();

export const SettingsProvider = (props) => {
  // Define the settings you want to use throughout your app
  const [showCompleted, setShowCompleted] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  
  // Define the list and related functions here
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState(0);

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
  }, [list]);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
      }
      return item;
    });
    setList(items);
  }

  return (
    <SettingsContext.Provider value={{ showCompleted, setShowCompleted, itemsPerPage, setItemsPerPage, list, setList, addItem, deleteItem, toggleComplete, incomplete }}>
      {props.children}
    </SettingsContext.Provider>
  );
};
