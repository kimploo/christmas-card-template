import { Box, createStyles, Textarea, TextInput } from '@mantine/core';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  input: {
    '::placeholder': {
      color: '#fbffb0',
    },
  },
}));

export const CardInputContainer = () => {
  const { classes } = useStyles();
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
            borderBottom: '1px solid #444444',
          })}
          variant={'unstyled'}
          placeholder="To. "
          value={inputTo}
          onChange={handleTo}
        ></TextInput>
        <Textarea
          classNames={{
            input: classes.input,
          }}
          size={'lg'}
          sx={{
            borderBottom: '1px solid #444444',
          }}
          variant={'unstyled'}
          placeholder={`효디 작가의 모바일 축하 카드 생성기에 오신 것을 환영합니다. 여러분이 원하는 메시지를 담은 모바일 축하 카드를 적어보세요.
`}
          autosize
        ></Textarea>
        <TextInput
          size={'lg'}
          sx={{
            borderBottom: '1px solid #444444',
          }}
          variant={'unstyled'}
          placeholder="From. "
          value={inputFrom}
          onChange={handleFrom}
        ></TextInput>
        {/* To. From. 남겨두기 */}
        {/* 폰트 컬러 바꾸기 color: '#3E3A39', */}
        {/* placeholder 중앙정렬 */}
      </Box>
    </>
  );
};
