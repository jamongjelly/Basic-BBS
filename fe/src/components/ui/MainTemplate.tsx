import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface MainTemplateProps {
    children: ReactNode;
}

const StyledMain = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const MainTemplate = ({ children, ...rest }: MainTemplateProps) => {
    return <StyledMain {...rest}>{children}</StyledMain>;
};

export default MainTemplate;
