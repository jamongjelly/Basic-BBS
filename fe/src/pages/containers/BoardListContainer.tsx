import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardList from 'src/components/board/BoardList';
import { RootState } from 'src/redux';
import { boardActions } from 'src/redux/modules/board';

const BoardListContainer = () => {
    const dispatch = useDispatch();
    const boards = useSelector((state: RootState) => state.board.boards);

    useEffect(() => {
        dispatch(boardActions.getBoardsAsync.request());
    }, []);

    if (!boards) return <div>로딩 중</div>;

    return <BoardList boards={boards} />;
};

export default BoardListContainer;
