import { Box, createStyles, Textarea, TextInput } from '@mantine/core';

const useStyles = createStyles(() => ({
  input: {
    '::placeholder': {
      color: '#fbffb0',
    },
  },
}));

interface Props {
  to: string;
  msg: string;
  from: string;
  setTo: React.Dispatch<React.SetStateAction<string>>;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  setFrom: React.Dispatch<React.SetStateAction<string>>;
}

export const CardInputContainer = ({ to, msg, from, setTo, setMsg, setFrom }: Props) => {
  const { classes } = useStyles();
  const handleTo: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTo(event.target.value);
    return;
  };
  const handleMsg: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setMsg(event.target.value);
    return;
  };
  const handleFrom: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFrom(event.target.value);
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
          value={to}
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
          placeholder={`효디 작가의 모바일카드 생성기에 오신 것을 환영합니다. 소중한 사람에게 전할 메시지를 이곳에 적어보세요.
`}
          autosize
          value={msg}
          onChange={handleMsg}
        ></Textarea>
        <TextInput
          size={'lg'}
          sx={{
            borderBottom: '1px solid #444444',
          }}
          variant={'unstyled'}
          placeholder="From. "
          value={from}
          onChange={handleFrom}
        ></TextInput>
        {/* To. From. 남겨두기 */}
        {/* 폰트 컬러 바꾸기 color: '#3E3A39', */}
        {/* placeholder 중앙정렬 */}
      </Box>
    </>
  );
};
