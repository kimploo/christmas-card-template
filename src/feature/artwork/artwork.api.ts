import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '@/lib/axios';
import { AxiosResponse } from 'axios';

import { SuccessResDTO } from '@/types/dto';
import { GetArtworkResDTO } from './artwork.dto';

interface ArtworkArgs {
  limit: number;
  page: number;
}

export const getArtworksApi = createAsyncThunk('artwork/get', async (artworkArgs: ArtworkArgs) => {
  type RES = SuccessResDTO<GetArtworkResDTO[]>;
  const { limit, page } = artworkArgs;
  return await api
    .get<RES, AxiosResponse<RES>>(`/artwork?limit=${limit}&page=${page}`, {
      withCredentials: true,
    })
    .then((res) => res.data.data);
  // 에러 Res 처리를 따로 하지 않은 이유
  // - axios는 상태 코드가 200번대 이상이면 에러로 처리가 되어 then으로 들어오지 않고 throw
  // - throw인 에러는 reducer에서 처리
});
