import React from 'react';
import { isUserPostItem } from 'src/lib/utils/typeUtils';
import { UserPostItem, UserReply } from 'src/models';
import styled, { css } from 'styled-components';
import UserActivityPostItem from 'src/components/user/UserActivityPostItem';
import UserActivityReplyItem from 'src/components/user/UserActivityReplyItem';

interface UserActivityTabTable {
    type: string;
    data?: UserPostItem[] | UserReply[];
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    ${({ theme }) => css`
        padding: ${theme.unit * 2}rem ${theme.unit * 5}rem;
        box-shadow: 0 0 2rem ${theme.shadow.level1};
        font-size: ${theme.size.sm}rem;
    `}
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0 1rem;

    th {
        height: 4rem;
    }

    td {
        height: 5rem;
    }

    th,
    td {
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
    }

    ${({ theme }) => css`
        tr + tr {
            border-top: 0.1rem solid ${theme.color.subMenu};
        }
    `}
`;

const TableBody = styled.tbody``;

const UserActivityTabTable = ({ type, data }: UserActivityTabTable) => {
    return (
        <Wrapper>
            <Table>
                {data && data.length !== 0 ? (
                    isUserPostItem(data) ? (
                        <>
                            <colgroup>
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '70%' }} />
                                <col style={{ width: '15%' }} />
                            </colgroup>
                            <TableBody>
                                {data &&
                                    data.map((post) => (
                                        <UserActivityPostItem
                                            key={post.id}
                                            type={type}
                                            post={post}
                                        />
                                    ))}
                            </TableBody>
                        </>
                    ) : (
                        <TableBody>
                            {data &&
                                data.map((reply) => (
                                    <UserActivityReplyItem key={reply.id} reply={reply} />
                                ))}
                        </TableBody>
                    )
                ) : (
                    <TableBody>
                        <tr>
                            <td>활동 기록이 없습니다</td>
                        </tr>
                    </TableBody>
                )}
            </Table>
        </Wrapper>
    );
};

export default React.memo(UserActivityTabTable);
