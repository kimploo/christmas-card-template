import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetArtworkResDTO } from './artwork.dto';
import { getArtworksApi } from './artwork.api';

export interface ArtworkInitialState {
  currentArtworkIndex: number;
  currentArtworkBackgroundIndex: number;
  currentArtworkSnowFlakeIndex: number;
  artworkId: number;
  artworkBackgroundId: number;
  artworkSnowFlakeId: number;
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
        'https://card.teamhh.link/snowflakes/white-snowflake-2x.png',
        'https://card.teamhh.link/snowflakes/orange-snowflake-2x.png',
        'https://card.teamhh.link/snowflakes/red-snowflake-2x.png',
        'https://card.teamhh.link/snowflakes/yellow-snowflake-2x.png',
      ],
    },
  ],
};

const initialState: ArtworkInitialState = {
  currentArtworkIndex: 0,
  currentArtworkBackgroundIndex: 0,
  currentArtworkSnowFlakeIndex: 0,
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
    updateArtworkId(state, action: PayloadAction<{ artworkId: number }>) {
      state.artworkId = action.payload.artworkId;
    },
    updateArtworkBackgroundId(state, action: PayloadAction<{ artworkBackgroundId: number }>) {
      state.artworkBackgroundId = action.payload.artworkBackgroundId;
    },
    updateArtworkSnowFlakeId(state, action: PayloadAction<{ artworkSnowFlakeId: number }>) {
      state.artworkSnowFlakeId = action.payload.artworkSnowFlakeId;
    },
    updateCurrentArtworkIndex(state, action: PayloadAction<{ currentArtworkIndex: number }>) {
      state.currentArtworkIndex = action.payload.currentArtworkIndex;
    },
    updateCurrentArtworkBackgroundIndex(
      state,
      action: PayloadAction<{ currentArtworkBackgroundIndex: number }>,
    ) {
      state.currentArtworkBackgroundIndex = action.payload.currentArtworkBackgroundIndex;
    },
    updateCurrentArtworkSnowFlakeIndex(
      state,
      action: PayloadAction<{ currentArtworkSnowFlakeIndex: number }>,
    ) {
      state.currentArtworkSnowFlakeIndex = action.payload.currentArtworkSnowFlakeIndex;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getArtworksApi.fulfilled, (state, action: PayloadAction<GetArtworkResDTO[]>) => {
        state.artworkInfo = action.payload;
        state.artworkBackgroundId = action.payload[0].ArtworkBackground[0].id;
        state.artworkSnowFlakeId = action.payload[0].ArtworkSnowFlake[0].id;
        state.currentArtworkIndex = initialState.currentArtworkIndex;
        state.currentArtworkBackgroundIndex = initialState.currentArtworkBackgroundIndex;
        state.currentArtworkSnowFlakeIndex = initialState.currentArtworkSnowFlakeIndex;
      })
      .addCase(getArtworksApi.pending, () => {
        // TODO
      })
      .addCase(getArtworksApi.rejected, () => {
        // TODO
      });
  },
});

export const {
  updateArtworkId,
  updateArtworkBackgroundId,
  updateArtworkSnowFlakeId,
  updateCurrentArtworkIndex,
  updateCurrentArtworkBackgroundIndex,
  updateCurrentArtworkSnowFlakeIndex,
} = artworkSlice.actions;
export default artworkSlice.reducer;
