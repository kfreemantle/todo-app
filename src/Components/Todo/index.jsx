import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import useForm from '../../hooks/form';
import { Button, Slider, Text, TextInput, Grid, Card, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  h1: {
    backgroundColor: theme.colors.gray[8],
    color: theme.colors.gray[0],
    width: '80%',
    margin: 'auto',
    fontSize: theme.fontSizes.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md
  }
}));

const Todo = () => {
  const { classes } = useStyles();
  const [defaultValues] = useState({ difficulty: 4 });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item._id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <>
      <Text className={classes.h1}>To Do List: {incomplete} items pending</Text>

      <Grid style={{ width: '80%', margin: 'auto' }}>
        <Grid.Col span={12}>
          <Card withBorder>
            <form onSubmit={handleSubmit}>
              <Text>Add To Do Item</Text>

              <TextInput 
                placeholder="Item Details"
                label="To Do Item"
                onChange={handleChange} 
                name="text" 
              />

              <TextInput 
                placeholder="Assignee Name"
                label="Assigned To"
                onChange={handleChange} 
                name="assignee" 
              />

              <Text>Difficulty</Text>
              <Slider
                onChange={handleChange} 
                defaultValue={defaultValues.difficulty} 
                min={1} 
                max={5}
                step={1} 
                name="difficulty"
              />

              <Button type="submit" mt="md">Add Item</Button>
            </form>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Todo;
