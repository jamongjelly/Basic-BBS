import React from 'react';
import styled, { css } from 'styled-components';
import googleLogo from 'src/assets/images/google-logo.png';
import facebookLogo from 'src/assets/images/facebook-logo.png';
import githubLogo from 'src/assets/images/github-logo.png';
import naverLogo from 'src/assets/images/naver-logo.png';
import kakaoLogo from 'src/assets/images/kakao-logo.png';
import {
    FACEBOOK_AUTH_URL,
    GITHUB_AUTH_URL,
    GOOGLE_AUTH_URL,
    KAKAO_AUTH_URL,
    NAVER_AUTH_URL,
} from 'src/constants/oauth2';
import { AuthMode } from 'src/redux/modules/auth';

interface SocialLoginProps {
    mode: AuthMode;
}

const Wrapper = styled.div``;

const buttonSize = 7;

const LinkButton = styled.a<{ bgColor?: string }>`
    width: ${buttonSize}rem;
    height: ${buttonSize}rem;
    padding: 1rem;
    border-radius: ${buttonSize / 4.5}rem;

    font-size: 1.6rem;
    font-weight: 400;

    img {
        width: 100%;
        height: 100%;
        margin-right: 1rem;
        object-fit: cover;
    }

    ${({ theme, bgColor }) => css`
        box-shadow: 0 0 0.5rem ${theme.shadow.level2};
        ${bgColor && `background-color: ${bgColor};`}
    `}

    &:hover {
        filter: brightness(90%);
    }
`;

const TyphoGraphy = styled.div`
    ${({ theme }) => css`
        margin-bottom: ${theme.unit * 6}rem;
        color: ${theme.color.subText};
        font-size: ${theme.size.md}rem;
        font-weight: ${theme.fontWeight.bold};
    `}
`;

const ButtonBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SocialLogin = ({ mode }: SocialLoginProps) => {
    const socialAuthMetaInfo = [
        {
            provider: 'Google',
            url: GOOGLE_AUTH_URL,
            logo: googleLogo,
            bgColor: '#fff',
        },
        {
            provider: 'Facebook',
            url: FACEBOOK_AUTH_URL,
            logo: facebookLogo,
            bgColor: '#3a559f',
        },
        {
            provider: 'Github',
            url: GITHUB_AUTH_URL,
            logo: githubLogo,
            bgColor: '#fff',
        },
        {
            provider: 'Naver',
            url: NAVER_AUTH_URL,
            logo: naverLogo,
            bgColor: '#16c900',
        },
        {
            provider: 'Kakao',
            url: KAKAO_AUTH_URL,
            logo: kakaoLogo,
            bgColor: '#fddc3f',
        },
    ];

    const modeText = mode === 'LOGIN' ? '로그인' : '회원가입';

    return (
        <Wrapper>
            <TyphoGraphy>소셜 아이디로 {modeText}</TyphoGraphy>

            <ButtonBox>
                {socialAuthMetaInfo &&
                    socialAuthMetaInfo.map((item) => (
                        <LinkButton
                            key={item.provider}
                            href={item.url}
                            bgColor={item.bgColor}
                        >
                            <img src={item.logo} alt={item.provider} />
                        </LinkButton>
                    ))}
            </ButtonBox>
        </Wrapper>
    );
};

export default React.memo(SocialLogin);
