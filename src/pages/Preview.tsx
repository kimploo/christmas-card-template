import { useState } from 'react';
import { Footer } from '@components/Footer';
import { MainArtwork } from '@components/MainArtwork';
import { PreviewInputContainer } from '@components/PreviewInputContainer';
import { Box, Button, Flex, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { SnowfallContainer } from '@components/SnowfallContainer';
import { AppDispatch, RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { createCardContent, resetCardContent } from '@redux-state/cardContentSlice';

export const Preview = () => {
  const loginState = useSelector((state: RootState) => state.userProfile);
  const { cardId, artwork, to, msg, from } = useSelector((state: RootState) => state.cardContent);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleCreateCard = () => {
    dispatch(createCardContent({ cardId: null, artwork, to, msg, from }))
      .then((res) => {
        // TODO: 타입 에러 해결
        const cardId = (res.payload as any).uuid;
        navigate(`/card/${cardId}`);
      })
      .catch((e) => console.error(e));
  };

  const handleGoBack = () => {
    dispatch(resetCardContent({}));
    navigate('/');
  };

  return (
    <>
      <Flex
        bg={`linear-gradient(180deg, #F3F19D 80%, #FCCB6B 20%)`}
        justify={'center'}
        pt={'2rem'}
        pb={'1rem'}
      >
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
              ? null
              : '로그인이 되지 않았습니다. 아래 버튼을 눌러 처음부터 다시 진행하세요.'}
          </Text>

          {loginState.isLogin ? (
            <>
              <PreviewInputContainer to={to} msg={msg} from={from}></PreviewInputContainer>
              <Flex justify={'center'} direction={'column'} align={'center'}>
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
                  onClick={() => {
                    handleCreateCard();
                  }}
                >
                  이대로 공유하기 💌
                </Button>
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
                  mb={'1rem'}
                  radius={'md'}
                  onClick={() => {
                    handleGoBack();
                  }}
                >
                  돌아가서 수정하기 ✍🏻
                </Button>
              </Flex>
            </>
          ) : (
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
              onClick={() => navigate('/')}
            >
              처음으로 돌아가기
            </Button>
          )}
          <Footer></Footer>
        </Box>
      </Flex>
      <SnowfallContainer onOff={true}></SnowfallContainer>
    </>
  );
};
