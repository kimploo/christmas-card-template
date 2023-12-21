/* eslint-disable */
// @ts-nocheck

import { Box, Flex, Image, Modal } from '@mantine/core';
import { IconShare } from '@tabler/icons-react';
import { CardId } from '@redux-state/cardContentSlice';
import mobile from 'is-mobile'

interface Props {
  isShare: boolean;
  setShare: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  to: string;
  from: string;
  msg: string;
  cardId: CardId;
  artwork: string;
}

export const ShareModal = ({ isShare, setShare, title, to, from, msg, cardId, artwork }: Props) => {
  const shareCardUrl = `https://card.teamhh.link/card/${cardId}`
  const imageUrl =  `https://card.teamhh.link/${artwork}`

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${to}에게 전합니다.💌`,
          text: ``,
          url: shareCardUrl,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => {
          console.log('Error sharing', error);
        });
    } else {
      setShare(true);
    }
  };

  const kakaoShare = () => {
    if (!Kakao.isInitialized()) {
      Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_API_KEY);
    }

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${to}에게 전합니다.`,
        imageUrl,
        link: shareCardUrl
      },
      buttons: [
        {
          title: '확인하기',
          link: shareCardUrl
        },
      ],
    });
  };

  return (
    <>
      <Modal centered opened={isShare} onClose={() => setShare(false)} title={title}>
        <Flex justify={'center'} gap={'1.5rem'} pt={'4rem'} pb={'2rem'}>
          <Box h={84}>
            <Flex justify={'center'} align={'center'} gap={'1.5rem'}>
            { mobile() &&
              <Box onClick={handleShareClick} p={4}>
                <IconShare strokeWidth={0.8} size={76} color={'#CED4DA'}></IconShare>
              </Box>
            }             
              <Image
                onClick={kakaoShare}
                w={84}
                src="https://team-hh.s3.ap-northeast-2.amazonaws.com/christmas-card-template/kakaotalk-logo-gray.svg"
              ></Image>
            </Flex>
          </Box>
        </Flex>
      </Modal>
    </>
  );
};
