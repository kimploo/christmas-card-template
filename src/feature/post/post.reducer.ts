import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostInitialState {
  currentArtworkId: number;
  currentArtworkBackgroundId: number;
  currentArtworkSnowFlakeId: number;
  to: string;
  msg: string;
  from: string;
}

export const initialPostState: PostInitialState = {
  currentArtworkId: 1,
  currentArtworkBackgroundId: 1,
  currentArtworkSnowFlakeId: 1,
  to: 'To. ',
  msg: '',
  from: 'From. ',
};

/**
 * 전역 상태 post
 * 카드 입력 -> 카드 확인까지 카드 생성을 위한 현재 input의 내용과 artwork id
 */
export const postSlice = createSlice({
  name: 'post',
  initialState: initialPostState,
  reducers: {
    updatePostContent(state, action: PayloadAction<PostInitialState>) {
      state.to = action.payload.to;
      state.msg = action.payload.msg;
      state.from = action.payload.from;
      state.currentArtworkId = action.payload.currentArtworkId;
      state.currentArtworkBackgroundId = action.payload.currentArtworkBackgroundId;
      state.currentArtworkSnowFlakeId = action.payload.currentArtworkSnowFlakeId;
    },
    resetPostContent(state) {
      state.to = initialPostState.to;
      state.msg = initialPostState.msg;
      state.from = initialPostState.from;
      state.currentArtworkId = initialPostState.currentArtworkId;
      state.currentArtworkBackgroundId = initialPostState.currentArtworkBackgroundId;
      state.currentArtworkSnowFlakeId = initialPostState.currentArtworkSnowFlakeId;
    },
  },
});

export const { updatePostContent, resetPostContent } = postSlice.actions;
export default postSlice.reducer;
