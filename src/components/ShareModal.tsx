import { Box, Flex, Image, Modal } from '@mantine/core';
import { IconBrandInstagram, IconMailOpened, IconShare } from '@tabler/icons';

interface Props {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

export const ShareModal = ({ opened, setOpened, title }: Props) => {
  return (
    <>
      <Modal centered opened={opened} onClose={() => setOpened(false)} title={title}>
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
      </Modal>
    </>
  );
};
