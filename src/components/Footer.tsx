import { Anchor, Text } from '@mantine/core';

export const Footer = () => {
  return (
    <>
      <Text color={'#fbffb0'} pt={'1rem'} pb={'3rem'}>
        Copyright {new Date().getFullYear()}.{' '}
        <Anchor underline={true} href="https://www.instagram.com/hyodee.r/">
          Hyodee
        </Anchor>{' '}
        &
        <Anchor underline={true} href="https://www.github.com/kimploo/">
          Homesick
        </Anchor>{' '}
        . All rights reserved
      </Text>
    </>
  );
};
