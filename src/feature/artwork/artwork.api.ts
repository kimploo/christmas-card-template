import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetArtworkResDTO } from './artwork.dto';
import { AxiosResponse } from 'axios';
import api from '@/lib/axios';
import { DefaultResDTO } from '@/customType/dto';

export const getArtworksApi = createAsyncThunk(
  'artwork/get',
  async (artworkArgs: { limit: number; page: number }, { signal, rejectWithValue }) => {
    type RES = DefaultResDTO<GetArtworkResDTO[], string>;
    const { limit, page } = artworkArgs;
    const res = await api
      .get<RES, AxiosResponse<RES>>(`/artwork?limit=${limit}&page=${page}`)
      .then((res) => {
        if (res.status === 201) {
          return res.data;
        } else {
          return rejectWithValue('카드 생성이 실패했습니다.');
        }
      });
    return res;
  },
);
