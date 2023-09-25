import { MainArtwork } from '@components/MainArtwork';
import { Box, Button, Flex, Image, Text } from '@mantine/core';
import { Footer } from '@components/Footer';
import { CardInputContainer } from '@components/CardInputContainer';
import { KakaoLogin } from '@components/KakaoLogin';
import { Carousel } from '@mantine/carousel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SnowfallContainer } from '@components/SnowfallContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { updateCardContent } from '@redux-state/cardContentSlice';

export const LandingPage = () => {
  const loginState = useSelector((state: RootState) => state.userProfile);
  const artworks = ['Chuseok_72.png', 'Congrats_72.png', 'Asset-102-1.png'];
  const [ArtworkIndex, setIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [to, setTo] = useState('To. ');
  const [msg, setMsg] = useState('');
  const [from, setFrom] = useState('From. ');

  const handlePreview = () => {
    dispatch(
      updateCardContent({
        artwork: artworks[ArtworkIndex],
        to,
        msg,
        from,
      })
    );
    navigate(`/preview`);
  };

  return (
    <>
      <Flex
        bg={`linear-gradient(180deg, #F3F19D 80%, #FCCB6B 20%)`}
        justify={'center'}
        pt={'2rem'}
        pb={'1rem'}
      >
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
            {loginState.isLogin ? (
              `${loginState.nickname}님, 원하는 카드를 선택하세요.`
            ) : (
              <>
                로그인하고 <br></br>
                효디 작가의 모바일카드를 만들어보세요.
              </>
            )}
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
              <CardInputContainer
                to={to}
                msg={msg}
                from={from}
                setTo={setTo}
                setMsg={setMsg}
                setFrom={setFrom}
              />
              <Button
                mt={'3rem'}
                mb={'1rem'}
                sx={(theme) => ({
                  backgroundColor: '#fbffb0',
                  border: '1px solid #444444',
                  color: '#000000',
                  maxWidth: `${(theme.breakpoints.sm - 16 * 8) / 2}px`,
                  width: `${(window.innerWidth - 16 * 4) * (2 / 3)}px`,

                  ':active': {
                    backgroundColor: '#FCCB6B',
                  },

                  ':hover': {
                    backgroundColor: '#FCCB6B',
                  },
                })}
                radius={'md'}
                onClick={handlePreview}
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
      <SnowfallContainer onOff={true}></SnowfallContainer>
    </>
  );
};
