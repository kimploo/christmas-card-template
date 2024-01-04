import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import api from '@/lib/axios';

import { CreateCardReqDTO, CreateCardResDTO } from './card.dto';
import { SuccessResDTO } from '@/types/dto';
import { CardWithInfos } from './card.type';

export interface CardGetArg {
  // TODO: uuid로 백엔드에서 변경 후 수정
  cardId: string;
}

export const createCardAPI = createAsyncThunk<CreateCardResDTO, CreateCardReqDTO>(
  'card/create',
  async (reqDTO: CreateCardReqDTO) => {
    type RES = SuccessResDTO<CreateCardResDTO>;
    return await api
      .post<RES, AxiosResponse<RES>, CreateCardReqDTO>('/card', reqDTO, {
        withCredentials: true,
      })
      .then((res) => res.data.data);
  },
);

export const getCardAPI = createAsyncThunk('card/get', async (cardId: CardGetArg) => {
  type RES = SuccessResDTO<CardWithInfos>;
  return await api
    .get<RES, AxiosResponse<RES>>(`/card/${cardId.cardId}`)
    .then((res) => res.data.data);
});
