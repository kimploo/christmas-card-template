import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetArtworkResDTO } from './artwork.dto';
import { getArtworksApi } from './artwork.api';

export interface ArtworkInitialState {
  artworkInfo: GetArtworkResDTO[];
}

const defaultArtworkBgInfo = {
  id: 9,
  bgInfo: {
    type: 'linear-gradient',
    cssValue: 'linear-gradient(180deg, #F3F19D 80%, #FCCB6B 20%)',
    colors: ['#F3F19D', '#FCCB6B'],
  },
};

const initialState: ArtworkInitialState = {
  artworkInfo: [
    {
      id: 1,
      url: 'https://mindpiece.kr/parents_day_72.png',
      ArtworkBackground: [
        {
          id: 1,
          bgInfo: {
            type: 'linear-gradient',
            cssValue: 'linear-gradient(180deg, #F3F19D 80%, #FCCB6B 20%)',
            colors: ['#F3F19D', '#FCCB6B'],
          },
        },
        {
          id: 2,
          bgInfo: {
            type: 'linear-gradient',
            cssValue: 'linear-gradient(180deg, #FFF9D7 80%, #CBEA88 20%)',
            colors: ['#FFF9D7', '#CBEA88'],
          },
        },
      ],
      ArtworkSnowFlake: [
        {
          id: 1,
          imgUrls: [
            'https://mindpiece.kr/snowflakes/white-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/orange-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/red-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/yellow-snowflake-2x.png',
          ],
        },
      ],
    },
    {
      id: 2,
      url: 'https://mindpiece.kr/Together_72.png',
      ArtworkBackground: [
        {
          id: 3,
          bgInfo: {
            type: 'linear-gradient',
            cssValue: 'linear-gradient(180deg, #C5F0FF 80%, #CBEA88 20%)',
            colors: ['#C5F0FF', '#CBEA88'],
          },
        },
        defaultArtworkBgInfo,
      ],
      ArtworkSnowFlake: [
        {
          id: 1,
          imgUrls: [
            'https://mindpiece.kr/snowflakes/white-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/orange-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/red-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/yellow-snowflake-2x.png',
          ],
        },
      ],
    },
    {
      id: 3,
      url: 'https://mindpiece.kr/Snowman_72.png',
      ArtworkBackground: [
        {
          id: 4,
          bgInfo: {
            type: 'linear-gradient',
            cssValue: 'linear-gradient(180deg, #FFF2BD 80%, #C6D7F7 20%)',
            colors: ['#FFF2BD', '#C6D7F7'],
          },
        },
        defaultArtworkBgInfo,
      ],
      ArtworkSnowFlake: [
        {
          id: 1,
          imgUrls: [
            'https://mindpiece.kr/snowflakes/white-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/orange-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/red-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/yellow-snowflake-2x.png',
          ],
        },
      ],
    },
    {
      id: 4,
      url: 'https://mindpiece.kr/LuckyPocket_72.png',
      ArtworkBackground: [
        {
          id: 5,
          bgInfo: {
            type: 'linear-gradient',
            cssValue: 'linear-gradient(180deg, #FFF2BD 80%, #C6D7F7 20%)',
            colors: ['#FFF2BD', '#C6D7F7'],
          },
        },
        defaultArtworkBgInfo,
      ],
      ArtworkSnowFlake: [
        {
          id: 1,
          imgUrls: [
            'https://mindpiece.kr/snowflakes/white-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/orange-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/red-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/yellow-snowflake-2x.png',
          ],
        },
      ],
    },
    {
      id: 5,
      url: 'https://mindpiece.kr/Christmas_72.png',
      ArtworkBackground: [
        {
          id: 6,
          bgInfo: {
            type: 'linear-gradient',
            cssValue: 'linear-gradient(180deg, #FFD2D2 80%, #D2F7FF 20%)',
            colors: ['#FFD2D2', '#D2F7FF'],
          },
        },
        defaultArtworkBgInfo,
      ],
      ArtworkSnowFlake: [
        {
          id: 1,
          imgUrls: [
            'https://mindpiece.kr/snowflakes/white-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/orange-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/red-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/yellow-snowflake-2x.png',
          ],
        },
      ],
    },
    {
      id: 6,
      url: 'https://mindpiece.kr/Congrats_72.png',
      ArtworkBackground: [
        {
          id: 7,
          bgInfo: {
            type: 'linear-gradient',
            cssValue: 'linear-gradient(180deg, #FFF3B6 80%, #FFCA85 20%)',
            colors: ['#FFF3B6', '#FFCA85'],
          },
        },
        defaultArtworkBgInfo,
      ],
      ArtworkSnowFlake: [
        {
          id: 1,
          imgUrls: [
            'https://mindpiece.kr/snowflakes/white-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/orange-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/red-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/yellow-snowflake-2x.png',
          ],
        },
      ],
    },
    {
      id: 7,
      url: 'https://mindpiece.kr/Chuseok_72.png',
      ArtworkBackground: [
        {
          id: 8,
          bgInfo: {
            type: 'linear-gradient',
            cssValue: 'linear-gradient(180deg, #FFBE5F 80%, #FFF9C5 20%)',
            colors: ['#FFBE5F', '#FFF9C5'],
          },
        },
        defaultArtworkBgInfo,
      ],
      ArtworkSnowFlake: [
        {
          id: 1,
          imgUrls: [
            'https://mindpiece.kr/snowflakes/white-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/orange-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/red-snowflake-2x.png',
            'https://mindpiece.kr/snowflakes/yellow-snowflake-2x.png',
          ],
        },
      ],
    },
  ],
};

// ? 이 상태가 변경되어서 컴포넌트 리렌더링이 많아지면, artworkId를 모아놓은 상태와 artworkInfo 상태를 분리해야 한다.
export const artworkSlice = createSlice({
  name: 'artwork',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getArtworksApi.fulfilled, (state, action: PayloadAction<GetArtworkResDTO[]>) => {
        state.artworkInfo = action.payload;
      })
      .addCase(getArtworksApi.pending, () => {
        // TODO
      })
      .addCase(getArtworksApi.rejected, () => {
        // TODO
      });
  },
});

export default artworkSlice.reducer;
