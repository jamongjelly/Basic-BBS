import React from 'react';
import { useSelector } from 'react-redux';
import PostListItem from 'src/components/board/PostListItem';
import { PostItem } from 'src/models';
import { RootState } from 'src/redux';
import styled, { css } from 'styled-components';

interface BoardTableProps {
    columnNames: string[];
    posts: PostItem[];
    path: string;
    query?: string;
}

interface TableStyleProps {
    ratios: number[];
}

const Table = styled.table<TableStyleProps>`
    width: 100%;
    border-collapse: collapse;

    table-layout: fixed;

    ${({ theme: { size } }) => css`
        font-size: ${size.sm}rem;
    `}
`;

const cellStyles = css`
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
`;

const TableHead = styled.thead`
    tr {
        height: 4.5rem;
        th {
            ${cellStyles}
        }
    }

    ${({ theme: { color, fontWeight, shadow } }) => css`
        color: ${color.text};
        font-weight: ${fontWeight.bold};
        box-shadow: 0 0 0.5rem ${shadow.level2};
    `}
`;

const TableBody = styled.tbody`
    tr > td {
        ${cellStyles}
    }
    &:before {
        display: block;
        content: '.';
        color: transparent;
        line-height: 0.5rem;
    }

    ${({ theme }) => css`
        & > tr + tr {
            border-top: 0.1rem solid ${theme.color.subMenu};
        }
    `}
`;

const EmptyBoard = styled.tr`
    text-align: center;
    vertical-align: middle;
    td {
        height: 10rem;
    }
`;

const BoardTable = ({ columnNames, posts, path, query }: BoardTableProps) => {
    const currentPost = useSelector((state: RootState) => state.post.currentPost);
    const columnRatios = [12, 50, 15, 17, 8, 8];
    return (
        <Table ratios={columnRatios}>
            <colgroup>
                {columnRatios.map((ratio, idx) => (
                    <col key={idx} style={{ width: `${ratio}%` }} />
                ))}
            </colgroup>
            <TableHead>
                <tr>
                    {columnNames.map((name) => (
                        <th key={name}>{name}</th>
                    ))}
                </tr>
            </TableHead>
            <TableBody>
                {posts && posts.length !== 0 ? (
                    posts.map((post) => (
                        <PostListItem
                            key={post.id}
                            post={post}
                            active={post.id === currentPost?.id}
                            path={path}
                            query={query}
                        />
                    ))
                ) : (
                    <EmptyBoard>
                        <td colSpan={columnRatios.length}>게시물을 작성해 주세요</td>
                    </EmptyBoard>
                )}
            </TableBody>
        </Table>
    );
};

export default BoardTable;
