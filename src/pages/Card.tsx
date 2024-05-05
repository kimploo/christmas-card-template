import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Anchor, Box, Button, Flex } from '@mantine/core';

import { RootState, useAppDispatch } from '../store';
import { PreviewInputContainer } from '@/components/PreviewInputContainer';
import { ShareModal } from '@/components/ShareModal';
import { getCardAPI } from '@/feature/card/card.api';
import {
  updateArtwork,
  updateArtworkBackground,
  updateArtworkSnowFlake,
} from '@/feature/background/background.reducer';
import { ArtworkBackground } from '@/feature/background/background.type';
import { ArtworkSnowFlake } from '@prisma/client';
import { CardWithInfos } from '@/feature/card/card.type';
import { useDisclosure } from '@mantine/hooks';

const { PROD, VITE_CLIENT_DOMAIN_DEV, VITE_CLIENT_DOMAIN_PROD } = import.meta.env;

/**
 * Card
 * - 받는이가 받는 카드
 * - 보낸이가 카드를 보내고 난 후에도 볼 수 있음
 */
export default function Card() {
  // TODO: 로그인한 유저에게는 다른 화면 보여주면 좋을듯
  const loginState = useSelector((state: RootState) => state.userProfile);
  const { to, msg, from } = useSelector((state: RootState) => state.card);
  const dispatch = useAppDispatch();

  // TODO: 변수 명을 domain으로 하는게 좋을지, origin으로 하는게 좋을지, host로 하는게 좋을지 ..
  const domain = PROD ? VITE_CLIENT_DOMAIN_PROD : VITE_CLIENT_DOMAIN_DEV;
  const [isLoading, setIsLoading] = useState(true);
  const [isShare, { open, close }] = useDisclosure(false);

  const { cardId } = useParams();

  if (!cardId) {
    return (
      <Flex justify={'center'}>
        {/* 기기에 따라서 viewport 너비에 맞게 input의 너비가 조정이 되어야 한다. 현재는 모바일 전용 */}
        <Box
          style={(theme) => ({
            textAlign: 'center',
            maxWidth: `calc(${theme.breakpoints.sm} - (16px * 8))`,
            width: `${window.innerWidth - 16 * 4}px`,
          })}
        >
          {`올바른 주소를 입력하세요. ex) https://mindpiece.kr/card/happy-new-year`}
        </Box>
      </Flex>
    );
  }

  useEffect(() => {
    if (cardId) {
      dispatch(getCardAPI({ cardId })).then((res) => {
        // ? res.payload는 왜 unknown인가..
        const p = res.payload as CardWithInfos;
        const Artwork = p.Artwork;
        const ArtworkBackground = p.ArtworkBackground as unknown as ArtworkBackground;
        const ArtworkSnowFlake = p.ArtworkSnowFlake as ArtworkSnowFlake;
        dispatch(
          updateArtwork({
            Artwork,
          }),
        );
        dispatch(
          updateArtworkBackground({
            ArtworkBackground,
          }),
        );
        dispatch(
          updateArtworkSnowFlake({
            ArtworkSnowFlake,
          }),
        );
      });
      setIsLoading(false);
    } else {
      setIsLoading(true);
      // TODO: reducer에서 해결하는게 나을지도
    }
    if (loginState.isLogin) {
      open();
    }
  }, [dispatch]);

  return (
    <>
      <ShareModal
        isShare={isShare}
        setOpen={open}
        setClose={close}
        title={'작성한 카드를 소중한 사람에게 공유하세요.'}
        to={to}
        msg={msg}
        from={from}
        uuid={cardId}
      ></ShareModal>
      <>
        {isLoading ? null : (
          <Flex justify={'center'} direction={'column'} align={'center'}>
            <PreviewInputContainer to={to} msg={msg} from={from}></PreviewInputContainer>
            <Anchor href={domain}>
              <Button
                style={(theme) => ({
                  backgroundColor: '#fbffb0',
                  border: '1px solid #444444',
                  color: '#000000',
                  maxWidth: `calc(${theme.breakpoints.sm} - (16px * 8) / 2)`,
                  width: `${(window.innerWidth - 16 * 4) * (2 / 3)}px`,

                  ':active': {
                    backgroundColor: '#FCCB6B',
                  },

                  ':hover': {
                    backgroundColor: '#FCCB6B',
                  },
                })}
                mt={'3rem'}
                mb={'1rem'}
                radius={'md'}
              >
                나도 카드 만들기
              </Button>
            </Anchor>
          </Flex>
        )}
      </>
    </>
  );
}
