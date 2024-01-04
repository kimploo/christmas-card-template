import * as Sentry from '@sentry/react';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import loginSliceReducer from '@/redux-state/loginSlice';
import artworkSliceReducer from '@/feature/artwork/artwork.reducer';
import cardContentReducer from '@/feature/card/card.reducer';

const sentryReduxEnhancer = Sentry.createReduxEnhancer({});

export const store = configureStore({
  reducer: {
    userProfile: loginSliceReducer,
    artwork: artworkSliceReducer,
    card: cardContentReducer,
  },
  enhancers: (getDefaultMiddleware) => getDefaultMiddleware().concat(sentryReduxEnhancer),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
