import { Artwork, ArtworkSnowFlake } from '@prisma/client';

export enum BgInfoType {
  LINEAR_GRADIENT = 'linear-gradient',
}

export interface BgInfo {
  type: BgInfoType;
  cssValue: string;
  colors: string[];
}

export interface ArtworkBackground {
  id: number;
  bgInfo: BgInfo;
}

export interface BackgroundState {
  Artwork: Artwork;
  ArtworkBackground: ArtworkBackground;
  ArtworkSnowFlake: ArtworkSnowFlake;
}
