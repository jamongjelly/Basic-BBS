import React from 'react';
import Avatar from 'src/components/ui/Avatar';
import styled, { css } from 'styled-components';

interface UserIconProps extends UserIconStyleProps {
    avatar: string;
    nickname: string;
}

interface UserIconStyleProps {
    size: number;
    fontSize: number;
    bold?: boolean;
}

const Wrapper = styled.div<UserIconStyleProps>`
    display: flex;
    align-items: center;

    ${({ theme, size, fontSize, bold }) => css`
        font-size: ${fontSize}rem;
        ${bold && `font-weight: ${theme.fontWeight.bold};`}
        label {
            margin-left: ${size * 0.25}rem;
        }
    `}
`;

const UserIcon = ({ avatar, nickname, size, fontSize, bold }: UserIconProps) => {
    return (
        <Wrapper size={size} fontSize={fontSize} bold={bold}>
            <Avatar src={avatar} size={size} />
            <label>{nickname}</label>
        </Wrapper>
    );
};

UserIcon.defaultProps = {
    size: 3,
    fontSize: 1.4,
};

export default React.memo(UserIcon);
