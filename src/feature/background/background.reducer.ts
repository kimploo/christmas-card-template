import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BackgroundState, BgInfoType, ArtworkBackground } from './background.type';
import { Artwork, ArtworkSnowFlake } from '@prisma/client';

const initialState: BackgroundState = {
  Artwork: {
    id: 1,
    url: 'https://mindpiece.kr//Together_72.png',
  },
  ArtworkBackground: {
    id: 1,
    bgInfo: {
      type: BgInfoType.LINEAR_GRADIENT,
      cssValue: 'linear-gradient(180deg, #C5F0FF 80%, #CBEA88 20%)',
      colors: ['#C5F0FF', '#CBEA88'],
    },
  },
  ArtworkSnowFlake: {
    id: 1,
    imgUrls: [
      'https://mindpiece.kr//snowflakes/white-snowflake-2x.png',
      'https://mindpiece.kr//snowflakes/orange-snowflake-2x.png',
      'https://mindpiece.kr//snowflakes/red-snowflake-2x.png',
      'https://mindpiece.kr//snowflakes/yellow-snowflake-2x.png',
    ],
  },
};

/**
 * 전역 상태 backgroundSlice
 * 배경 화면을 조정하는 상태. 로직과 분리되어 로직 변화에 따라 배경이 변할 수도 있고 변하지 않을 수 있음. 이걸 선택이 가능하기 때문에 비교적 커플링이 덜하다.
 */
const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    updateArtwork(state, action: PayloadAction<{ Artwork: Artwork }>) {
      state.Artwork = action.payload.Artwork;
    },
    updateArtworkBackground(
      state,
      action: PayloadAction<{ ArtworkBackground: ArtworkBackground }>,
    ) {
      state.ArtworkBackground = action.payload.ArtworkBackground;
    },
    updateArtworkSnowFlake(state, action: PayloadAction<{ ArtworkSnowFlake: ArtworkSnowFlake }>) {
      state.ArtworkSnowFlake = action.payload.ArtworkSnowFlake;
    },
  },
});

export const { updateArtwork, updateArtworkBackground, updateArtworkSnowFlake } =
  backgroundSlice.actions;
export default backgroundSlice.reducer;
