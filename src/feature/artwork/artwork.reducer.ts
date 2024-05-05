import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetArtworkResDTO } from './artwork.dto';
import { getArtworksApi } from './artwork.api';

export interface ArtworkInitialState {
  artworkInfo: GetArtworkResDTO[];
}

const initialArtworkInfo = {
  ArtworkBackground: [
    {
      id: 1,
      bgInfo: {
        type: 'linear-gradient',
        cssValue: 'linear-gradient(180deg, #F3F19D 80%, #FCCB6B 20%)',
        colors: ['#F3F19D', '#FCCB6B'],
      },
    },
  ],
  ArtworkSnowFlake: [
    {
      id: 1,
      imgUrls: [
        'https://mindpiece.kr//snowflakes/white-snowflake-2x.png',
        'https://mindpiece.kr//snowflakes/orange-snowflake-2x.png',
        'https://mindpiece.kr//snowflakes/red-snowflake-2x.png',
        'https://mindpiece.kr//snowflakes/yellow-snowflake-2x.png',
      ],
    },
  ],
};

const initialState: ArtworkInitialState = {
  artworkInfo: [
    {
      id: 1,
      url: 'https://mindpiece.kr//Together_72.png',
      ...initialArtworkInfo,
    },
    {
      id: 2,
      url: 'https://mindpiece.kr//Snowman_72.png',
      ...initialArtworkInfo,
    },
    {
      id: 3,
      url: 'https://mindpiece.kr//LuckyPocket_72.png',
      ...initialArtworkInfo,
    },
    {
      id: 4,
      url: 'https://mindpiece.kr//Christmas_72.png',
      ...initialArtworkInfo,
    },
    {
      id: 5,
      url: 'https://mindpiece.kr//Congrats_72.png',
      ...initialArtworkInfo,
    },
    {
      id: 6,
      url: 'https://mindpiece.kr//Chuseok_72.png',
      ...initialArtworkInfo,
    },
  ],
};

// ? 이 상태가 변경되어서 컴포넌트 리렌더링이 많아지면, artworkId를 모아놓은 상태와 artworkInfo 상태를 분리해야 한다.
export const artworkSlice = createSlice({
  name: 'artwork',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getArtworksApi.fulfilled, (state, action: PayloadAction<GetArtworkResDTO[]>) => {
        state.artworkInfo = action.payload;
      })
      .addCase(getArtworksApi.pending, () => {
        // TODO
      })
      .addCase(getArtworksApi.rejected, () => {
        // TODO
      });
  },
});

export default artworkSlice.reducer;
