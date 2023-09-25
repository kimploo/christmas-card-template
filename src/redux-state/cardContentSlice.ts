import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const { VITE_SERVER_URI_PROD, VITE_SERVER_URI_DEV, DEV } = import.meta.env;
const host = DEV ? VITE_SERVER_URI_DEV : VITE_SERVER_URI_PROD;

// TODO: uuid로 백엔드에서 변경 후 수정
export type CardId = string | number | null;

export interface CardContentState {
  cardId: CardId;
  artwork: string;
  to: string;
  msg: string;
  from: string;
}

export interface CardCreateResponse {
  // TODO: uuid로 백엔드에서 변경 후 수정
  id: number;
}

export interface CardGetResponse {
  // TODO: uuid로 백엔드에서 변경 후 수정
  id: number;
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

const initialState: CardContentState = {
  cardId: null,
  artwork: 'Asset-100-1.png',
  to: '',
  msg: '',
  from: '',
};

export const createCardContent = createAsyncThunk<CardCreateResponse, CardContentState>(
  'card/content/create',
  async (cardContent, thunkAPI) => {
    // TODO: API call 분리
    const url = new URL(host);
    url.pathname = 'card';
    const res = await axios
      .post(
        url.href,
        {
          ...cardContent,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 201) {
          return res.data;
        } else {
          // TODO
        }
      });
    return res;
  }
);

export const getCardContent = createAsyncThunk<CardGetResponse, CardGetArg>(
  'card/content/get',
  async (cardContent, thunkAPI) => {
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
  }
);

export const cardContentSlice = createSlice({
  name: 'cardContent',
  initialState,
  reducers: {
    updateCardContent(state, action) {
      state.artwork = action.payload.artwork;
      state.to = action.payload.to;
      state.msg = action.payload.msg;
      state.from = action.payload.from;
    },
    resetCardContent(state, action) {
      state.artwork = 'Asset-100-1.png';
      state.to = '';
      state.msg = '';
      state.from = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createCardContent.fulfilled, (state, action) => {
        console.log('createCardContent.fullfilled', state, action);
        state.cardId = action.payload.id;
      })
      .addCase(createCardContent.rejected, (state, action) => {
        // TODO
      })
      .addCase(getCardContent.fulfilled, (state, action) => {
        state.cardId = action.payload.id;
        state.artwork = action.payload.artwork;
        state.to = action.payload.to;
        state.msg = action.payload.msg;
        state.from = action.payload.from;
      })
      .addCase(getCardContent.rejected, (state, action) => {
        // TODO
      });
  },
});

export const { updateCardContent, resetCardContent } = cardContentSlice.actions;
export default cardContentSlice.reducer;
