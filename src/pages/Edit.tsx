import { TextInput, Textarea, Button } from '@mantine/core';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const { VITE_SERVER_URI } = import.meta.env;

axios.defaults.withCredentials = true;

export const Edit = () => {
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

  useEffect(() => {
    axios.post(VITE_SERVER_URI + '/user').then((res) => {
      console.log(res.data);
    });
  }, []);

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
      <Button>모바일 축하 카드 만들기</Button>
    </>
  );
};
