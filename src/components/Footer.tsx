import { Anchor, Text } from '@mantine/core';

export const Footer = () => {
  return (
    <>
      <Text
        c={'#fbffb0'}
        pt={'1rem'}
        pb={'3rem'}
        style={{
          textAlign: 'center',
        }}
      >
        Copyright {new Date().getFullYear()}.{' '}
        <Anchor
          underline={'always'}
          style={{
            color: '#fbffb0',
          }}
          href="https://www.instagram.com/hyodee.r/"
        >
          Hyodee
        </Anchor>{' '}
        &{' '}
        <Anchor
          underline={'always'}
          style={{
            color: '#fbffb0',
          }}
          href="https://www.github.com/kimploo/"
        >
          Homesick
        </Anchor>{' '}
        <br></br>
        All rights reserved.
      </Text>
    </>
  );
};
