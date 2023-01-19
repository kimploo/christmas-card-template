import { Flex } from '@mantine/core';
import { useEffect, createContext } from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Edit } from './pages/Edit';
import { Card } from './pages/Card';
import { LandingPage } from './pages/LandingPage';
import { Preview } from './pages/Preview';
import { MyCards } from './pages/MyCards';
import { Debug } from '@components/Debug';

import axios from 'axios';
import { urlMaker } from './util/urlMaker';

interface LoginState {
  nickname: string | null;
  isLogin: boolean;
}

interface LoginContext {
  loginState: LoginState;
  login: (() => void) | null;
  logout: (() => void) | null;
}

export const LoginContext = createContext<LoginContext>({
  loginState: {
    nickname: null,
    isLogin: false,
  },
  login: null,
  logout: null,
});

function App() {
  const { VITE_KAKAO_JAVASCRIPT_API_KEY } = import.meta.env;

  const [loginState, setLoginState] = useState<LoginState>({
    nickname: null,
    isLogin: false,
  });

  const login = () => {
    axios.get(urlMaker('login').href).then((res) => {
      if (res.status === 401) {
        logout();
      } else {
        setLoginState({
          nickname: res.data.properties.nickname,
          isLogin: true,
        });
      }
    });
  };

  const logout = () => {
    axios.post(urlMaker('logout').href).then((res) => {
      if (res.status === 205) {
        setLoginState({
          nickname: null,
          isLogin: false,
        });
      } else {
        // TODO: 비정상 로그아웃 시 비즈니스 로직
      }
    });
  };

  useEffect(() => {
    try {
      login();
      Kakao.init(VITE_KAKAO_JAVASCRIPT_API_KEY);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      {/* 두 글자 만큼 여백 */}
      <Flex justify={'flex-start'} h={'100vh'} direction={'column'} bg={'#FCCB6B'}>
        {/* 위 사진과 비율 비슷하게 조정 */}
        {/* To. From. 남겨두기 */}
        {/* 폰트 컬러 바꾸기 color: '#3E3A39', */}
        {/* placeholder 중앙정렬 */}
        <LoginContext.Provider value={{ loginState, login, logout }}>
          <BrowserRouter>
            <Routes>
              {/* 버튼 작동시키기 */}
              <Route path="/" element={<LandingPage />}></Route>
              <Route path="/preview" element={<Preview />}></Route>
              <Route path="/card/:cardId" element={<Card />}></Route>
              <Route path="/my-cards" element={<MyCards />}></Route>
              <Route path="/edit" element={<Edit />}></Route>
            </Routes>
            <Debug></Debug>
          </BrowserRouter>
        </LoginContext.Provider>
      </Flex>
    </>
  );
}

export default App;
