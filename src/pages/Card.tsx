import { TextInput, Textarea } from '@mantine/core';
import { useState } from 'react';

export const Card = () => {
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
      <TextInput
        size={'lg'}
        sx={() => ({
          backgroundColor: '#F6F3A5',
          borderBottom: '1px solid #ced4da',
        })}
        variant={'unstyled'}
        placeholder="To. "
        value={inputTo}
        onChange={handleTo}
        disabled
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
        placeholder="From. "
        value={inputFrom}
        onChange={handleFrom}
        disabled
      ></TextInput>
    </>
  );
};
