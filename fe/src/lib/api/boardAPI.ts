import { userClient } from 'src/lib/api/client';
import { Board } from 'src/models';

export async function getBoard(boardId: number) {
    const response = await userClient.get<Board>(`/boards/${boardId}`);
    return response.data;
}

export async function getBoards() {
    const response = await userClient.get<Board[]>('/boards');
    return response.data;
}

export async function getBoardByPath(path: string) {
    const response = await userClient.get<Board>(`/boards/${path}`);
    return response.data;
}
