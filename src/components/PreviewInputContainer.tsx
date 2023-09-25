import { Box, createStyles, Textarea, TextInput } from '@mantine/core';

const textareaStyles = createStyles((theme) => ({
  wrapper: {
    opacity: 1,
    color: '#000000',
  },
  input: {
    '::placeholder': {
      color: '#fbffb0',
    },
    ':disabled': {
      opacity: 1,
      color: '#000000',
    },
  },
}));

const inputStyles = createStyles((theme) => ({
  wrapper: {
    opacity: 1,
    color: '#000000',
  },
  input: {
    ':disabled': {
      color: '#000000',
      opacity: 1,
    },
  },
}));

interface Props {
  to: string;
  msg: string;
  from: string;
}

export const PreviewInputContainer = ({ to, msg, from }: Props) => {
  const { classes: textareaClasses } = textareaStyles();
  const { classes: inputClasses } = inputStyles();

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
          classNames={{
            input: inputClasses.input,
          }}
          sx={() => ({
            borderBottom: '1px solid #444444',
          })}
          variant={'unstyled'}
          placeholder="To. "
          defaultValue={to}
          disabled
        ></TextInput>
        <Textarea
          classNames={{
            input: textareaClasses.input,
          }}
          size={'lg'}
          sx={{
            borderBottom: '1px solid #444444',
          }}
          variant={'unstyled'}
          placeholder={`효디 작가의 모바일 축하 카드 생성기에 오신 것을 환영합니다. 여러분이 원하는 메시지를 담은 모바일 축하 카드를 적어보세요.
`}
          autosize
          disabled
          defaultValue={msg}
        ></Textarea>
        <TextInput
          size={'lg'}
          classNames={{
            input: textareaClasses.input,
          }}
          sx={{
            borderBottom: '1px solid #444444',
          }}
          variant={'unstyled'}
          placeholder="From. "
          disabled
          defaultValue={from}
        ></TextInput>
        {/* To. From. 남겨두기 */}
        {/* 폰트 컬러 바꾸기 color: '#3E3A39', */}
        {/* placeholder 중앙정렬 */}
      </Box>
    </>
  );
};
