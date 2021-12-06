import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface AuthTemplateProps {
    children: ReactNode;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    & > * + * {
        margin-top: 2rem;
    }
`;

const AuthTemplate = ({ children }: AuthTemplateProps) => {
    return <Wrapper>{children}</Wrapper>;
};

export default AuthTemplate;
