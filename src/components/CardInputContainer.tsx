import { Box, Flex, Textarea, TextInput } from '@mantine/core';
import classes from '@/components/css/InputPlaceholder.module.css';

interface Props {
  to: string;
  msg: string;
  from: string;
  setTo: React.Dispatch<React.SetStateAction<string>>;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  setFrom: React.Dispatch<React.SetStateAction<string>>;
}

export const CardInputContainer = ({ to, msg, from, setTo, setMsg, setFrom }: Props) => {
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
    <Flex mt={'sm'} justify={'center'}>
      <Box
        style={(theme) => ({
          textAlign: 'center',
          maxWidth: `calc(${theme.breakpoints.sm} - (16px * 8))`,
          width: `${window.innerWidth - 16 * 4}px`,
        })}
      >
        <TextInput
          classNames={{
            input: classes.input,
          }}
          size={'lg'}
          style={{
            borderBottom: '1px solid #444444',
          }}
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
          style={{
            borderBottom: '1px solid #444444',
          }}
          variant={'unstyled'}
          placeholder={`마음한장에 오신 것을 환영합니다. 소중한 사람에게 전할 메시지를 이곳에 적어보세요.
`}
          autosize
          value={msg}
          onChange={handleMsg}
        ></Textarea>
        <TextInput
          size={'lg'}
          classNames={{
            input: classes.input,
          }}
          style={{
            borderBottom: '1px solid #444444',
          }}
          variant={'unstyled'}
          placeholder="From. "
          value={from}
          onChange={handleFrom}
        ></TextInput>
      </Box>
    </Flex>
  );
};
