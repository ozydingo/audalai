const isProd = process.env.NODE_ENV === 'production';

const CONFIG = {
  API_ENDPOINT: isProd ? "http://audalai.com" : "http://audalai.test",
};

export default CONFIG;
