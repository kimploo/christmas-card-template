import { Box } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

export const MainArtwork = () => {
  const { currentArtworkIndex, artworkInfo } = useSelector((state: RootState) => state.artwork);

  return (
    <>
      {/* 768 - 16 - 16 */}
      <Box
        px={'2rem'}
        style={(theme) => ({
          maxWidth: theme.breakpoints.sm,
        })}
      >
        {artworkInfo[currentArtworkIndex] ? (
          <img
            src={artworkInfo[currentArtworkIndex]?.url}
            style={{
              width: '100%',
              objectFit: 'cover',
            }}
            alt="card image"
          />
        ) : null}
      </Box>
    </>
  );
};
