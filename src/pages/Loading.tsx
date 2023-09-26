import { Container, Flex, Loader } from '@mantine/core';

export const Loading = () => {
  return (
    <>
      <Flex bg={`#FCCB6B`} h={'100vh'} justify={'center'} align={'center'} pt={'2rem'} pb={'1rem'}>
        <Container
          px={'2rem'}
          sx={(theme) => ({
            maxWidth: theme.breakpoints.sm,
          })}
        >
          <Loader color="#F3F19D" size="xl" />
        </Container>
      </Flex>
    </>
  );
};
