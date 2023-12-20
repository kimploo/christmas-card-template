import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

import { Footer } from '@components/Footer';
import { PreviewInputContainer } from '@components/PreviewInputContainer';
import { Button, Flex, Text } from '@mantine/core';
import { SnowfallContainer } from '@components/SnowfallContainer';
import { createCardContent } from '@redux-state/cardContentSlice';

export default function Preview() {
  const loginState = useSelector((state: RootState) => state.userProfile);
  const { artworks, index, to, msg, from } = useSelector((state: RootState) => state.cardContent);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleCreateCard = () => {
    dispatch(createCardContent({ cardId: null, index, to, msg, from, artworks }))
      .then((res) => {
        // TODO: 타입 에러 해결
        const cardId = (res.payload as any).uuid;
        navigate(`/card/${cardId}`);
      })
      .catch((e) => console.error(e));
  };

  const handleGoBack = () => {
    // TODO: 뒤로 가도 카드 그림 유지 필요
    navigate(`/`);
  };

  return (
    <>
      <Text py={'1rem'} c={'#444444'}>
        {loginState.isLogin
          ? null
          : '로그인이 되지 않았습니다. 아래 버튼을 눌러 처음부터 다시 진행하세요.'}
      </Text>

      {loginState.isLogin ? (
        <>
          <PreviewInputContainer to={to} msg={msg} from={from}></PreviewInputContainer>
          <Flex justify={'center'} direction={'column'} align={'center'}>
            <Button
              style={(theme) => ({
                backgroundColor: '#fbffb0',
                border: '1px solid #444444',
                color: '#000000',
                maxWidth: `${(Number(theme.breakpoints.sm) - 16 * 8) / 2}px`,
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
              style={(theme) => ({
                backgroundColor: '#fbffb0',
                border: '1px solid #444444',
                color: '#000000',
                maxWidth: `${(Number(theme.breakpoints.sm) - 16 * 8) / 2}px`,
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
          style={(theme) => ({
            backgroundColor: '#fbffb0',
            border: '1px solid #444444',
            color: '#000000',
            maxWidth: `${(Number(theme.breakpoints.sm) - 16 * 8) / 2}px`,
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
    </>
  );
}
