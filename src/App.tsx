import { Image, Box, Flex, TextInput, Textarea } from '@mantine/core';
import { IconBrandInstagram, IconMailOpened, IconShare } from '@tabler/icons';
import { useState } from 'react';

function App() {
  const [inputTo, setInputTo] = useState('To. ');
  const [inputFrom, setInputFrom] = useState('From. ');
  const handleTo: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputTo(event.target.value);
    return;
  };
  const handleFrom: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputFrom(event.target.value);
    return;
  };

  return (
    <>
      {/* 두 글자 만큼 여백 */}
      <Flex justify={'space-between'} direction={'column'} bg={'#FFF'}>
        <Flex bg={`linear-gradient(180deg, #E6E6E6 80%, #F6F3A5 20%)`} justify={'center'}>
          <Box
            px={'2rem'}
            sx={(theme) => ({
              maxWidth: theme.breakpoints.sm,
            })}
          >
            <Image src="https://team-hh.s3.ap-northeast-2.amazonaws.com/christmas-card-template/2022-hyodee-christmas-card.png"></Image>
          </Box>
        </Flex>
        {/* 위 사진과 비율 비슷하게 조정 */}
        <Flex bg={`#F6F3A5`} justify={'center'} pt={'1rem'}>
          {/* 기기에 따라서 viewport 너비에 맞게 input의 너비가 조정이 되어야 한다. 현재는 모바일 전용 */}
          <Box
            sx={(theme) => ({
              textAlign: 'center',
              maxWidth: theme.breakpoints.sm,
              minWidth: `${window.innerWidth - 16 * 4}px`,
            })}
          >
            {/* To. From. 남겨두기 */}
            {/* 폰트 컬러 바꾸기 color: '#3E3A39', */}
            {/* placeholder 중앙정렬 */}
            <TextInput
              size={'lg'}
              sx={{
                backgroundColor: '#F6F3A5',
                borderBottom: '1px solid #ced4da',
              }}
              variant={'unstyled'}
              placeholder="To. "
              value={inputTo}
              onChange={handleTo}
            ></TextInput>
            <Textarea
              size={'lg'}
              sx={{
                backgroundColor: '#F6F3A5',
                borderBottom: '1px solid #ced4da',
              }}
              variant={'unstyled'}
              placeholder={`효디 작가의 모바일 축하 카드 생성기에 오신 것을 환영합니다. 여러분이 원하는 메시지를 담은 모바일 축하 카드를 적어보세요.
`}
              autosize
            ></Textarea>
            <TextInput
              size={'lg'}
              sx={{
                fontColor: '#3E3A39',
                backgroundColor: '#F6F3A5',
                borderBottom: '1px solid #ced4da',
              }}
              variant={'unstyled'}
              placeholder="From. "
              value={inputFrom}
              onChange={handleFrom}
            ></TextInput>
            {/* 버튼 작동시키기 */}
            <Flex justify={'center'} gap={'1.5rem'} pt={'4rem'} pb={'2rem'}>
              <Box p={2}>
                <IconMailOpened strokeWidth={0.8} size={36} color={'#CED4DA'}></IconMailOpened>
              </Box>
              <Box p={2}>
                <IconShare strokeWidth={0.8} size={36} color={'#CED4DA'}></IconShare>
              </Box>
              <IconBrandInstagram strokeWidth={0.7} size={42} color={'#CED4DA'}></IconBrandInstagram>
              {/* 카톡 아이콘 따로 제작 필요 */}
              <Image width={44} src="https://team-hh.s3.ap-northeast-2.amazonaws.com/christmas-card-template/kakaotalk-logo-gray.svg"></Image>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default App;
