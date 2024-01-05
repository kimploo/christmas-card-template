import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Flex, Image, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { CardInputContainer } from '@/components/CardInputContainer';
import { KakaoLogin } from '@/components/KakaoLogin';
import { RootState } from '../store';
import { BgInfo } from '@/types/bgInfo';
import { initialPostState, resetPostContent, updatePostContent } from '@/feature/post/post.reducer';
import {
  updateArtwork,
  updateArtworkBackground,
  updateArtworkSnowFlake,
} from '@/feature/background/background.reducer';
import { ArtworkBackground } from '@/feature/background/background.type';

export default function LandingPage() {
  const loginState = useSelector((state: RootState) => state.userProfile);
  const artworks = useSelector((state: RootState) => state.artwork);
  const edit = useSelector((state: RootState) => state.edit);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [to, setTo] = useState(edit.to);
  const [msg, setMsg] = useState(edit.msg);
  const [from, setFrom] = useState(edit.from);
  const [slideIdx, setIdx] = useState(0);
  const [bgIdx, setBgIdx] = useState(0);

  useEffect(() => {
    dispatch(
      updateArtwork({
        Artwork: artworks.artworkInfo[0],
      }),
    );
    dispatch(
      updateArtworkBackground({
        ArtworkBackground: artworks.artworkInfo[0]
          .ArtworkBackground[0] as unknown as ArtworkBackground,
      }),
    );
    dispatch(
      updateArtworkSnowFlake({
        ArtworkSnowFlake: artworks.artworkInfo[0].ArtworkSnowFlake[0],
      }),
    );
  }, []);

  const handlePreview = () => {
    dispatch(
      updatePostContent({
        to,
        msg,
        from,
        currentArtworkId: artworks.artworkInfo[slideIdx].id,
        currentArtworkBackgroundId: (
          artworks.artworkInfo[slideIdx].ArtworkBackground[bgIdx] as unknown as ArtworkBackground
        ).id,
        currentArtworkSnowFlakeId: artworks.artworkInfo[slideIdx].ArtworkSnowFlake[0].id,
      }),
    );
    navigate(`/preview`);
  };

  const handleSlideIndex = (idx: number) => {
    dispatch(
      updateArtwork({
        Artwork: artworks.artworkInfo[idx],
      }),
    );
    dispatch(
      updateArtworkBackground({
        ArtworkBackground: artworks.artworkInfo[idx]
          .ArtworkBackground[0] as unknown as ArtworkBackground,
      }),
    );
    dispatch(
      updateArtworkSnowFlake({
        ArtworkSnowFlake: artworks.artworkInfo[idx].ArtworkSnowFlake[0],
      }),
    );
    setIdx(idx);
  };

  const handleArtworkBackground = (artworkBackgroundId: number, newBgIdx: number) => {
    setBgIdx(newBgIdx);
    dispatch(
      updateArtworkBackground({
        ArtworkBackground: artworks.artworkInfo[slideIdx].ArtworkBackground[
          newBgIdx
        ] as unknown as ArtworkBackground,
      }),
    );
  };

  // const handleArtworkSnowFlake = (idx: number, sfIdx: number) => {
  //   const artworkSnowFlakeId = artworks.artworkInfo[artworkIdx].ArtworkSnowFlake[idx].id;
  //   dispatch(updateArtworkSnowFlakeId({ artworkSnowFlakeId }));
  //   setSfIdx(sfIdx);
  // };

  const handleReset = () => {
    setTo(initialPostState.to);
    setMsg(initialPostState.msg);
    setFrom(initialPostState.from);
    dispatch(resetPostContent());
  };

  return (
    <Flex direction={'column'}>
      <Flex justify={'center'}>
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
              `${loginState.nickname || '사용자'}님, 원하는 일러스트를 선택하세요.`
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
                initialSlide={slideIdx}
                onSlideChange={(index) => {
                  handleSlideIndex(index);
                }}
              >
                {artworks.artworkInfo.map((artwork, idx) => {
                  return (
                    <Carousel.Slide key={idx}>
                      <Image h={200} fit="contain" src={artwork.url}></Image>
                    </Carousel.Slide>
                  );
                })}
              </Carousel>
              <Flex justify={'center'} align={'center'} gap={4} pt={'lg'}>
                {artworks.artworkInfo[slideIdx]
                  ? artworks.artworkInfo[slideIdx].ArtworkBackground.map((info, idx) => {
                      const bgInfo = info.bgInfo as unknown as BgInfo;
                      const bg = `linear-gradient(180deg, ${bgInfo.colors[0]} 50%, ${bgInfo.colors[1]} 50%)`;

                      return (
                        <Button
                          key={'artworkBackground-' + info.id}
                          bg={bg}
                          w={20}
                          mx={'0.5rem'}
                          style={{
                            borderRadius: '50%',
                            borderColor: 'darkgray',
                          }}
                          onClick={() => handleArtworkBackground(info.id, idx)}
                        ></Button>
                      );
                    })
                  : null}
              </Flex>
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
