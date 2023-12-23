import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  initialState as initialCardContentState,
  resetCardContent,
  updateCardContent,
  updateIndex,
} from '@redux-state/cardContentSlice';

import { Box, Button, Flex, Image, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { CardInputContainer } from '@components/CardInputContainer';
import { KakaoLogin } from '@components/KakaoLogin';
import { RootState } from 'src/store';

export default function LandingPage() {
  const loginState = useSelector((state: RootState) => state.userProfile);
  const cardContent = useSelector((state: RootState) => state.cardContent);
  const { artworks, index } = cardContent;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [localIndex, setLocalIndex] = useState(index);

  const [to, setTo] = useState(cardContent.to);
  const [msg, setMsg] = useState(cardContent.msg);
  const [from, setFrom] = useState(cardContent.from);

  const handlePreview = () => {
    dispatch(
      updateCardContent({
        index: localIndex,
        to,
        msg,
        from,
      }),
    );
    navigate(`/preview`);
  };

  const handleSlideIndex = (idx: number) => {
    dispatch(
      updateIndex({
        index: idx,
      }),
    );
    setLocalIndex(idx);
  };

  const handleReset = () => {
    setTo(initialCardContentState.to);
    setMsg(initialCardContentState.msg);
    setFrom(initialCardContentState.from);
    dispatch(resetCardContent());
  };

  return (
    <Flex direction={'column'}>
      <Flex bg={`#FCCB6B`} justify={'center'}>
        {/* 기기에 따라서 viewport 너비에 맞게 input의 너비가 조정이 되어야 한다. 현재는 모바일 전용 */}
        <Box
          style={(theme) => {
            return {
              textAlign: 'center',
              maxWidth: `calc(${theme.breakpoints.sm} - (16px * 8))`,
              width: `${window.innerWidth - 16 * 4}px`,
            };
          }}
        >
          <Text py={'1rem'} c={'#444444'}>
            {loginState.isLogin ? (
              `${loginState.nickname || '사용자'}님, 원하는 카드를 선택하세요.`
            ) : (
              <>
                로그인하고 <br></br>
                효디 작가의 모바일카드를 만들어보세요.
              </>
            )}
          </Text>

          {loginState.isLogin ? (
            <>
              <Carousel
                slideSize="33%"
                height={200}
                slideGap="md"
                controlSize={32}
                withIndicators
                initialSlide={localIndex}
                onSlideChange={(index) => {
                  handleSlideIndex(index);
                }}
              >
                {artworks?.map((src, idx) => {
                  return (
                    <Carousel.Slide key={idx}>
                      <Image h={200} fit="contain" src={src}></Image>
                    </Carousel.Slide>
                  );
                })}
              </Carousel>
              <CardInputContainer
                to={to}
                msg={msg}
                from={from}
                setTo={setTo}
                setMsg={setMsg}
                setFrom={setFrom}
              />
              <Flex justify={'center'} direction={'column'} align={'center'}>
                <Button
                  mt={'3rem'}
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
                  radius={'md'}
                  onClick={handlePreview}
                >
                  카드 미리보기
                </Button>
                <Button
                  mt={'1rem'}
                  mb={'1rem'}
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
                  radius={'md'}
                  onClick={handleReset}
                >
                  처음부터 다시 작성하기
                </Button>
              </Flex>
            </>
          ) : (
            <KakaoLogin></KakaoLogin>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
