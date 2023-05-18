import { useContext, useState } from 'react';
import { If, Then, Else } from 'react-if';
import { Button, Group, TextInput } from '@mantine/core';
import { AuthContext } from '../../Context/Auth';

const Login = () => {
  const { isLoggedIn, logout, login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogout = () => {
    logout();
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <If condition={isLoggedIn}>
        <Then>
          <Button color="red" onClick={handleLogout}>Log Out</Button>
        </Then>
        <Else>
          <Group>
            <TextInput
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextInput
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button color="gray.8" onClick={() => login(username, password)}>Log In</Button>
          </Group>
        </Else>
      </If>
    </>
  );
}

export default Login;
