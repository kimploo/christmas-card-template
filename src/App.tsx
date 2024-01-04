/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Flex } from '@mantine/core';
import { useEffect, Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authServiceLogin } from './redux-state/loginSlice';
import { AppDispatch, RootState } from './store';
import * as Sentry from '@sentry/react';

const Card = lazy(() => import('./pages/Card'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Preview = lazy(() => import('./pages/Preview'));

import { Loading } from '@/pages/Loading';
import { Debug } from '@/components/Debug';
import { MainArtwork } from '@/components/MainArtwork';
import { Footer } from '@/components/Footer';
import { SnowfallContainer } from '@/components/SnowfallContainer';
import { ToastContainer } from 'react-toastify';
import { getArtworksApi } from './feature/artwork/artwork.api';

const { VITE_KAKAO_JAVASCRIPT_API_KEY, DEV } = import.meta.env;

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentArtworkIndex, artworkInfo, currentArtworkBackgroundIndex } = useSelector(
    (state: RootState) => state.artwork,
  );

  useEffect(() => {
    const controller = new AbortController();
    try {
      // 쿠키가 있으면 자동으로 인증이 되기 때문에 ..
      dispatch(authServiceLogin(controller)).then(() => {
        dispatch(getArtworksApi({ limit: 20, page: 1 }));
      });
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

  const Layout = () => {
    const bgInfo = artworkInfo[currentArtworkIndex].ArtworkBackground[currentArtworkBackgroundIndex]
      .bgInfo as {
      type: string;
      cssValue: string;
      colors: string[];
    };
    let firstBG;
    let secondBG;

    if (!bgInfo) {
      firstBG = `linear-gradient(180deg, #F3F19D 80%, #FCCB6B 20%)`;
      secondBG = '#FCCB6B';
    } else {
      firstBG = bgInfo.cssValue;
      secondBG = bgInfo.colors[1];
    }

    return (
      <Flex justify={'flex-start'} h={'100vh'} direction={'column'} bg={'#FCCB6B'}>
        <Flex
          bg={firstBG || `linear-gradient(180deg, #F3F19D 80%, #FCCB6B 20%)`}
          justify={'center'}
          pt={'2rem'}
          pb={'1rem'}
        >
          <MainArtwork></MainArtwork>
        </Flex>
        <Flex bg={secondBG} justify={'center'} direction={'column'}>
          {/* 기기에 따라서 viewport 너비에 맞게 input의 너비가 조정이 되어야 한다. 현재는 모바일 전용 */}
          <Flex bg={secondBG} justify={'center'} direction={'column'}>
            <Outlet />
            <Footer></Footer>
          </Flex>
          <SnowfallContainer onOff={true}></SnowfallContainer>
        </Flex>
        <ToastContainer />
        {DEV && <Debug />}
      </Flex>
    );
  };

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
