import { Flex } from '@mantine/core';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import { Edit } from './pages/Edit';
import { Card } from './pages/Card';
import { LandingPage } from './pages/LandingPage';
import { Preview } from './pages/Preview';
import { MyCards } from './pages/MyCards';
import { Debug } from '@components/Debug';

import { useDispatch } from 'react-redux';
import { authServiceLogin, authServiceLogout } from './redux-state/loginSlice';
import { AppDispatch } from './store';

function App() {
  const { VITE_KAKAO_JAVASCRIPT_API_KEY } = import.meta.env;
  const dispatch = useDispatch<AppDispatch>();

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

  return (
    <>
      {/* 두 글자 만큼 여백 */}
      <Flex justify={'flex-start'} h={'100vh'} direction={'column'} bg={'#FCCB6B'}>
        {/* 위 사진과 비율 비슷하게 조정 */}
        {/* To. From. 남겨두기 */}
        {/* 폰트 컬러 바꾸기 color: '#3E3A39', */}
        {/* placeholder 중앙정렬 */}
        <BrowserRouter>
          <Routes>
            {/* 버튼 작동시키기 */}
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/preview" element={<Preview />}></Route>
            <Route path="/card/:cardId" element={<Card />}></Route>
            {/* <Route path="/my-cards" element={<MyCards />}></Route> */}
            {/* <Route path="/edit" element={<Edit />}></Route> */}
          </Routes>
          <Debug></Debug>
        </BrowserRouter>
      </Flex>
    </>
  );
}

export default App;
