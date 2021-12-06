import React from 'react';
import Avatar from 'src/components/ui/Avatar';
import { UserSummary } from 'src/models';
import styled, { css } from 'styled-components';
import styledCSS from 'src/lib/styles/styledCSS';

interface ProfileBoxProps {
    user?: UserSummary;
}

const Container = styled.div`
    padding-top: 5rem;

    ${styledCSS.flexCenter}
    flex-direction: column;
`;

const ProfileName = styled.div`
    padding: 2rem;
    ${({ theme: { size, fontWeight } }) => css`
        font-size: ${size.lg}rem;
        font-weight: ${fontWeight.light};
    `}
`;

const ProfileBox = ({ user, ...rest }: ProfileBoxProps) => {
    return (
        <Container {...rest}>
            <Avatar src={user?.imgUrl} size={10} />
            <ProfileName>{(user && user.nickname) || 'Guest'}</ProfileName>
        </Container>
    );
};

export default React.memo(ProfileBox);
