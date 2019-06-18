const isProd = process.env.NODE_ENV === 'production';

const CONFIG = {
  ENV: isProd ? "production" : "development",
  API_ENDPOINT: isProd ? "https://audalai.herokuapp.com/" : "http://audalai.test",
};

export default CONFIG;
