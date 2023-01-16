import { MainArtwork } from '@components/MainArtwork';
import { Box, Button, Flex, Image, Text } from '@mantine/core';
import { Footer } from '@components/Footer';
import { CardInputContainer } from '@components/CardInputContainer';
import { KakaoLogin } from '@components/KakaoLogin';
import { Carousel } from '@mantine/carousel';
import { useContext, useState } from 'react';
import { LoginContext } from 'src/App';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const { loginState } = useContext(LoginContext);
  const artworks = ['Asset-100-1.png', 'Asset-101-1.png', 'Asset-102-1.png'];
  const [ArtworkIndex, setIndex] = useState(0);
  const navigate = useNavigate();

  const [to, setTo] = useState('To. ');
  const [msg, setMsg] = useState('');
  const [from, setFrom] = useState('From. ');

  return (
    <>
      <Flex bg={`linear-gradient(180deg, #F3F19D 80%, #FCCB6B 20%)`} justify={'center'} pt={'2rem'} pb={'1rem'}>
        <MainArtwork src={artworks[ArtworkIndex]}></MainArtwork>
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
          <Text py={'1rem'} color={'#444444'}>
            {loginState.isLogin ? `${loginState.nickname}님, 원하는 카드를 선택하세요.` : '로그인하고 효디 작가의 모바일 축하 카드를 만들어보세요.'}
          </Text>

          {loginState.isLogin ? (
            <>
              <Carousel
                slideSize="33%"
                height={200}
                slideGap="md"
                controlSize={32}
                withIndicators
                onSlideChange={(index) => {
                  setIndex(index);
                }}
              >
                {artworks.map((src, idx) => {
                  return (
                    <Carousel.Slide key={idx}>
                      <Image src={src}></Image>
                    </Carousel.Slide>
                  );
                })}
              </Carousel>
              <CardInputContainer to={to} msg={msg} from={from} setTo={setTo} setMsg={setMsg} setFrom={setFrom} />
              <Button
                color={'orange'}
                mt={'2rem'}
                mb={'1rem'}
                sx={(theme) => ({
                  maxWidth: `${(theme.breakpoints.sm - 16 * 8) / 2}px`,
                })}
                radius={'md'}
                onClick={() => navigate(`/preview`, { state: { to, msg, from, artwork: artworks[ArtworkIndex] } })}
              >
                카드 미리보기
              </Button>
            </>
          ) : (
            <KakaoLogin></KakaoLogin>
          )}
          <Footer></Footer>
        </Box>
      </Flex>
    </>
  );
};
