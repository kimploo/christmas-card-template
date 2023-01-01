import { Image, Box, Flex, TextInput, Textarea, Text, Anchor, createStyles } from '@mantine/core';
import { IconBrandInstagram, IconMailOpened, IconShare } from '@tabler/icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { KakaoLogin } from './components/KakaoLogin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Edit } from './pages/Edit';
import { Card } from './pages/Card';
import { LandingPage } from './pages/LandingPage';
import { Preview } from './pages/Preview';
import { MyCards } from './pages/MyCards';

function App() {
  const { VITE_KAKAO_JAVASCRIPT_API } = import.meta.env;

  useEffect(() => {
    try {
      Kakao.init(VITE_KAKAO_JAVASCRIPT_API);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      {/* 두 글자 만큼 여백 */}
      <Flex justify={'space-between'} direction={'column'} bg={'#FFF'}>
        {/* 위 사진과 비율 비슷하게 조정 */}
        {/* To. From. 남겨두기 */}
        {/* 폰트 컬러 바꾸기 color: '#3E3A39', */}
        {/* placeholder 중앙정렬 */}
        <BrowserRouter>
          <Routes>
            {/* 버튼 작동시키기 */}
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/preview" element={<Preview />}></Route>
            <Route path="/card" element={<Card />}></Route>
            <Route path="/my-cards" element={<MyCards />}></Route>
            <Route path="/edit" element={<Edit />}></Route>
          </Routes>
        </BrowserRouter>
      </Flex>
    </>
  );
}

export default App;
