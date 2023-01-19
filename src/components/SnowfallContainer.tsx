import Snowfall from 'react-snowfall';
const { DEV, VITE_CLIENT_DOMAIN_DEV, VITE_CLIENT_DOMAIN_PROD } = import.meta.env;

interface Props {
  onOff: boolean;
}

const snowflakes = ['white', 'yellow', 'red', 'orange'].map((color) => {
  const img = document.createElement('img');
  img.src = DEV ? `${VITE_CLIENT_DOMAIN_DEV}/snowflakes/${color}-snowflake-2x.png` : `${VITE_CLIENT_DOMAIN_PROD}/snowflakes/${color}-snowflake-2x.png`;
  return img;
});

export const SnowfallContainer = ({ onOff }: Props) => {
  if (!onOff) return null;

  return (
    <Snowfall
      radius={[3, 7]}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
      }}
      images={snowflakes}
    />
  );
};
