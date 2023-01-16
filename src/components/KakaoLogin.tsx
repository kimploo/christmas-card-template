import { Center, Box, Image, Button } from '@mantine/core';

export const KakaoLogin = () => {
  const { VITE_SERVER_URI, MODE, DEV, PROD } = import.meta.env;
  const redirectUri = DEV ? 'http://localhost:3000/auth' : PROD ? VITE_SERVER_URI + '/auth' : '';
  console.log(redirectUri);

  const handleLogin = () => {
    Kakao.Auth.authorize({
      redirectUri,
    });
  };

  const displayToken = () => {
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
