import { Button, Flex } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const { DEV, PROD } = import.meta.env;

export const Debug = () => {
  const navigate = useNavigate();
  const moveTo: React.MouseEventHandler<HTMLButtonElement> | undefined = (event) => {
    const path = event.currentTarget.textContent;
    navigate(path || '/');
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
        </Flex>
      </>
    );
  }

  return <></>;
};
