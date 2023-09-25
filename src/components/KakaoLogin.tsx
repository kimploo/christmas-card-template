import { Center, Box, Image, Button } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { authServiceLogin } from 'src/redux-state/loginSlice';
import { AppDispatch } from 'src/store';
import { urlMaker } from 'src/util/urlMaker';

export const KakaoLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const redirectUri = urlMaker('auth').href;

  const handleLogin = () => {
    dispatch(authServiceLogin());
    Kakao.Auth.authorize({
      redirectUri,
    });
  };

  return (
    <Center>
      <Box
        onClick={handleLogin}
        sx={() => ({
          width: 240,
          padding: '2rem 1rem',
        })}
      >
        <Image src="kakao_login_large_narrow.png"></Image>
      </Box>
    </Center>
  );
};
