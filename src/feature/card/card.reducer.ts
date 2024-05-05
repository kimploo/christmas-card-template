/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createCardAPI, getCardAPI } from './card.api';
import { toast } from 'react-toastify';
import { CardWithInfos } from './card.type';

type InitialState = CardWithInfos;

export const initialState: InitialState = {
  id: 0,
  uuid: null,
  to: 'To. ',
  msg: '',
  from: 'From. ',
  Artwork: {
    id: 1,
    url: 'https://mindpiece.kr//Together_72.png',
  },
  artworkId: 1,
  ArtworkBackground: {
    id: 1,
    bgInfo: {
      type: 'linear-gradient',
      cssValue: 'linear-gradient(180deg, #F3F19D 80%, #FCCB6B 20%)',
      colors: ['#F3F19D', '#FCCB6B'],
    },
  },
  artworkBackgroundId: 1,
  ArtworkSnowFlake: {
    id: 1,
    imgUrls: [
      'https://mindpiece.kr//snowflakes/white-snowflake-2x.png',
      'https://mindpiece.kr//snowflakes/orange-snowflake-2x.png',
      'https://mindpiece.kr//snowflakes/red-snowflake-2x.png',
      'https://mindpiece.kr//snowflakes/yellow-snowflake-2x.png',
    ],
  },
  artworkSnowFlakeId: 1,
  // @ts-ignore
  createdAt: new Date(0).toISOString(),
  // @ts-ignore
  updatedAt: new Date(1000).toISOString(),
  userId: 1,
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    updateCardState(state, action) {
      state.to = action.payload.to;
      state.msg = action.payload.msg;
      state.from = action.payload.from;
    },
    resetCardState(state) {
      state.to = initialState.to;
      state.msg = initialState.msg;
      state.from = initialState.from;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createCardAPI.fulfilled, (state, action: PayloadAction<{ uuid: string | null }>) => {
        state.uuid = action.payload.uuid;
      })
      .addCase(createCardAPI.rejected, (_, action) => {
        // TODO
        console.error(action.error);
        toast.error('createCardAPI Error');
      })
      .addCase(getCardAPI.fulfilled, (state, action: PayloadAction<CardWithInfos>) => {
        // TODO: 코드를 더 잘 쓸 발법이 없을까
        for (const key in action.payload) {
          // @ts-ignore
          state[key] = action.payload[key];
        }
      })
      .addCase(getCardAPI.rejected, (_, action) => {
        // TODO
        console.error(action.error);
        toast.error('getCardAPI Error');
      });
  },
});

export const { updateCardState, resetCardState } = cardSlice.actions;
export default cardSlice.reducer;
