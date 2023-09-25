import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginSliceReducer from './redux-state/loginSlice';
import cardContentSlice from './redux-state/CardContentSlice';

export const store = configureStore({
  reducer: {
    userProfile: loginSliceReducer,
    cardContent: cardContentSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
