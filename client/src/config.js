const isProd = process.env.NODE_ENV === 'production';

const CONFIG = {
  API_ENDPOINT: isProd ? "https://audalai.herokuapp.com/" : "http://audalai.test",
};

export default CONFIG;
