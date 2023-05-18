import { createStyles, Group, Header, Navbar } from "@mantine/core";
import { Link } from "react-router-dom";
import Login from '../../Components/Login';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.blue[7],
    height: '100%',
    width: '100%',
    margin: 'auto',
    padding: theme.spacing.md,
  },
  link: {
    width: '80px',
    textDecoration: 'none',
    color: theme.colors.gray[0],
    fontSize: theme.fontSizes.md,
  },
}));

const HeaderComponent = () => {
  const { classes } = useStyles();

  return (
    <Header>
      <Navbar className={classes.navbar}>
        <Group position="apart">
          <Group>
            <Link to='/' className={classes.link}>Home</Link>
            <Link to='/settings' className={classes.link}>Settings</Link>
          </Group>
          <Login />
        </Group>
      </Navbar>
    </Header>
  )
};

export default HeaderComponent;
