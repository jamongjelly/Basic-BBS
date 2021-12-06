import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from 'src/redux';
import { boardActions } from 'src/redux/modules/board';
import { postActions } from 'src/redux/modules/post';
import qs from 'query-string';
import { isSearchType, parseToNumber } from 'src/lib/utils/typeUtils';
import BoardTableComponent from 'src/components/board/BoardTableComponent';

interface MatchParams {
    boardName?: string;
}

const BoardTableContainer = ({
    match,
    location,
    history,
}: RouteComponentProps<MatchParams>) => {
    const dispatch = useDispatch();
    const { boards, currentBoard, subjects, posts, pagination } = useSelector(
        (state: RootState) => ({
            boards: state.board.boards,
            currentBoard: state.board.currentBoard,
            subjects: state.board.subjects,
            posts: state.post.posts,
            pagination: state.post.pagination,
        })
    );

    const boardName = match.params.boardName || 'total';

    const query = qs.parse(location.search);
    const pageNum = parseToNumber(query.pageNum?.toString()) || 1;
    const pageSize = parseToNumber(query.pageSize?.toString()) || 10;
    const { searchType, keyword } = query;
    const subjectId = parseToNumber(query.subjectId?.toString());

    const onEnterSearchInput = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>, searchUrl: string) => {
            if (event.key === 'Enter') {
                history.push(searchUrl);
            }
        },
        [history]
    );

    useEffect(() => {
        if (boards && boardName) {
            dispatch(boardActions.setCurrentBoardByPath(boardName));
        }

        return () => {
            dispatch(boardActions.initCurrentBoard());
        };
    }, [boards, boardName]);

    useEffect(() => {
        if (!currentBoard && boardName === 'total') {
            if (typeof keyword === 'string' && isSearchType(searchType)) {
                dispatch(
                    postActions.searchPostsAsync.request({
                        pageNum: pageNum,
                        pageSize: pageSize,
                        searchType: searchType,
                        keyword: keyword,
                    })
                );
            } else {
                dispatch(
                    postActions.getAllPostsAsync.request({
                        pageNum: pageNum,
                        pageSize: pageSize,
                    })
                );
            }

            return;
        }

        if (!currentBoard) return;

        if (subjectId) {
            dispatch(
                postActions.searchPostsBySubjectIdAsync.request({
                    subjectId,
                    pageNum: pageNum,
                    pageSize: pageSize,
                })
            );

            return;
        }

        if (typeof keyword === 'string' && isSearchType(searchType)) {
            dispatch(
                postActions.searchPostsAsync.request({
                    boardId: currentBoard.id,
                    pageNum: pageNum,
                    pageSize: pageSize,
                    searchType: searchType,
                    keyword: keyword,
                })
            );
        } else {
            dispatch(
                postActions.getPostsByBoardIdAsync.request({
                    boardId: currentBoard.id,
                    pageNum: pageNum,
                    pageSize: pageSize,
                })
            );
        }
        // dispatch(boardActions.getSubjectsByBoardIdAsync.request(currentBoard.id));
    }, [currentBoard, pageNum, pageSize, searchType, keyword, subjectId]);

    useEffect(() => {
        if (currentBoard) {
            dispatch(boardActions.getSubjectsByBoardIdAsync.request(currentBoard.id));
        }
    }, [currentBoard]);

    if (!posts || !boards) return <div>로딩 중...</div>;

    const columnNames = [
        boardName === 'total' ? '게시판' : '말머리',
        '제목',
        '작성자',
        '작성일',
        '조회',
        '추천',
    ];

    return (
        <BoardTableComponent
            boardName={boardName}
            columnNames={columnNames}
            currentBoard={currentBoard}
            subjects={subjects}
            posts={posts}
            pagination={pagination}
            searchType={isSearchType(searchType) ? searchType : undefined}
            keyword={keyword?.toString()}
            defaultSubjectId={subjectId}
            onEnterSearchInput={onEnterSearchInput}
        />
    );
};

export default withRouter(BoardTableContainer);
