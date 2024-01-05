import { Flex } from '@mantine/core';
import { MainArtwork } from './components/MainArtwork';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { SnowfallContainer } from './components/SnowfallContainer';
import { ToastContainer } from 'react-toastify';
import { Debug } from './components/Debug';
import { RootState } from './store';
import { useSelector } from 'react-redux';
const { DEV } = import.meta.env;

export default function Layout() {
  const background = useSelector((state: RootState) => state.background);
  const bgInfo = background.ArtworkBackground.bgInfo;
  let firstBG;
  let secondBG;

  if (!bgInfo) {
    firstBG = `linear-gradient(180deg, #F3F19D 80%, #FCCB6B 20%)`;
    secondBG = '#FCCB6B';
  } else {
    firstBG = bgInfo.cssValue;
    secondBG = bgInfo.colors[1];
  }

  return (
    <Flex justify={'flex-start'} h={'100vh'} direction={'column'} bg={secondBG}>
      <Flex
        bg={firstBG || `linear-gradient(180deg, #F3F19D 80%, #FCCB6B 20%)`}
        justify={'center'}
        pt={'2rem'}
        pb={'1rem'}
      >
        <MainArtwork></MainArtwork>
      </Flex>
      <Flex bg={secondBG} justify={'center'} direction={'column'}>
        {/* 기기에 따라서 viewport 너비에 맞게 input의 너비가 조정이 되어야 한다. 현재는 모바일 전용 */}
        <Flex bg={secondBG} justify={'center'} direction={'column'}>
          <Outlet />
          <Footer></Footer>
        </Flex>
        <SnowfallContainer onOff={true}></SnowfallContainer>
      </Flex>
      <ToastContainer />
      {DEV && <Debug />}
    </Flex>
  );
}
