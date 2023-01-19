/* eslint-disable */
// @ts-nocheck

import { Box, Flex, Image, Modal } from '@mantine/core';
import { IconShare } from '@tabler/icons';

interface Props {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  to: string;
  from: string;
  msg: string;
  cardId: number;
  artwork: string;
}

export const ShareModal = ({ opened, setOpened, title, to, from, msg, cardId, artwork }: Props) => {
  const link = {
    mobileWebUrl: `https://card.teamhh.link/card/${cardId}`,
    webUrl: `https://card.teamhh.link/card/${cardId}`,
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${to}에게 전합니다.`,
          text: ``,
          url: `https://card.teamhh.link/card/${cardId}`,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => {
          console.log('Error sharing', error);
        });
    } else {
      setOpened(true);
    }
  };

  const kakaoShare = () => {
    if (!Kakao.isInitialized()) {
      Kakao.init(import.meta.env.VITE_APP_KAKAO_API_KEY);
    }

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${to}에게 전합니다.`,
        imageUrl: `https://card.teamhh.link/${artwork}`,
        link,
      },
      buttons: [
        {
          title: '확인하기',
          link,
        },
      ],
    });
  };

  return (
    <>
      <Modal centered opened={opened} onClose={() => setOpened(false)} title={title}>
        <Flex justify={'center'} gap={'1.5rem'} pt={'4rem'} pb={'2rem'}>
          <Box onClick={handleShareClick} p={2}>
            <IconShare strokeWidth={0.8} size={36} color={'#CED4DA'}></IconShare>
          </Box>
          {/* 카톡 아이콘 따로 제작 필요 */}
          <Image onClick={kakaoShare} width={44} src="https://team-hh.s3.ap-northeast-2.amazonaws.com/christmas-card-template/kakaotalk-logo-gray.svg"></Image>
        </Flex>
      </Modal>
    </>
  );
};
