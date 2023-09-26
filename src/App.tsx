import { Box, Flex } from '@mantine/core';
import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authServiceLogin } from './redux-state/loginSlice';
import { AppDispatch, RootState } from './store';

const Card = lazy(() => import('./pages/Card'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Preview = lazy(() => import('./pages/Preview'));

import { Loading } from '@pages/Loading';
import { Debug } from '@components/Debug';
import { MainArtwork } from '@components/MainArtwork';

const {
  VITE_CLIENT_DOMAIN_PROD,
  VITE_CLIENT_DOMAIN_DEV,
  PROD,
  DEV,
  VITE_KAKAO_JAVASCRIPT_API_KEY,
} = import.meta.env;
const domain = PROD ? VITE_CLIENT_DOMAIN_PROD : VITE_CLIENT_DOMAIN_DEV;

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { artworks, index } = useSelector((state: RootState) => state.cardContent);

  const getArtworkSrc = (path: string) => {
    const src = new URL(domain);
    src.pathname = path;
    return src.href;
  };

  // ! TODO: 어떻게 userId를 서버로부터 건네받을것인가..
  // redirect를 써서는 userId를 건내받기가 쉽지 않음,
  /// 그런데 그냥 클라이언트의 다른 주소에서 userId를 건내받고 상태 업데이트하고 메인으로 쏴주는 것도 괜찮은 것 같음
  // .. 그리고 그냥 애매하면 얼렁 jwt로 갈아타는 것도 방법..이나.. 쿠키로 어떻게든 해결하고 넘어가보고 싶음 ....
  // 받은 쿠키를 그냥 풀면 되는 것?.. 인데 그러면 시크릿은 클라이언트가 가지고 있어야?..

  useEffect(() => {
    const controller = new AbortController();
    try {
      // 쿠키가 있으면 자동으로 인증이 되기 때문에 ..
      dispatch(authServiceLogin(controller));
      Kakao.init(VITE_KAKAO_JAVASCRIPT_API_KEY);
    } catch (e) {
      console.error(e);
    }
    return () => controller.abort();
  }, []);

  const Layout = () => {
    return (
      <>
        <Flex
          bg={`linear-gradient(180deg, #F3F19D 80%, #FCCB6B 20%)`}
          justify={'center'}
          pt={'2rem'}
          pb={'1rem'}
        >
          <MainArtwork src={getArtworkSrc(artworks[index])}></MainArtwork>
        </Flex>
        <Flex bg={`#FCCB6B`} justify={'center'}>
          {/* 기기에 따라서 viewport 너비에 맞게 input의 너비가 조정이 되어야 한다. 현재는 모바일 전용 */}
          <Box
            sx={(theme) => ({
              textAlign: 'center',
              maxWidth: `${theme.breakpoints.sm - 16 * 8}px`,
              width: `${window.innerWidth - 16 * 4}px`,
            })}
          >
            <Outlet />
          </Box>
        </Flex>
      </>
    );
  };

  return (
    <>
      {/* 두 글자 만큼 여백 */}
      <Flex justify={'flex-start'} h={'100vh'} direction={'column'} bg={'#FCCB6B'}>
        {/* 위 사진과 비율 비슷하게 조정 */}
        {/* To. From. 남겨두기 */}
        {/* 폰트 컬러 바꾸기 color: '#3E3A39', */}
        {/* placeholder 중앙정렬 */}
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Routes>
              {/* 버튼 작동시키기 */}
              <Route path="/" element={<LandingPage />}></Route>
              <Route element={<Layout />}>
                <Route path="/preview" element={<Preview />}></Route>
                <Route path="/card/:cardId" element={<Card />}></Route>
                {DEV ? <Route path="/loading" element={<Loading />}></Route> : null}
              </Route>
            </Routes>
            {DEV ? <Debug></Debug> : null}
          </BrowserRouter>
        </Suspense>
      </Flex>
    </>
  );
}

export default App;
