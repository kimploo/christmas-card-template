import { useEffect, useState } from 'react';
import { Footer } from '@components/Footer';
import { PreviewInputContainer } from '@components/PreviewInputContainer';
import { Anchor, Box, Button, Flex } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { SnowfallContainer } from '@components/SnowfallContainer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { getCardContent } from '@redux-state/cardContentSlice';
import { ShareModal } from '@components/ShareModal';

const { PROD, VITE_CLIENT_DOMAIN_DEV, VITE_CLIENT_DOMAIN_PROD } = import.meta.env;

/**
 * Card
 * - 받는이가 받는 카드
 * - 보낸이가 카드를 보내고 난 후에도 볼 수 있음
 */
export default function Card() {
  // TODO: 로그인한 유저에게는 다른 화면 보여주면 좋을듯
  const loginState = useSelector((state: RootState) => state.userProfile);
  const { artworks, index, to, msg, from } = useSelector((state: RootState) => state.cardContent);
  const dispatch = useDispatch<AppDispatch>();

  // TODO: 변수 명을 domain으로 하는게 좋을지, origin으로 하는게 좋을지, host로 하는게 좋을지 ..
  const domain = PROD ? VITE_CLIENT_DOMAIN_PROD : VITE_CLIENT_DOMAIN_DEV;
  const [isLoading, setIsLoading] = useState(true);
  const [isShare, setShare] = useState(false);

  const { cardId } = useParams();

  if (!cardId) {
    return (
      <Flex bg={`#FCCB6B`} justify={'center'}>
        {/* 기기에 따라서 viewport 너비에 맞게 input의 너비가 조정이 되어야 한다. 현재는 모바일 전용 */}
        <Box
          sx={(theme) => ({
            textAlign: 'center',
            maxWidth: `${theme.breakpoints.sm - 16 * 8}px`,
            width: `${window.innerWidth - 16 * 4}px`,
          })}
        >
          {`올바른 주소를 입력하세요. ex) https://card.teamhh.link/card/happy-new-year`}
        </Box>
      </Flex>
    );
  }

  const getCard = () => {
    if (cardId) {
      dispatch(getCardContent({ cardId }));
      setIsLoading(false);
    } else {
      setIsLoading(true);
      // TODO: reducer에서 해결하는게 나을지도
    }
  };

  useEffect(() => {
    getCard();
    setIsLoading(false);
    if (loginState.isLogin) {
      setShare(true);
    }
  }, [dispatch]);

  return (
    <>
      <ShareModal
        isShare={isShare}
        setShare={setShare}
        title={'작성한 카드를 소중한 사람에게 공유하세요.'}
        to={to}
        msg={msg}
        from={from}
        cardId={cardId}
        artwork={artworks[index]}
      ></ShareModal>
      <>
        {isLoading ? null : (
          <>
            <PreviewInputContainer to={to} msg={msg} from={from}></PreviewInputContainer>
            <Anchor href={domain}>
              <Button
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
                mt={'3rem'}
                mb={'1rem'}
                radius={'md'}
              >
                나도 카드 만들기
              </Button>
            </Anchor>
          </>
        )}
      </>
      <Footer></Footer>
      <SnowfallContainer onOff={!isLoading}></SnowfallContainer>
    </>
  );
}
