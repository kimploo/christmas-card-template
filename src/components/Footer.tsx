import { Anchor, Text } from '@mantine/core';

export const Footer = () => {
  return (
    <>
      <Text color={'#CED4DA'} pb={'1rem'}>
        Copyright {new Date().getFullYear()}.{' '}
        <Anchor underline={true} href="https://www.instagram.com/hyodee.r/">
          Hyodee
        </Anchor>{' '}
        & Homesick. All rights reserved
      </Text>
    </>
  );
};
