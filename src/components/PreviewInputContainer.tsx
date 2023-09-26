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

  // const [_to] = useState(to);
  // const [_msg] = useState(msg);
  // const [_from] = useState(from);

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
          value={to}
          readOnly
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
          autosize
          value={msg}
          readOnly
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
          value={from}
          readOnly
        ></TextInput>
      </Box>
    </>
  );
};
