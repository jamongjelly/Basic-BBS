import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import BoardPageTemplate from 'src/components/board/BoardPageTemplate';
import { BoardListContainer } from 'src/pages/containers';
import BoardRouter from 'src/routes/BoardRouter';
import styled from 'styled-components';

export interface BoardPageProps extends RouteComponentProps {}

const Header = styled.header`
    margin-bottom: 2rem;
`;

const BoardPage = ({ match, location, history }: BoardPageProps) => {
    return (
        <BoardPageTemplate>
            <Header>
                <BoardListContainer />
            </Header>
            <BoardRouter match={match} location={location} history={history} />
        </BoardPageTemplate>
    );
};

export default BoardPage;
