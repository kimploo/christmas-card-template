import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const { VITE_SERVER_URI_PROD, VITE_SERVER_URI_DEV, DEV } = import.meta.env;
const host = DEV ? VITE_SERVER_URI_DEV : VITE_SERVER_URI_PROD;

// TODO: uuid로 백엔드에서 변경 후 수정
export type CardId = string | number | null;

export interface CardContentState {
  artworks: [
    'Together_72.png',
    'Congrats_72.png',
    'Christmas_72.png',
    'Happynewyear_72.png',
    'Chuseok_72.png',
  ];
  cardId: CardId;
  index: number;
  to: string;
  msg: string;
  from: string;
}

export interface CardCreateResponse {
  // TODO: uuid로 백엔드에서 변경 후 수정
  uuid: CardId;
}

export interface CardGetResponse {
  // TODO: uuid로 백엔드에서 변경 후 수정
  id: number;
  uuid: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  from: string;
  to: string;
  msg: string;
  artwork: string;
  userId: number | null;
}

export interface CardGetArg {
  // TODO: uuid로 백엔드에서 변경 후 수정
  cardId: string;
}

export const initialState: CardContentState = {
  artworks: [
    'Together_72.png',
    'Congrats_72.png',
    'Christmas_72.png',
    'Happynewyear_72.png',
    'Chuseok_72.png',
  ],
  cardId: null,
  index: 0,
  to: 'To. ',
  msg: '',
  from: 'From. ',
};

export const createCardContent = createAsyncThunk<CardCreateResponse, CardContentState>(
  'card/content/create',
  async (cardContent, _) => {
    // TODO: API call 분리
    const { artworks, index, to, msg, from } = cardContent;
    const url = new URL(host);
    url.pathname = 'card';
    const res = await axios
      .post(
        url.href,
        {
          artwork: artworks[index],
          index,
          to,
          msg,
          from,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        if (res.status === 201) {
          return res.data;
        } else {
          // TODO
        }
      });
    return res;
  },
);

export const getCardContent = createAsyncThunk<CardGetResponse, CardGetArg>(
  'card/content/get',
  async (cardContent, _) => {
    // TODO: API call 분리
    const url = new URL(host);
    url.pathname = `card/${cardContent.cardId}`;
    const res = await axios
      .get(url.href, {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      });
    return res;
  },
);

export const cardContentSlice = createSlice({
  name: 'cardContent',
  initialState,
  reducers: {
    updateCardContent(state, action) {
      state.artworks = initialState.artworks;
      state.index = action.payload.index;
      state.to = action.payload.to;
      state.msg = action.payload.msg;
      state.from = action.payload.from;
    },
    resetCardContent(state) {
      state.artworks = initialState.artworks;
      state.index = initialState.index;
      state.to = initialState.to;
      state.msg = initialState.msg;
      state.from = initialState.from;
    },
    updateIndex(state, action) {
      state.index = action.payload.index;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createCardContent.fulfilled, (state, action) => {
        state.cardId = action.payload.uuid;
      })
      .addCase(createCardContent.rejected, (_, action) => {
        console.error(action.error);
        toast.error('createCardContent Error');
      })
      .addCase(getCardContent.fulfilled, (state, action) => {
        state.cardId = action.payload.uuid;
        state.index = state.artworks.findIndex((aw) => aw === action.payload.artwork);
        state.to = action.payload.to;
        state.msg = action.payload.msg;
        state.from = action.payload.from;
      })
      .addCase(getCardContent.pending, () => {
        // TODO
      })
      .addCase(getCardContent.rejected, (_, action) => {
        console.error(action.error);
        toast.error('getCardContent Error');
        // TODO
      });
  },
});

export const { updateCardContent, resetCardContent, updateIndex } = cardContentSlice.actions;
export default cardContentSlice.reducer;
