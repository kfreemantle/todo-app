import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Button, Pagination } from '@mantine/core';

const List = () => {
  const { list, toggleComplete, itemsPerPage } = useContext(SettingsContext);

  // Keep track of the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Handle page changes
  const handlePageChange = (page) => setCurrentPage(page);

  // Calculate the total number of pages
  const totalPages = Math.ceil(list.length / itemsPerPage);

  // Get the items for the current page
  const currentItems = list.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <header data-testid="todo-header">
        <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      </header>

      {currentItems.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <Button onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</Button>
          <hr />
        </div>
      ))}

      <Pagination
        page={currentPage}
        total={totalPages}
        onPageChange={handlePageChange}
        size="md"
        siblings={1}
        boundaryCount={1}
      />
    </>
  );
}

export default List;
