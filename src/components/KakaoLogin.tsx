import { Center, Box, Image, Button } from '@mantine/core';
import { useState } from 'react';

interface Props {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const KakaoLogin = ({ isLogin, setIsLogin }: Props) => {
  const { VITE_SERVER_URI, MODE } = import.meta.env;

  const [kakaoToken, setToken] = useState('');
  const getCookie = (name: string) => {
    const parts = document.cookie.split(name + '=');
    if (parts.length === 2) {
      return parts[1].split(';')[0];
    }
    return '';
  };

  const redirectUri = MODE === 'development' ? VITE_SERVER_URI + '/auth' : MODE === 'production' ? VITE_SERVER_URI + '/auth' : '';

  const handleLogin = () => {
    Kakao.Auth.authorize({
      redirectUri,
    });
  };

  const displayToken = () => {
    const token = getCookie('refresh_jwt');
    setToken(token);

    Kakao.Auth.setAccessToken(token);
    Kakao.Auth.getStatusInfo((res) => {
      if (res.status === 'connected') {
        console.log(Kakao.Auth.getAccessToken());
        // document.getElementById('token-result').innerText = 'login success, token: ' + Kakao.Auth.getAccessToken();
      }
    });
  };

  return (
    <Center>
      <Box
        onClick={handleLogin}
        sx={(theme) => ({
          width: 240,
          padding: '1rem',
        })}
      >
        <Image src="kakao_login_large_narrow.png"></Image>
      </Box>
      <Button onClick={displayToken}>check</Button>
    </Center>
  );
};
