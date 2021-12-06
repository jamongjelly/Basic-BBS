import React from 'react';
import UserActivityPagination from 'src/components/user/UserActivityPagination';
import UserActivityTabBar from 'src/components/user/UserActivityTabBar';
import UserActivityTabTable from 'src/components/user/UserActivityTabTable';
import { Pagination, UserPostItem, UserReply } from 'src/models';
import styled from 'styled-components';

interface UserActivityTableProps {
    data?: UserPostItem[] | UserReply[];
    type: string;
    pagination?: Pagination;
    onClickInitData: () => void;
    onClickPageButton: (page: number) => void;
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;

    & > div {
        width: 80%;
    }
    & > div > * + * {
        margin-top: 2rem;
    }
`;

const UserActivityFooter = styled.div`
    display: flex;
    justify-content: center;
`;

const UserActivityTab = ({
    data,
    type,
    pagination,
    onClickInitData,
    onClickPageButton,
}: UserActivityTableProps) => {
    return (
        <Wrapper>
            <div>
                <UserActivityTabBar type={type} onClickInitData={onClickInitData} />
                <UserActivityTabTable type={type} data={data} />
                <UserActivityFooter>
                    {pagination && (
                        <UserActivityPagination
                            pageNum={pagination.pageNum}
                            totalPages={pagination.totalPages}
                            onClickPageButton={onClickPageButton}
                        />
                    )}
                </UserActivityFooter>
            </div>
        </Wrapper>
    );
};

export default UserActivityTab;
