import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostInitialState {
  to: string;
  msg: string;
  from: string;
}

export const initialPostState: PostInitialState = {
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
    },
    resetPostContent(state) {
      state.to = initialPostState.to;
      state.msg = initialPostState.msg;
      state.from = initialPostState.from;
    },
  },
});

export const { updatePostContent, resetPostContent } = postSlice.actions;
export default postSlice.reducer;
