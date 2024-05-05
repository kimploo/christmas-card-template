/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Flex, Image, Modal, UnstyledButton } from '@mantine/core';
import { IconShare } from '@tabler/icons-react';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';

interface Props {
  isShare: boolean;
  setOpen: () => void;
  setClose: () => void;
  title: string;
  to: string;
  from: string;
  msg: string;
  uuid: string | null;
}

export const ShareModal = ({ isShare, setOpen, setClose, title, to, uuid }: Props) => {
  const { Artwork } = useSelector((state: RootState) => state.background);

  const shareCardUrl = `https://card.teamhh.link/card/${uuid}`;
  const imageUrl = Artwork.url;

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
      setOpen();
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
      <Modal.Root centered opened={isShare} onClose={() => setClose()}>
        <Modal.Overlay></Modal.Overlay>
        <Flex>
          {/* <Flex > */}
          <Modal.Content h={260}>
            <Flex justify={'space-between'} direction={'column'} h={'100%'}>
              <Modal.Header bg={'#F0F0F0'}>
                <Modal.Title>{title}</Modal.Title>
                <Modal.CloseButton />
              </Modal.Header>
              <Modal.Body
                p={0}
                style={{
                  flexGrow: 1,
                }}
              >
                <Flex justify={'center'} align={'center'} gap={'4rem'} h={'100%'}>
                  {/* caveat: 타입에는 share 속성이 늘 있다고 하나, share 속성이 없는 경우가 있음 */}
                  {/*@ts-ignore*/}

                  <UnstyledButton onClick={kakaoShare}>
                    <Flex direction={'column'} justify={'center'} align={'center'} gap={'xs'}>
                      <Image
                        w={72}
                        src="https://hyodee-card-2.s3.ap-northeast-2.amazonaws.com/kakao_share.png"
                      ></Image>
                      카카오톡
                    </Flex>
                  </UnstyledButton>
                  {
                    <UnstyledButton onClick={handleShareClick} p={4}>
                      <Flex direction={'column'} justify={'center'} align={'center'} gap={'xs'}>
                        <Image
                          w={72}
                          src="https://hyodee-card-2.s3.ap-northeast-2.amazonaws.com/native_share.png"
                        ></Image>
                        공유하기
                      </Flex>
                    </UnstyledButton>
                  }
                </Flex>
              </Modal.Body>
            </Flex>
          </Modal.Content>
        </Flex>
      </Modal.Root>
    </>
  );
};
