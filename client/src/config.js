const isProd = process.env.environment === 'production';

const CONFIG = {
  GS_KEYFILE: './secrets/audalai-client/secrets/audalai-a7248f759112.json',
  API_ENDPOINT: isProd ? "http://audalai.com" : "http://audalai.test",
};

export default CONFIG;
