export const urlMaker = (pathname: string) => {
  const { VITE_SERVER_URI_PROD, VITE_SERVER_URI_DEV, DEV } = import.meta.env;
  const origin = DEV ? VITE_SERVER_URI_DEV : VITE_SERVER_URI_PROD;
  const url = new URL(origin);
  url.pathname = pathname;

  return url;
};
