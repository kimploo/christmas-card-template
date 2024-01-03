import { Anchor, Text } from '@mantine/core';

export const Footer = () => {
  const textColor = '#444444';

  return (
    <>
      <Text
        c={textColor}
        pt={'1rem'}
        pb={'3rem'}
        fz={'0.8rem'}
        style={{
          textAlign: 'center',
        }}
      >
        Copyright {new Date().getFullYear()}.{' '}
        <Anchor
          fz={'0.8rem'}
          underline={'always'}
          c={textColor}
          href="https://www.instagram.com/hyodee.r/"
        >
          Hyodee
        </Anchor>{' '}
        &{' '}
        <Anchor
          fz={'0.8rem'}
          underline={'always'}
          c={textColor}
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
