import React, { useEffect, useState, useContext } from 'react';
import { SettingsContext } from '../../Context/Settings';
import useForm from '../../hooks/form';
import { Button, Input, Paper, Slider, Text, Grid } from '@mantine/core';

const Todo = () => {
  const { addItem, list } = useContext(SettingsContext);
  const [defaultValues] = useState({
    difficulty: 4,
  });

  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list, incomplete]);  

  return (
    <Grid.Container spacing="md">
      <Grid.Row>
        <Grid.Col span={12}>
          <Text variant="h1" align="center">To Do List: {incomplete} items pending</Text>
        </Grid.Col>
      </Grid.Row>

      <Grid.Row>
        <Grid.Col span={12}>
          <Paper padding="md" shadow="xs">
            <form onSubmit={handleSubmit}>
              <Text variant="h2">Add To Do Item</Text>

              <Input 
                label="To Do Item"
                onChange={handleChange} 
                name="text" 
                placeholder="Item Details" 
              />

              <Input 
                label="Assigned To"
                onChange={handleChange} 
                name="assignee" 
                placeholder="Assignee Name" 
              />

              <Slider
                label="Difficulty"
                onChange={handleChange} 
                defaultValue={defaultValues.difficulty} 
                min={1} max={5} 
                name="difficulty"
              />

              <Button type="submit" mt="md">Add Item</Button>
            </form>
          </Paper>
        </Grid.Col>
      </Grid.Row>
    </Grid.Container>
  );
};

export default Todo;
