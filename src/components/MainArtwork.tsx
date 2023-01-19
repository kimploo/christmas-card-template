import { Box, Image } from '@mantine/core';

interface Props {
  src: string;
}

export const MainArtwork = ({ src }: Props) => {
  return (
    <>
      {/* 768 - 16 - 16 */}
      <Box
        px={'2rem'}
        sx={(theme) => ({
          maxWidth: theme.breakpoints.sm,
        })}
      >
        <Image src={src}></Image>
      </Box>
    </>
  );
};
