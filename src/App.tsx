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

const textInputStyles = createStyles((theme) => ({
  input: {
    color: '#CED4DA',
  },
}));

function App() {
  const { VITE_KAKAO_JAVASCRIPT_API } = import.meta.env;

  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

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
        <Flex bg={`linear-gradient(180deg, #E6E6E6 80%, #F6F3A5 20%)`} justify={'center'}>
          <Box
            px={'2rem'}
            sx={(theme) => ({
              maxWidth: theme.breakpoints.sm,
            })}
          >
            <Image src="https://team-hh.s3.ap-northeast-2.amazonaws.com/christmas-card-template/2022-hyodee-christmas-card.png"></Image>
          </Box>
        </Flex>
        {/* 위 사진과 비율 비슷하게 조정 */}
        <Flex bg={`#F6F3A5`} justify={'center'} pt={'1rem'}>
          {/* 기기에 따라서 viewport 너비에 맞게 input의 너비가 조정이 되어야 한다. 현재는 모바일 전용 */}
          <Box
            sx={(theme) => ({
              textAlign: 'center',
              maxWidth: `${theme.breakpoints.sm - 16 * 8}px`,
              width: `${window.innerWidth - 16 * 4}px`,
            })}
          >
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
            <Flex justify={'center'} gap={'1.5rem'} pt={'4rem'} pb={'2rem'}>
              <Box p={2}>
                <IconMailOpened strokeWidth={0.8} size={36} color={'#CED4DA'}></IconMailOpened>
              </Box>
              <Box p={2}>
                <IconShare strokeWidth={0.8} size={36} color={'#CED4DA'}></IconShare>
              </Box>
              <IconBrandInstagram strokeWidth={0.7} size={42} color={'#CED4DA'}></IconBrandInstagram>
              {/* 카톡 아이콘 따로 제작 필요 */}
              <Image width={44} src="https://team-hh.s3.ap-northeast-2.amazonaws.com/christmas-card-template/kakaotalk-logo-gray.svg"></Image>
            </Flex>
            <Text color={'#CED4DA'} pb={'1rem'}>
              Copyright 2022.{' '}
              <Anchor underline={true} href="https://www.instagram.com/hyodee.r/">
                Hyodee
              </Anchor>{' '}
              & Homesick. All rights reserved
            </Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default App;
