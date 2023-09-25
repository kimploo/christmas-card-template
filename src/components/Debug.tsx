import { Button, Flex } from '@mantine/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from 'src/store';
import { authServiceLogout } from '../redux-state/loginSlice';

const { DEV } = import.meta.env;
const { VITE_KAKAO_JAVASCRIPT_API_KEY } = import.meta.env;

export const Debug = () => {
  useEffect(() => {
    try {
      Kakao.init(VITE_KAKAO_JAVASCRIPT_API_KEY);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const navigate = useNavigate();
  const loginState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch<AppDispatch>();

  const moveTo: React.MouseEventHandler<HTMLButtonElement> | undefined = (event) => {
    const path = event.currentTarget.textContent;
    navigate(path ?? '/');
  };

  const handleLogin = () => {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/auth',
    });
  };

  const handleServiceLogout = () => {
    dispatch(authServiceLogout());
  };

  const handleKakaoId = () => {
    console.log('click?');
    Kakao.API.request({
      url: '/v2/user/me',
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const requestUserInfo = () => {
    console.log('requestUserInfo');

    Kakao.API.request({
      url: '/v2/user/me',
    })
      .then(function (res) {
        console.log(JSON.stringify(res));
      })
      .catch(function (err) {
        console.log('failed to request user information: ' + JSON.stringify(err));
      });
  };

  if (DEV) {
    return (
      <>
        <Flex direction={'row'} justify={'center'} gap={10}>
          <Button onClick={moveTo}>/</Button>
          <Button onClick={moveTo}>preview</Button>
          <Button onClick={moveTo}>card</Button>
          <Button onClick={moveTo}>my-cards</Button>
          <Button onClick={moveTo}>edit</Button>
          <Button onClick={handleLogin}>login</Button>
          <Button onClick={handleServiceLogout}>logout</Button>
          <Button onClick={requestUserInfo}>kakao userInfo</Button>
          <Button onClick={handleKakaoId}>kakaoId</Button>
        </Flex>
      </>
    );
  }

  return <></>;
};
