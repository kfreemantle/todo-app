// Importing required hooks and components from React, Settings context, and Mantine
import { useContext, useState, useEffect } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Pagination, Card, Text, Group, Badge, CloseButton } from '@mantine/core';

// Defining the List component
const List = ({ toggleComplete, deleteItem }) => {  // Adding toggleComplete and deleteItem as props
  // Accessing required variables and functions from SettingsContext
  const { list, itemsPerPage, showCompleted } = useContext(SettingsContext);
  
  // useState hook for managing the current page
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect for handling page changes when the list changes
  useEffect(() => {
    const totalPages = Math.ceil(list.length / itemsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [list, itemsPerPage, currentPage]);

  // Creating a filtered list based on the showCompleted value
  const filteredList = showCompleted ? list : list.filter(item => !item.complete);
  
  // Finding the first and last items to display based on the current page
  const firstItem = (currentPage - 1) * itemsPerPage;
  const lastItem = currentPage * itemsPerPage;
  
  // Selecting the items to display from the filtered list
  const displayItems = filteredList.slice(firstItem, lastItem);

  // Calculating the total number of pages
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  // Returning the List component
  return (
    <>
      {displayItems.map(item => (
        <Card withBorder shadow="md" key={item.id} mb="sm">
          <Card.Section withBorder>
            <Group position="apart">
              <Group>
                <Badge
                  onClick={() => toggleComplete(item.id)}
                  color={item.complete ? 'red' : 'green'}
                  variant="filled"
                  m="3px"
                >
                  {item.complete ? 'Complete' : 'Pending'}
                </Badge>
                <Text>{item.assignee}</Text>
              </Group>
              <CloseButton
                onClick={() => deleteItem(item.id)}
                title="Close Todo Item"
              />
            </Group>
          </Card.Section>
          <Text mt="sm">{item.text}</Text>
          <Text align="right">Difficulty: {item.difficulty}</Text>
        </Card>
      ))}

      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={(value) => setCurrentPage(value)}
      />
    </>
  );
}

export default List;
