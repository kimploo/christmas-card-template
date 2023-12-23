import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const { VITE_SERVER_URI_PROD, VITE_SERVER_URI_DEV, DEV } = import.meta.env;
const host = DEV ? VITE_SERVER_URI_DEV : VITE_SERVER_URI_PROD;

interface LoginState {
  userId: number | null;
  nickname: string | null;
  isLogin: boolean;
}

const initialState: LoginState = {
  userId: null,
  nickname: null,
  isLogin: false,
};

export const authServiceLogin = createAsyncThunk<LoginState, AbortController>(
  'auth/login',
  async (abortController: AbortController) => {
    const url = new URL(host);
    url.pathname = 'login';

    const res = await axios
      .get(url.href, {
        signal: abortController.signal,
      })
      .then((res) => {
        if (res.status === 401) {
          console.log('need logout');
          return {
            userId: null,
            nickname: null,
            isLogin: false,
          };
        } else {
          const accessToken = res.data.access_token;
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          return {
            userId: res.data.properties ? res.data.properties.userId : null,
            nickname: res.data.properties.nickname,
            isLogin: true,
          };
        }
      });
    return res;
  },
);

export const authServiceLogout = createAsyncThunk('auth/logout', async () => {
  const url = new URL(host);
  url.pathname = 'logout';
  return axios.post(url.href).then((res) => {
    if (res.status === 205) {
      return {
        userId: null,
        nickname: null,
        isLogin: false,
      };
    } else {
      return {
        userId: null,
        nickname: null,
        isLogin: false,
      };
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
      .addCase(authServiceLogin.rejected, (state, action) => {
        console.error(action.error);
        toast.error('authServiceLogin Error');
        state.nickname = null;
        state.isLogin = false;
      })
      .addCase(authServiceLogout.fulfilled, (state) => {
        state.nickname = null;
        state.isLogin = false;
      })
      .addCase(authServiceLogout.rejected, (state, action) => {
        console.error(action.error);
        toast.error('authServiceLogout Error');
        state.userId = null;
        state.nickname = null;
        state.isLogin = false;
      });
  },
});

export default loginSlice.reducer;
