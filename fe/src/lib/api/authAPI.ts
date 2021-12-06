import { authorizationHeader, userClient } from 'src/lib/api/client';
import { JoinForm, LoginForm } from 'src/models';
import { JoinResponse, LoginResponse, UnregisterPayload } from 'src/redux/modules/auth';

export async function join(joinForm: JoinForm) {
    const response = await userClient.post<JoinResponse>('/auth/join', joinForm);
    return response.data;
}

export async function login(loginForm: LoginForm) {
    const response = await userClient.post<LoginResponse>('/auth/login', loginForm);
    return response.data;
}

export async function unregister(unregisterRequest: UnregisterPayload) {
    const response = await userClient.patch<string>(
        '/auth/unregister',
        unregisterRequest,
        authorizationHeader()
    );
    return response.data;
}
