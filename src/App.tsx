/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authServiceLogin } from './redux-state/loginSlice';
import { AppDispatch } from './store';
import * as Sentry from '@sentry/react';

const Card = lazy(() => import('./pages/Card'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Preview = lazy(() => import('./pages/Preview'));

import { Loading } from '@/pages/Loading';
import { getArtworksApi } from './feature/artwork/artwork.api';
import Layout from './Layout';

const { VITE_KAKAO_JAVASCRIPT_API_KEY, DEV } = import.meta.env;

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname } = location;
    const isMindpieceKr = /^https:\/\/mindpiece\.kr\//.test(window.location.href);

    if (!isMindpieceKr) {
      navigate('https://mindpiece.kr' + pathname);
    }
  }, [location, navigate]);

  useEffect(() => {
    const controller = new AbortController();
    try {
      // 쿠키가 있으면 자동으로 인증이 되기 때문에 ..
      dispatch(getArtworksApi({ limit: 20, page: 1 }));
      dispatch(authServiceLogin(controller));
      // @ts-ignore
      if (!Kakao.isInitialized()) {
        // @ts-ignore
        Kakao.cleanup();
        // @ts-ignore
        Kakao.init(VITE_KAKAO_JAVASCRIPT_API_KEY);
      }
    } catch (e) {
      console.error(e);
    }
    return () => controller.abort();
  }, [dispatch]);

  const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter);
  const router = sentryCreateBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <Loading />,
      children: [
        {
          index: true,
          path: '',
          element: <LandingPage />,
        },
        {
          path: 'preview',
          element: <Preview />,
        },
        {
          path: 'card/:cardId',
          element: <Card />,
        },
        DEV
          ? {
              path: 'loading',
              element: <Loading />,
            }
          : {},
      ],
    },
  ]);

  if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
  }

  return (
    <>
      <Sentry.ErrorBoundary fallback={<Loading />} showDialog>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} fallbackElement={<Loading />} />
        </Suspense>
      </Sentry.ErrorBoundary>
    </>
  );
}

export default App;
