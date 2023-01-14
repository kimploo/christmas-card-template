import { useState } from 'react';
import { Footer } from '@components/Footer';
import { MainArtwork } from '@components/MainArtwork';
import { PreviewInputContainer } from '@components/PreviewInputContainer';
import { Box, Button, Flex } from '@mantine/core';
import { ShareModal } from '@components/ShareModal';

export const Preview = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <ShareModal opened={opened} setOpened={setOpened} title={'작성한 카드를 소중한 사람에게 공유하세요.'}></ShareModal>
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
          <PreviewInputContainer from={null} to={null} content={null}></PreviewInputContainer>
          <Flex justify={'center'} direction={'column'} gap={'1rem'}>
            <Button onClick={() => setOpened(true)}>공유하기</Button>
            <Button>이전에 작성한 카드 확인하기</Button>
          </Flex>
          <Footer></Footer>
        </Box>
      </Flex>
    </>
  );
};
