import { MainArtwork } from '@components/MainArtwork';
import { Box, Flex, Image } from '@mantine/core';
import { Footer } from '@components/Footer';
import { CardInputContainer } from '@components/CardInputContainer';
import { KakaoLogin } from '@components/KakaoLogin';
import { Carousel } from '@mantine/carousel';

export const LandingPage = () => {
  return (
    <>
      <Flex bg={`linear-gradient(180deg, #E6E6E6 80%, #F6F3A5 20%)`} justify={'center'}>
        <MainArtwork src={'https://team-hh.s3.ap-northeast-2.amazonaws.com/christmas-card-template/2022-hyodee-christmas-card.png'}></MainArtwork>
      </Flex>
      <Flex bg={`#F6F3A5`} justify={'center'} pt={'1rem'}>
        {/* 기기에 따라서 viewport 너비에 맞게 input의 너비가 조정이 되어야 한다. 현재는 모바일 전용 */}
        <Box
          sx={(theme) => ({
            textAlign: 'center',
            maxWidth: `${theme.breakpoints.sm - 16 * 8}px`,
            width: `${window.innerWidth - 16 * 4}px`,
          })}
        >
          원하는 카드를 선택하세요.
          <Carousel slideSize="33%" height={200} slideGap="md" controlSize={32} withIndicators>
            <Carousel.Slide>
              <Image src="Asset 1.png"></Image>
            </Carousel.Slide>
            <Carousel.Slide>
              <Image src="Asset 1.png"></Image>
            </Carousel.Slide>
            <Carousel.Slide>
              <Image src="Asset 1.png"></Image>
            </Carousel.Slide>
          </Carousel>
          <CardInputContainer></CardInputContainer>
          <KakaoLogin></KakaoLogin>
          <Footer></Footer>
        </Box>
      </Flex>
    </>
  );
};
