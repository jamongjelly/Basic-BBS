import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import styled, { css } from 'styled-components';

interface PostLikeBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    like: boolean;
    onClick: () => void;
}

const heartIconSize = 1.7;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    ${({ theme }) => css`
        border: 0.1rem solid ${theme.color.subMenu};
        padding: ${theme.unit * 4}rem ${theme.unit * 3}rem;
        font-size: ${theme.size.sm}rem;

        svg {
            width: ${heartIconSize}rem;
            height: ${heartIconSize}rem;
            margin-right: ${theme.unit}rem;
        }
    `}
`;

const PostLikeBox = ({ like, onClick, ...rest }: PostLikeBoxProps) => {
    return (
        <Wrapper onClick={onClick} {...rest}>
            {like ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
            좋아요
        </Wrapper>
    );
};

export default PostLikeBox;
