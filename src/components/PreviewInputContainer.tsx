import { Box, Flex, Textarea, TextInput } from '@mantine/core';
import previewStyle from '@/components/css/PreviewInput.module.css';

interface Props {
  to: string;
  msg: string;
  from: string;
}

export const PreviewInputContainer = ({ to, msg, from }: Props) => {
  return (
    <Flex justify={'center'}>
      <Box
        style={(theme) => ({
          textAlign: 'center',
          maxWidth: `calc(${theme.breakpoints.sm} - (16px * 8))`,
          width: `${window.innerWidth - 16 * 4}px`,
        })}
      >
        <TextInput
          size={'lg'}
          classNames={{
            wrapper: previewStyle.wrapper,
            input: previewStyle.input,
          }}
          style={() => ({
            borderBottom: '1px solid #444444',
          })}
          variant={'unstyled'}
          value={to}
          readOnly
        ></TextInput>
        <Textarea
          classNames={{
            wrapper: previewStyle.wrapper,
            input: previewStyle.textarea,
          }}
          size={'lg'}
          style={{
            borderBottom: '1px solid #444444',
          }}
          variant={'unstyled'}
          autosize
          value={msg}
          readOnly
        ></Textarea>
        <TextInput
          size={'lg'}
          classNames={{
            wrapper: previewStyle.wrapper,
            input: previewStyle.input,
          }}
          style={{
            borderBottom: '1px solid #444444',
          }}
          variant={'unstyled'}
          value={from}
          readOnly
        ></TextInput>
      </Box>
    </Flex>
  );
};
