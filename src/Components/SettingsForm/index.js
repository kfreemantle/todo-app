import { useContext, useState } from 'react';
import { Grid, Card, Text, Button, NumberInput, Switch, TextInput, createStyles } from '@mantine/core';
import { SettingsContext } from '../../Context/Settings';
import { When } from 'react-if';
import { IconSettings } from '@tabler/icons-react';

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
  const { showCompleted, setShowCompleted, itemsPerPage, setItemsPerPage, sortField, setSortField, saveSettings } = useContext(SettingsContext);
  const [show, setShow] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShow(true);
    saveSettings();
  };

  const { classes } = useStyles();

  return (
    <>
      <Text className={classes.h1}><IconSettings /> Manage Settings</Text>
      <Grid style={{ width: '80%', margin: 'auto' }}>
        <Grid.Col xs={12} sm={6}>
          <form onSubmit={handleSubmit}>
            <Card withBorder>
              <Text>Manage Settings</Text>

              <Switch
                checked={showCompleted}
                label="Show Completed"
                onChange={() => setShowCompleted(!showCompleted)}
              />

              <NumberInput
                label="Items per page"
                value={itemsPerPage}
                onChange={value => setItemsPerPage(value)}
                min={1}
                max={10}
                step={1}
              />

              <TextInput
                label="Sort field"
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
              />

              <Button submit>Save</Button>
            </Card>
          </form>
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <When condition={show}>
            <Card withBorder>
              <Text>Show Completed: {showCompleted ? 'Yes' : 'No'}</Text>
              <Text>Items per page: {itemsPerPage}</Text>
              <Text>Sort field: {sortField}</Text>
            </Card>
          </When>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default SettingsForm;
