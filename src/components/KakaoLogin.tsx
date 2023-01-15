import { Center, Box, Image, Button } from '@mantine/core';
import axios from 'axios';
import { useContext, useState } from 'react';
import { KakaoLoginContext } from 'src/main';

export const KakaoLogin = () => {
  const { VITE_SERVER_URI, MODE, DEV, PROD } = import.meta.env;
  const [kakaoToken, setToken] = useState('');

  const loginInfo = useContext(KakaoLoginContext);

  const getCookie = (name: string) => {
    const parts = document.cookie.split(name + '=');
    if (parts.length === 2) {
      return parts[1].split(';')[0];
    }
    return '';
  };

  const redirectUri = DEV ? 'http://localhost:3000/auth' : PROD ? VITE_SERVER_URI + '/auth' : '';
  console.log(redirectUri);

  const handleLogin = () => {
    // axios.get(redirectUri);
    Kakao.Auth.authorize({
      redirectUri,
    });
  };

  const displayToken = () => {
    console.log('here');
    Kakao.Auth.getStatusInfo((res) => {
      console.log(res);
    });
  };

  return (
    <Center>
      <Box
        onClick={handleLogin}
        sx={(theme) => ({
          width: 240,
          padding: '2rem 1rem',
        })}
      >
        <Image src="kakao_login_large_narrow.png"></Image>
      </Box>
      {DEV ? <Button onClick={displayToken}>토큰 확인</Button> : null}
    </Center>
  );
};
