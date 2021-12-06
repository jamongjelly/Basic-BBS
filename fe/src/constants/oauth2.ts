import { USER_API_BASE_URL } from 'src/constants';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';

const oauth2UrlMaker = (provider: string) =>
    `${USER_API_BASE_URL}/oauth2/authorize/${provider}?redirect_uri=${OAUTH2_REDIRECT_URI}`;

export const GOOGLE_AUTH_URL = oauth2UrlMaker('google');
export const FACEBOOK_AUTH_URL = oauth2UrlMaker('facebook');
export const GITHUB_AUTH_URL = oauth2UrlMaker('github');
export const NAVER_AUTH_URL = oauth2UrlMaker('naver');
export const KAKAO_AUTH_URL = oauth2UrlMaker('kakao');
export const KAKAO_UNLINK_URL = 'https://kapi.kakao.com/v1/user/unlink';
