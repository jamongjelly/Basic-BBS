import { UserSummary } from 'src/models';
import { authorizationHeader, multipartHeader, userClient } from 'src/lib/api/client';
import { UserAvatarPayload } from 'src/redux/modules/user';

export async function getCurrentUser() {
    const response = await userClient.get<UserSummary>(
        '/users/currentUser',
        authorizationHeader()
    );
    return response.data;
}

export async function checkEmail(email: string) {
    const response = await userClient.get(`/users/checkEmail?email=${email}`);
    return response.data;
}

export async function checkNickname(nickname: string) {
    const response = await userClient.get(`/users/checkNickname?nickname=${nickname}`);
    return response.data;
}

export async function changeUserNickname(nickname: string) {
    const response = await userClient.patch(
        '/users/changeNickname',
        { nickname },
        authorizationHeader()
    );
    return response.data;
}

export async function changeUserProfileMsg(profileMsg: string) {
    const response = await userClient.patch(
        '/users/changeProfileMsg',
        { profileMsg },
        authorizationHeader()
    );
    return response.data;
}

export async function changeProfileImg({ formData }: UserAvatarPayload) {
    const response = await userClient.patch(
        '/users/changeProfileImg',
        formData,
        multipartHeader
    );
    return response.data;
}
