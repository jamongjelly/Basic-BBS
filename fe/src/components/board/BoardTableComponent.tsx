import React, { useCallback, useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import BoardMenubar from 'src/components/board/BoardMenubar';
import BoardPagination from 'src/components/board/BoardPagination';
import BoardTable from 'src/components/board/BoardTable';
import SearchBox from 'src/components/board/SearchBox';
import FloatingButton from 'src/components/ui/buttons/FloatingButton';
import Selector from 'src/components/ui/Selector';
import { parseToNumber } from 'src/lib/utils/typeUtils';
import { Board, Pagination, PostItem, Subject } from 'src/models';
import { SearchType } from 'src/redux/modules/post';
import PostRouter from 'src/routes/PostRouter';
import styled from 'styled-components';

interface BoardTableComponentProps extends RouteComponentProps {
    boardName: string;
    columnNames: string[];
    currentBoard?: Board;
    subjects?: Subject[];
    posts: PostItem[];
    pagination: Pagination;
    searchType?: SearchType;
    keyword?: string;
    defaultSubjectId?: number;
    onEnterSearchInput: (
        event: React.KeyboardEvent<HTMLInputElement>,
        searchUrl: string
    ) => void;
}

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BoardTableHeader = styled.div`
    padding: 1rem;

    display: flex;
    justify-content: flex-end;

    & > * + * {
        margin-left: 1rem;
    }
`;

const BoardTableFooter = styled.div`
    width: 100%;
    margin-top: 3rem;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AddPostButton = styled(FloatingButton)`
    position: absolute;
    right: 1rem;
    a {
        width: 100%;
        height: 100%;
        padding: 0;

        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const ContentsSection = styled.div`
    width: 90%;
`;

const BoardTableComponent = ({
    boardName,
    columnNames,
    currentBoard,
    subjects,
    posts,
    pagination,
    searchType,
    keyword,
    defaultSubjectId,
    onEnterSearchInput,
    history,
    location,
}: BoardTableComponentProps) => {
    const [subjectId, setSubjectId] = useState<number | undefined>(defaultSubjectId);
    const [pageSize, setPageSize] = useState<number>(pagination.pageSize);

    const pageQuery = `pageNum=${pagination.pageNum}&pageSize=${pagination.pageSize}`;
    const searchQuery = `${searchType ? `&searchType=${searchType}` : ''}${
        keyword ? `&keyword=${keyword}` : ''
    }`;
    const subjectQuery = `${defaultSubjectId ? `&subjectId=${defaultSubjectId}` : ''}`;

    const handleChangeSubjectId = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            const locSubjectId = parseToNumber(event.target.value);
            setSubjectId(locSubjectId);
            history.push({
                pathname: location.pathname,
                search: `?pageSize=${pageSize}&subjectId=${locSubjectId}`,
            });
        },
        [history, pageSize, location]
    );

    const handleChangePageSize = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            const locPageSize = parseToNumber(event.target.value) || 10;
            setPageSize(locPageSize);

            const newPageNum = Math.ceil(
                ((pagination.pageNum - 1) * pagination.pageSize + 1) / locPageSize
            );
            history.push({
                pathname: location.pathname,
                search: `?pageNum=${newPageNum}&pageSize=${locPageSize}${searchQuery}${subjectQuery}`,
            });
        },
        [history, location, pagination, searchQuery, subjectQuery]
    );

    useEffect(() => {
        setSubjectId(defaultSubjectId);
    }, [defaultSubjectId]);

    useEffect(() => {
        setPageSize(pagination.pageSize);
    }, [pagination.pageSize]);

    return (
        <Section>
            <BoardMenubar board={currentBoard} />
            <PostRouter />
            <ContentsSection>
                <BoardTableHeader>
                    {boardName !== 'total' && (
                        <Selector value={subjectId} onChange={handleChangeSubjectId}>
                            <option value="">말머리 선택</option>
                            {subjects &&
                                subjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                        </Selector>
                    )}
                    <Selector value={pageSize} onChange={handleChangePageSize}>
                        <option value={10}>10개</option>
                        <option value={20}>20개</option>
                        <option value={50}>50개</option>
                        <option value={100}>100개</option>
                    </Selector>
                </BoardTableHeader>
                <BoardTable
                    columnNames={columnNames}
                    posts={posts}
                    path={boardName}
                    query={`?${pageQuery}${searchQuery}`}
                />
                <BoardTableFooter>
                    <BoardPagination
                        path={boardName}
                        pagination={pagination}
                        searchQuery={searchQuery}
                        subjectQuery={subjectQuery}
                    />
                    <AddPostButton square>
                        <Link
                            to={{
                                pathname: '/board/editor',
                                search: currentBoard && `?boardId=${currentBoard.id}`,
                                state: {
                                    from: location,
                                },
                            }}
                        >
                            <GoPlus />
                        </Link>
                    </AddPostButton>
                    <SearchBox
                        style={{ marginTop: '2rem' }}
                        path={boardName}
                        pageNum={pagination.pageNum}
                        pageSize={pagination.pageSize}
                        defaultSearchType={searchType}
                        defaultKeyword={keyword || ''}
                        onEnterSearchInput={onEnterSearchInput}
                    />
                </BoardTableFooter>
            </ContentsSection>
        </Section>
    );
};

export default withRouter(BoardTableComponent);
