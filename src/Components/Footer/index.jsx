import { Text, Paper } from "@mantine/core";

const Footer = () => {
  return (
    <Paper padding="md" shadow="xs" style={{width:"80%", margin:"auto"}}>
      <Text align="right" mt="lg">
        &copy; {new Date().getFullYear()} Kyle Freemantle
      </Text>
    </Paper>
  );
}

export default Footer;
