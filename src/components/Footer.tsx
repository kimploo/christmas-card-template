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
        Copyright © {new Date().getFullYear()}.
        <Anchor
          pl={'2px'}
          fz={'0.775rem'}
          underline={'always'}
          c={textColor}
          href="https://www.instagram.com/mindpiece.kr"
        >
          마음한장
        </Anchor>{' '}
        <br></br>
        All rights reserved.
      </Text>
    </>
  );
};
