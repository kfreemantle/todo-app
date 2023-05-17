// Import necessary modules from their respective packages
import { useContext } from 'react';
import { Grid, Card, Text, Button, NumberInput, Checkbox, Select, createStyles } from '@mantine/core';
import { SettingsContext } from '../../Context/Settings';

// Define the custom styles for this component
const useStyles = createStyles((theme) => ({
  h1: {
    backgroundColor: theme.colors.gray[8],
    color: theme.colors.gray[0],
    width: '80%',
    margin: 'auto',
    fontSize: theme.fontSizes.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md
  }
}));

const SettingsForm = () => {
  // Destructure the needed values and functions from the context
  const { showCompleted, setShowCompleted, itemsPerPage, setItemsPerPage, sortField, setSortField, saveSettings } = useContext(SettingsContext);

  // Define the function for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    saveSettings();
  };

  // Define the custom classes for this component
  const { classes } = useStyles();

  return (
    <Grid style={{ width: '80%', margin: 'auto' }}>
      <Grid.Col xs={12} sm={6}>
        <form onSubmit={handleSubmit}>
          <Card withBorder>
            <Text className={classes.h1}>Manage Settings</Text>

            {/* Checkbox for controlling the visibility of completed items */}
            <Checkbox
              checked={showCompleted}
              label="Show Completed"
              onChange={() => setShowCompleted(!showCompleted)}
            />

            {/* NumberInput for controlling the number of items per page */}
            <NumberInput
              label="Items per page"
              value={itemsPerPage}
              onChange={value => setItemsPerPage(value)}
              min={1}
              max={10}
              step={1}
            />

            {/* Select for controlling the field to sort the items by */}
            <Select
              label="Sort field"
              value={sortField}
              onChange={value => setSortField(value)}
              data={['text', 'assignee', 'difficulty']}
            />

            {/* Button to submit the form and save the settings */}
            <Button submit>Save</Button>
          </Card>
        </form>
      </Grid.Col>

      {/* Display the current settings */}
      <Grid.Col xs={12} sm={6}>
        <Card withBorder>
          <Text>Show Completed: {showCompleted ? 'Yes' : 'No'}</Text>
          <Text>Items per page: {itemsPerPage}</Text>
          <Text>Sort field: {sortField}</Text>
        </Card>
      </Grid.Col>
    </Grid>
  );
};

export default SettingsForm;
