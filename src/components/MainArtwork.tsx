import { Box } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

export const MainArtwork = () => {
  const { Artwork } = useSelector((state: RootState) => state.background);
  const artworkUrl = Artwork.url;

  return (
    <>
      <Box
        px={'2rem'}
        style={(theme) => ({
          maxWidth: theme.breakpoints.sm,
        })}
      >
        <img
          src={artworkUrl}
          style={{
            width: '100%',
            objectFit: 'cover',
          }}
          alt="card image"
        />
      </Box>
    </>
  );
};
