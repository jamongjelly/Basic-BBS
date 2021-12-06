import { authorizationHeader, userClient } from 'src/lib/api/client';
import { Reply } from 'src/models';
import { UpdateReplyPayload, WriteReplyPayload } from 'src/redux/modules/reply';

export async function writeReply(replyRequest: WriteReplyPayload) {
    const response = await userClient.post(
        '/replies',
        replyRequest,
        authorizationHeader()
    );
    return response.data;
}

export async function getRepliesByPostId(postId: number) {
    const response = await userClient.get<Reply[]>(`/replies/post/${postId}`);
    return response.data;
}

export async function getCurrentUserReplies(pageNum: number) {
    const response = await userClient.get(
        `/replies/currentUser?pageNum=${pageNum}`,
        authorizationHeader()
    );
    return response.data;
}

export async function updateReply(replyRequest: UpdateReplyPayload) {
    const response = await userClient.put(
        `/replies/${replyRequest.id}`,
        replyRequest,
        authorizationHeader()
    );
    return response.data;
}

export async function deleteReply(replyId: number) {
    const response = await userClient.delete(
        `/replies/${replyId}`,
        authorizationHeader()
    );
    return response.data;
}
