import { MainArtwork } from '@components/MainArtwork';
import { Box, Flex, Image, Text } from '@mantine/core';
import { Footer } from '@components/Footer';
import { CardInputContainer } from '@components/CardInputContainer';
import { KakaoLogin } from '@components/KakaoLogin';
import { Carousel } from '@mantine/carousel';
import { useState } from 'react';

export const LandingPage = () => {
  const artworks = ['Asset-100-1.png', 'Asset-101-1.png', 'Asset-102-1.png'];
  const [ArtworkIndex, setIndex] = useState(0);

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
            원하는 카드를 선택하세요.
          </Text>
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
          <CardInputContainer></CardInputContainer>
          <KakaoLogin></KakaoLogin>
          <Footer></Footer>
        </Box>
      </Flex>
    </>
  );
};
