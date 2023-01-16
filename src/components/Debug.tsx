import { Button, Flex } from '@mantine/core';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from 'src/App';

const { DEV, PROD } = import.meta.env;

export const Debug = () => {
  const navigate = useNavigate();
  const { logout } = useContext(LoginContext);

  const moveTo: React.MouseEventHandler<HTMLButtonElement> | undefined = (event) => {
    const path = event.currentTarget.textContent;
    navigate(path ?? '/');
  };

  if (DEV) {
    return (
      <>
        <Flex direction={'row'} justify={'center'} gap={10}>
          <Button onClick={moveTo}>/</Button>
          <Button onClick={moveTo}>preview</Button>
          <Button onClick={moveTo}>card</Button>
          <Button onClick={moveTo}>my-cards</Button>
          <Button onClick={moveTo}>edit</Button>
          <Button onClick={logout ?? (() => console.log('no logout'))}>logout</Button>
        </Flex>
      </>
    );
  }

  return <></>;
};
