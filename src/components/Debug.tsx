import { Button, Flex } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'src/store';
import { authServiceLogin, authServiceLogout } from '../redux-state/loginSlice';

const { DEV } = import.meta.env;

export const Debug = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const moveTo: React.MouseEventHandler<HTMLButtonElement> | undefined = (event) => {
    const path = event.currentTarget.textContent;
    navigate(path ?? '/');
  };

  const handleLogin = () => {
    const controller = new AbortController();
    try {
      dispatch(authServiceLogin(controller));
    } catch (e) {
      console.error(e);
    }
    return () => controller.abort();
  };

  const handleServiceLogout = () => {
    dispatch(authServiceLogout());
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
          <Button onClick={moveTo}>loading</Button>
          <Button onClick={handleLogin}>login</Button>
          <Button onClick={handleServiceLogout}>logout</Button>
          <button onClick={() => methodDoesNotExist()}>Break the world</button>
        </Flex>
      </>
    );
  }

  return <></>;
};
