import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { MainArtwork } from '@components/MainArtwork';

export default function LandingPage() {
  // ?index=3
  const [searchParams] = useSearchParams();
  const loginState = useSelector((state: RootState) => state.userProfile);
  const cardContent = useSelector((state: RootState) => state.cardContent);
  const { artworks, index } = cardContent;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newIndex = Number(searchParams.get('index')) && index;
  const [localIndex, setLocalIndex] = useState(newIndex);

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
      })
    );
    navigate(`/preview`);
  };

  const handleSlideIndex = (idx: number) => {
    dispatch(
      updateIndex({
        index: idx,
      })
    );
    // setLocalIndex(idx);
  };

  const handleReset = () => {
    setTo(initialCardContentState.to);
    setMsg(initialCardContentState.msg);
    setFrom(initialCardContentState.from);
    dispatch(resetCardContent());
  };

  return (
    <Flex direction={'column'}>
      {/* TODO: 아트웤을 여기에 넣는게 좋을지, 레이아웃에 넣는게 좋을지 고민 */}
      {/* <Flex
        bg={`linear-gradient(180deg, #F3F19D 80%, #FCCB6B 20%)`}
        justify={'center'}
        pt={'2rem'}
        pb={'1rem'}
      >
        <MainArtwork></MainArtwork>
      </Flex> */}

      <Flex bg={`#FCCB6B`} justify={'center'}>
        {/* 기기에 따라서 viewport 너비에 맞게 input의 너비가 조정이 되어야 한다. 현재는 모바일 전용 */}
        <Box
          style={(theme) => ({
            textAlign: 'center',
            maxWidth: `${Number(theme.breakpoints.sm) - 16 * 8}px`,
            width: `${window.innerWidth - 16 * 4}px`,
          })}
        >
          <Text py={'1rem'} c={'#444444'}>
            {loginState.isLogin ? (
              `${loginState.nickname}님, 원하는 카드를 선택하세요.`
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
                onSlideChange={(index) => {
                  handleSlideIndex(index);
                }}
              >
                {artworks?.map((src, idx) => {
                  return (
                    <Carousel.Slide key={idx}>
                      <Image src={src}></Image>
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
                    maxWidth: `${(Number(theme.breakpoints.sm) - 16 * 8) / 2}px`,
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
                    maxWidth: `${(Number(theme.breakpoints.sm) - 16 * 8) / 2}px`,
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
