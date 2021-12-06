import { userClient } from 'src/lib/api/client';

export async function getSubjectsByBoardId(boardId: number) {
    const response = await userClient.get(`/subjects/board/${boardId}`);
    return response.data;
}
