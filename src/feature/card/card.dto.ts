import { CardWithInfos } from './card.type';

export type CardId = string | null;

export interface CreateCardReqDTO {
  from: string;
  to: string;
  msg: string;
  artworkId: number;
  artworkBackgroundId: number;
  artworkSnowFlakeId: number;
}

export interface CreateCardResDTO {
  // TODO: uuid로 백엔드에서 변경 후 수정
  uuid: CardId;
}

export interface UpdateCardReqDTO {
  from: string;
  to: string;
  msg: string;
  artworkId: number;
  artworkUrl: string;
  artworkBackgroundId: number;
  bgColor: string;
  artworkSnowFlakeId: number;
  imgUrls: string[];
}

export type GetCardResDTO = CardWithInfos;
