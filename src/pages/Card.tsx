import { CardInputContainer } from '@components/CardInputContainer';
import { MainArtwork } from '@components/MainArtwork';
import { Footer } from '@components/Footer';
import { Carousel } from '@mantine/carousel';
import { Flex, Image, Box, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { PreviewInputContainer } from '@components/PreviewInputContainer';
import axios from 'axios';

interface CardData {
  from: string;
  to: string;
  msg: string;
  userId: number;
}

export const Card = () => {
  const [card, setCard] = useState<CardData | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/card/1', { withCredentials: true }).then((res) => {
      setCard(res.data);
    });
  }, []);

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
          <PreviewInputContainer from={card?.from} to={card?.to} content={card?.msg}></PreviewInputContainer>
          <Flex justify={'center'} direction={'column'} gap={'1rem'}>
            <Button>나도 만들기</Button>
          </Flex>
          <Footer />
        </Box>
      </Flex>
    </>
  );
};
