import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

import { PreviewInputContainer } from '@/components/PreviewInputContainer';
import { Button, Flex, Text } from '@mantine/core';

import { createCardAPI } from '@/feature/card/card.api';

export default function Preview() {
  const loginState = useSelector((state: RootState) => state.userProfile);
  const { to, msg, from } = useSelector((state: RootState) => state.card);
  const { artworkId, artworkBackgroundId, artworkSnowFlakeId } = useSelector(
    (state: RootState) => state.artwork,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // ? ID만 보내도 Create 가능하게 해도 되는 것인지 햇갈림
  const handleCreateCard = () => {
    dispatch(
      createCardAPI({ from, to, msg, artworkId, artworkBackgroundId, artworkSnowFlakeId }),
    ).then((res) => {
      // TODO: 이 코드 타입 지정을 잘 하고 싶다...
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const uuid = (res.payload as any).uuid;
      navigate(`/card/${uuid}`);
    });
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
                maxWidth: `calc(${theme.breakpoints.sm} - (16px * 8) / 2)`,
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
          onClick={() => navigate('/')}
        >
          처음으로 돌아가기
        </Button>
      )}
    </>
  );
}
