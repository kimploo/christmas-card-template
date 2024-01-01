import { createSlice } from '@reduxjs/toolkit';
import { GetArtworkResDTO } from './artwork.dto';
import { getArtworksApi } from './artwork.api';

interface InitialState {
  artworkId: number;
  artworkBackgroundId: number;
  artworkSnowFlakeId: number;
  artworkInfo: GetArtworkResDTO[];
}

const initialArtworkInfo = {
  ArtworkBackground: [
    {
      id: 1,
      bgColor: 'linear-gradient(180deg, #F3F19D 80%, #FCCB6B 20%)',
    },
  ],
  ArtworkSnowFlake: [
    {
      id: 1,
      imgUrls: [
        'https://card.teamhh.link/snowflakes/white-snowflake-2x.png',
        'https://card.teamhh.link/snowflakes/orange-snowflake-2x.png',
        'https://card.teamhh.link/snowflakes/red-snowflake-2x.png',
        'https://card.teamhh.link/snowflakes/yellow-snowflake-2x.png',
      ],
    },
  ],
};

const initialState: InitialState = {
  artworkId: 1,
  artworkBackgroundId: 1,
  artworkSnowFlakeId: 1,
  artworkInfo: [
    {
      id: 1,
      url: 'https://card.teamhh.link/Together_72.png',
      ...initialArtworkInfo,
    },
    {
      id: 2,
      url: 'https://card.teamhh.link/Snowman_72.png',
      ...initialArtworkInfo,
    },
    {
      id: 3,
      url: 'https://card.teamhh.link/Happynewyear_72.png',
      ...initialArtworkInfo,
    },
    {
      id: 4,
      url: 'https://card.teamhh.link/Christmas_72.png',
      ...initialArtworkInfo,
    },
    {
      id: 5,
      url: 'https://card.teamhh.link/Congrats_72.png',
      ...initialArtworkInfo,
    },
    {
      id: 6,
      url: 'https://card.teamhh.link/Chuseok_72.png',
      ...initialArtworkInfo,
    },
  ],
};

// ? 이 상태가 변경되어서 컴포넌트 리렌더링이 많아지면, artworkId를 모아놓은 상태와 artworkInfo 상태를 분리해야 한다.
export const artworkSlice = createSlice({
  name: 'artwork',
  initialState,
  reducers: {
    updateArtworkId(state, action) {
      state.artworkId = action.payload.artworkId;
    },
    updateArtworkBackgroundId(state, action) {
      state.artworkBackgroundId = action.payload.artworkBackgroundId;
    },
    updateArtworkSnowFlakeId(state, action) {
      state.artworkSnowFlakeId = action.payload.artworkSnowFlakeId;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getArtworksApi.fulfilled, (state, payload) => {
        const p = payload.payload;
        if ('data' in p) state.artworkInfo = p.data;
      })
      .addCase(getArtworksApi.pending, () => {
        // TODO
      })
      .addCase(getArtworksApi.rejected, () => {
        // TODO
      });
  },
});

// export const { updateCardState, resetCardState, updateIndex } = cardContentSlice.actions;
// export default cardContentSlice.reducer;
