import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { AuthContext } from '../../Context/Auth';
import { Badge, Card, CloseButton, Group, Pagination, Text } from '@mantine/core';
import { Else, If, Then } from 'react-if';
import Auth from '../Auth';

const List = ({ list, toggleComplete, deleteItem }) => {
  const { pageItems, showCompleted } = useContext(SettingsContext);
  const { isLoggedIn, can } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(list.length / pageItems);
  
  const displayItems = showCompleted
    ? list
    : list.filter((item) => !item.complete);

  const firstItem = (currentPage - 1) * pageItems;
  const lastItem = currentPage * pageItems;
  const displayList = displayItems.slice(firstItem, lastItem);

  return (
    <>
      {displayList.map((item, idx) => (
        <Card withBorder shadow="md" key={item._id} mb="sm">
          <Card.Section withBorder>
            <Group position="apart">
              <Group>
                <If condition={isLoggedIn && can('update')}>
                  <Then>
                    <Badge
                      onClick={() => toggleComplete(item._id)}
                      color={item.complete ? 'red' : 'green'}
                      variant="filled"
                      m="3px"
                    >
                      {item.complete ? 'Complete' : 'Pending'}
                    </Badge>
                  </Then>
                  <Else>
                    <Badge
                      color={item.complete ? 'red' : 'green'}
                      variant="filled"
                      m="3px"
                    >
                      {item.complete ? 'Complete' : 'Pending'}
                    </Badge>
                  </Else>
                </If>
                <Text data-testid={`item-assignee-${idx}`}>Assigned to: {item.assignee}</Text>
              </Group>
              <Auth capability="delete">
                <CloseButton
                  onClick={() => deleteItem(item._id)}
                  title="Close Todo Item"
                />
              </Auth>
            </Group>
          </Card.Section>
          <Text data-testid={`item-text-${idx}`} mt="sm">{item.text}</Text>
          <Text data-testid={`item-difficulty-${idx}`} align="right">Difficulty: {item.difficulty}</Text>
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
