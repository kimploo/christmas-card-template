import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const { VITE_SERVER_URI_PROD, VITE_SERVER_URI_DEV, DEV } = import.meta.env;
const host = DEV ? VITE_SERVER_URI_DEV : VITE_SERVER_URI_PROD;

interface LoginState {
  userId: number;
  nickname: string | null;
  isLogin: boolean;
}

const initialState: LoginState = {
  userId: -1,
  nickname: null,
  isLogin: false,
};

export const authServiceLogin = createAsyncThunk<LoginState, AbortController>(
  'auth/login',
  async (abortController: AbortController, thunkAPI) => {
    const url = new URL(host);
    url.pathname = 'login';

    const res = await axios
      .get(url.href, {
        signal: abortController.signal,
      })
      .then((res) => {
        if (res.status === 401) {
          throw console.log('need logout');
        } else {
          const accessToken = res.data.access_token;
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          return {
            userId: res.data.properties.userId,
            nickname: res.data.properties.nickname,
            isLogin: true,
          };
        }
      });
    return res;
  }
);

export const authServiceLogout = createAsyncThunk('auth/logout', async (userId, thunkAPI) => {
  const url = new URL(host);
  url.pathname = 'logout';
  return axios.post(url.href).then((res) => {
    if (res.status === 205) {
      return {
        nickname: null,
        isLogin: false,
      };
    } else {
      // TODO: 비정상 로그아웃 시 비즈니스 로직
    }
  });
});

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateLogin(state, action) {
      state.nickname = action.payload.nickname;
      state.isLogin = action.payload.isLogin;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authServiceLogin.fulfilled, (state, action) => {
        state.nickname = action.payload.nickname;
        state.isLogin = action.payload.isLogin;
      })
      .addCase(authServiceLogin.rejected, (state) => {
        state.nickname = null;
        state.isLogin = false;
      })
      .addCase(authServiceLogout.fulfilled, (state) => {
        state.nickname = null;
        state.isLogin = false;
      })
      .addCase(authServiceLogout.rejected, () => {
        // TODO
      });
  },
});

// export const { increment, decrement, incrementByAmount } = loginSlice.actions;
export default loginSlice.reducer;
