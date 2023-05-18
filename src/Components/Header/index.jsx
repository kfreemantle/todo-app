import { createStyles, Flex, Group, Header, Navbar, Col, Paper } from "@mantine/core";
import { Link } from "react-router-dom";
import Login from '../../Components/Login';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.blue[7],
    height: theme.spacing.xl,
    width: '100%',
    margin: 'auto',
    padding: theme.spacing.md,
  },
  link: {
    textDecoration: 'none',
    color: theme.colors.gray[0],
    fontSize: theme.fontSizes.md,
  },
}));

const HeaderComponent = () => {
  const { classes } = useStyles();

  return (
    <Paper shadow="xs">
      <Header>
        <Navbar className={classes.navbar}>
          <Flex justify="space-between">
            <Group>
              <Col>
                <Link to='/' className={classes.link}>Home</Link>
              </Col>
              <Col>
                <Link to='/settings' className={classes.link}>Settings</Link>
              </Col>
            </Group>
            <Login /> {/* Added Login component to the Header */}
          </Flex>
        </Navbar>
      </Header>
    </Paper>
  );
};

export default HeaderComponent;
