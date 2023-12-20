import { Box } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

export const MainArtwork = () => {
  const { artworks, index } = useSelector((state: RootState) => state.cardContent);

  return (
    <>
      {/* 768 - 16 - 16 */}
      <Box
        px={'2rem'}
        style={(theme) => ({
          maxWidth: theme.breakpoints.sm,
        })}
      >
        {artworks ? (
          <img
            src={'/' + artworks[index]}
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
