import { Center, Box, Image } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { authServiceLogin } from '@redux-state/loginSlice';
import { AppDispatch } from '../store';
import { urlMaker } from '../util/urlMaker';

const { VITE_KAKAO_REST_API_KEY } = import.meta.env;

export const KakaoLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const redirectUri = urlMaker('auth').href;

  const handleLogin = () => {
    const controller = new AbortController();
    dispatch(authServiceLogin(controller)).then(() => {
      const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${VITE_KAKAO_REST_API_KEY}&redirect_uri=${redirectUri}&response_type=code`;
      window.location.href = kakaoURL;
      return controller.abort();
    });
  };

  return (
    <Center>
      <Box
        onClick={handleLogin}
        style={{
          width: 240,
          padding: '2rem 1rem',
        }}
      >
        <Image src="kakao_login_large_narrow.png"></Image>
      </Box>
    </Center>
  );
};
