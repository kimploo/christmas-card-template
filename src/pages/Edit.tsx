import axios from 'axios';
import { useEffect } from 'react';

const { VITE_SERVER_URI } = import.meta.env;

axios.defaults.withCredentials = true;

export const Edit = () => {
  useEffect(() => {
    axios.post(VITE_SERVER_URI + '/user').then((res) => {
      console.log(res.data);
    });
  }, []);

  return <></>;
};
