import { Center, Box, Image } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { authServiceLogin } from '@redux-state/loginSlice';
import { AppDispatch } from '../store';
import { urlMaker } from '../util/urlMaker';

export const KakaoLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const redirectUri = urlMaker('auth').href;

  const handleLogin = () => {
    const controller = new AbortController();
    dispatch(authServiceLogin(controller)).then(() => {
      return controller.abort();
    });
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
