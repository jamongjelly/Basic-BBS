import React from 'react';
import styled, { css } from 'styled-components';
import defaultUserImg from 'src/assets/images/defaultUserImg.png';

interface AvatarProps extends AvatarSize {
    src?: string;
}

interface AvatarSize {
    size?: number;
}

const StyledImg = styled.img<AvatarSize>`
    border-radius: 50%;
    object-fit: cover;

    ${({ size }) => css`
        width: ${size}rem;
        height: ${size}rem;
    `}
`;

const Avatar = ({ src, size, ...rest }: AvatarProps) => {
    if (!src) {
        src = defaultUserImg;
    }

    return <StyledImg src={src} alt="avatar" size={size} {...rest} />;
};

Avatar.defaultProps = {
    size: 3,
};

export default React.memo(Avatar);
