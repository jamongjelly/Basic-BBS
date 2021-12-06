import {
  authorizationHeader,
  multipartHeader,
  userClient,
} from "src/lib/api/client";
import { PageRequest, PostDetail } from "src/models";
import {
  WritePostPayload,
  SearchPostsPayload,
  GetPostsByBoardIdPayload,
  AddPostAttachmentPayload,
  DeletePostPayload,
  UpdatePostPayload,
  SearchPostsBySubjectIdPayload,
} from "src/redux/modules/post";

export async function writePost(postRequest: WritePostPayload) {
  const response = await userClient.post<PostDetail>(
    "/posts",
    postRequest,
    authorizationHeader()
  );
  return response.data;
}

export async function readPost(postId: number) {
  const response = await userClient.get<PostDetail>(`/posts/${postId}`, {
    ...authorizationHeader(),
    withCredentials: true,
  });
  return response.data;
}

export async function updatePost({ id, ...postRequest }: UpdatePostPayload) {
  const response = await userClient.put<PostDetail>(
    `/posts/${id}`,
    postRequest,
    authorizationHeader()
  );

  
  return response.data;
}

export async function deletePost({ postId }: DeletePostPayload) {
  await userClient.delete(`/posts/${postId}`, authorizationHeader());
  return postId;
}

export async function getAllPosts({ pageNum, pageSize }: PageRequest) {
  const response = await userClient.get(
    `/posts?pageNum=${pageNum || ""}&pageSize=${pageSize || ""}`,
    authorizationHeader()
  );
  return response.data;
}

export async function getPostsByBoardId({
  boardId,
  pageNum,
  pageSize,
}: GetPostsByBoardIdPayload) {
  const response = await userClient.get(
    `/posts/board/${boardId}?pageNum=${pageNum || ""}&pageSize=${
      pageSize || ""
    }`
  );
  return response.data;
}

export async function searchPosts({
  boardId,
  pageNum,
  pageSize,
  searchType,
  keyword,
}: SearchPostsPayload) {
  const response = await userClient.get(
    `/posts/search?boardId=${boardId || ""}&pageNum=${pageNum || ""}&pageSize=${
      pageSize || ""
    }&searchType=${searchType || ""}&keyword=${keyword}`
  );
  return response.data;
}

export async function searchPostsBySubjectId({
  subjectId,
  pageNum,
  pageSize,
}: SearchPostsBySubjectIdPayload) {
  const response = await userClient.get(
    `/posts/search/subjects/${subjectId}?pageNum=${pageNum || ""}&pageSize=${
      pageSize || ""
    }`
  );
  return response.data;
}

export async function getCurrentUserPosts(pageNum: number) {
  const response = await userClient.get(
    `/posts/currentUser?pageNum=${pageNum || ""}`,
    authorizationHeader()
  );
  return response.data;
}

export async function getUserLikedPosts(pageNum: number) {
  const response = await userClient.get(
    `/posts/like?pageNum=${pageNum || ""}`,
    authorizationHeader()
  );
  return response.data;
}

export async function addPostAttachment({
  postId,
  formData,
}: AddPostAttachmentPayload) {
  const response = await userClient.post(
    `/posts/${postId}/attachments`,
    formData,
    multipartHeader
  );
  return response.data;
}

export async function getPostAttachments(postId: number) {
  const response = await userClient.get(`/posts/${postId}/attachments`);
  return response.data;
}

export async function removePostAttachment(attachmentId: number) {
  const response = await userClient.delete(
    `/posts/attachments/${attachmentId}`,
    authorizationHeader()
  );
  return response.data;
}

export async function postLike(postId: number) {
  await userClient.post(`/posts/${postId}/like`, null, authorizationHeader());
  return postId;
}

export async function postUnlike(postId: number) {
  await userClient.delete(`/posts/${postId}/like`, authorizationHeader());
  return postId;
}
