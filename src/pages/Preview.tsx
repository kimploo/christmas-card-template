import { useContext, useEffect, useState } from 'react';
import { Footer } from '@components/Footer';
import { MainArtwork } from '@components/MainArtwork';
import { PreviewInputContainer } from '@components/PreviewInputContainer';
import { Box, Button, Flex, Text } from '@mantine/core';
import { ShareModal } from '@components/ShareModal';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginContext } from 'src/App';
import { urlMaker } from 'src/util/urlMaker';

export const Preview = () => {
  const { loginState } = useContext(LoginContext);
  const [opened, setOpened] = useState(false);
  const location = useLocation();
  const { to, msg, from, artwork } = location.state;
  const navigate = useNavigate();

  const createCard = () => {
    axios
      .post(
        urlMaker('card').href,
        {
          to,
          msg,
          from,
          artwork,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <ShareModal opened={opened} setOpened={setOpened} title={'작성한 카드를 소중한 사람에게 공유하세요.'}></ShareModal>
      <Flex bg={`linear-gradient(180deg, #F3F19D 80%, #FCCB6B 20%)`} justify={'center'} pt={'2rem'} pb={'1rem'}>
        <MainArtwork src={artwork}></MainArtwork>
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
          <Text py={'1rem'} color={'#444444'}>
            {loginState.isLogin
              ? `${loginState.nickname}님, 작성한 내용을 확인하고 소중한 사람에게 공유하세요.`
              : '로그인이 되지 않았습니다. 아래 버튼을 눌러 처음부터 다시 진행하세요.'}
          </Text>

          {loginState.isLogin ? (
            <>
              <PreviewInputContainer to={to} msg={msg} from={from}></PreviewInputContainer>
              <Button
                color={'orange'}
                sx={(theme) => ({
                  maxWidth: `${(theme.breakpoints.sm - 16 * 8) / 2}px`,
                })}
                mt={'2rem'}
                mb={'1rem'}
                radius={'md'}
                onClick={() => {
                  setOpened(true);
                  createCard();
                }}
              >
                공유하기
              </Button>
            </>
          ) : (
            <Button
              color={'orange'}
              sx={(theme) => ({
                maxWidth: `${(theme.breakpoints.sm - 16 * 8) / 2}px`,
              })}
              mt={'2rem'}
              mb={'1rem'}
              radius={'md'}
              onClick={() => navigate('/')}
            >
              처음으로 돌아가기
            </Button>
          )}
          <Footer></Footer>
        </Box>
      </Flex>
    </>
  );
};
