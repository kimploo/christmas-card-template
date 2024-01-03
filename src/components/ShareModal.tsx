/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Flex, Image, Modal, UnstyledButton } from '@mantine/core';
import { IconShare } from '@tabler/icons-react';
import mobile from 'is-mobile';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';

interface Props {
  isShare: boolean;
  setShare: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  to: string;
  from: string;
  msg: string;
  uuid: string | null;
}

export const ShareModal = ({ isShare, setShare, title, to, uuid }: Props) => {
  const { artworkInfo, currentArtworkIndex } = useSelector((state: RootState) => state.artwork);

  const shareCardUrl = `https://card.teamhh.link/card/${uuid}`;
  const imageUrl = artworkInfo[currentArtworkIndex].url;

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
    //@ts-ignore
    if (!Kakao.isInitialized()) {
      //@ts-ignore
      Kakao.cleanup();
      //@ts-ignore
      Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_API_KEY);
    }

    //@ts-ignore
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${to}에게 전합니다.`,
        imageUrl,
        link: {
          mobileWebUrl: shareCardUrl,
          webUrl: shareCardUrl,
        },
      },
      buttons: [
        {
          title: '확인하기',
          link: {
            mobileWebUrl: shareCardUrl,
            webUrl: shareCardUrl,
          },
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
              {mobile() && (
                <UnstyledButton onClick={handleShareClick} p={4}>
                  <IconShare strokeWidth={0.8} size={76} color={'#CED4DA'}></IconShare>
                </UnstyledButton>
              )}
              <UnstyledButton onClick={kakaoShare}>
                <Image
                  w={84}
                  src="https://team-hh.s3.ap-northeast-2.amazonaws.com/christmas-card-template/kakaotalk-logo-gray.svg"
                ></Image>
              </UnstyledButton>
            </Flex>
          </Box>
        </Flex>
      </Modal>
    </>
  );
};
