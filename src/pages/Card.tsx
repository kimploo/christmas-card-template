import { useContext, useEffect, useState } from 'react';
import { Footer } from '@components/Footer';
import { MainArtwork } from '@components/MainArtwork';
import { PreviewInputContainer } from '@components/PreviewInputContainer';
import { Anchor, Box, Button, Flex, Text } from '@mantine/core';
import { ShareModal } from '@components/ShareModal';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { LoginContext } from 'src/App';
import { urlMaker } from 'src/util/urlMaker';
import Snowfall from 'react-snowfall';
import { SnowfallContainer } from '@components/SnowfallContainer';

const { DEV, PROD, VITE_CLIENT_DOMAIN_DEV, VITE_CLIENT_DOMAIN_PROD } = import.meta.env;

interface CardInfo {
  artwork: string;
  to: string;
  msg: string;
  from: string;
}

export const Card = () => {
  const domain = PROD ? VITE_CLIENT_DOMAIN_PROD : VITE_CLIENT_DOMAIN_DEV;
  const { loginState } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    artwork: '',
    to: '',
    msg: '',
    from: '',
  });
  const { cardId } = useParams();

  const getCard = () => {
    axios
      .get(urlMaker(`card/${cardId}`).href, {
        withCredentials: true,
      })
      .then((res) => {
        setCardInfo(res.data);
        setIsLoading(false);
        console.log('data?', res.data);
      });
  };

  useEffect(() => {
    if (PROD) {
      getCard();
    } else {
      setCardInfo({
        artwork: 'Asset-100-1.png',
        to: 'To. 테스트입니다.',
        msg: '테스트 메시지 입니다.',
        from: 'From. 테스트입니다.',
      });
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <Flex bg={`linear-gradient(180deg, #F3F19D 80%, #FCCB6B 20%)`} justify={'center'} pt={'2rem'} pb={'1rem'}>
        {isLoading ? null : <MainArtwork src={domain + '/' + cardInfo.artwork}></MainArtwork>}
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
          <>
            {isLoading ? null : (
              <>
                <PreviewInputContainer to={cardInfo.to} msg={cardInfo.msg} from={cardInfo.from}></PreviewInputContainer>
                <Anchor href="https://card.teamhh.link">
                  <Button
                    color={'orange'}
                    sx={(theme) => ({
                      maxWidth: `${(theme.breakpoints.sm - 16 * 8) / 2}px`,
                    })}
                    mt={'2rem'}
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
        </Box>
      </Flex>
      <SnowfallContainer onOff={!isLoading}></SnowfallContainer>
    </>
  );
};
