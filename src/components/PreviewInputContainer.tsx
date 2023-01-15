import { Box, Textarea, TextInput } from '@mantine/core';

interface Props {
  to: string | undefined;
  content: string | undefined;
  from: string | undefined;
}

export const PreviewInputContainer = ({ to, content, from }: Props) => {
  const inputTo = to ?? 'To. ';
  const inputFrom = from ?? 'From. ';
  const inputContent = content ?? '모바일 축하 카드 기본 텍스트입니다.';

  return (
    <>
      <Box
        sx={(theme) => ({
          textAlign: 'center',
          maxWidth: `${theme.breakpoints.sm - 16 * 8}px`,
          width: `${window.innerWidth - 16 * 4}px`,
        })}
      >
        <TextInput
          size={'lg'}
          sx={() => ({
            backgroundColor: '#F6F3A5',
            borderBottom: '1px solid #ced4da',
          })}
          variant={'unstyled'}
          value={inputTo}
          disabled
        ></TextInput>
        <Textarea
          size={'lg'}
          sx={{
            backgroundColor: '#F6F3A5',
            borderBottom: '1px solid #ced4da',
          }}
          variant={'unstyled'}
          value={inputContent}
          autosize
          disabled
        ></Textarea>
        <TextInput
          size={'lg'}
          sx={{
            fontColor: '#3E3A39',
            backgroundColor: '#F6F3A5',
            borderBottom: '1px solid #ced4da',
          }}
          variant={'unstyled'}
          value={inputFrom}
          disabled
        ></TextInput>
        {/* To. From. 남겨두기 */}
        {/* 폰트 컬러 바꾸기 color: '#3E3A39', */}
        {/* placeholder 중앙정렬 */}
      </Box>
    </>
  );
};
