import {
    JoinForm,
    LocationFromState,
    LoginForm,
    UserPostItem,
    UserReply,
} from 'src/models';
import { SearchType } from 'src/redux/modules/post';

export function isSearchType(searchType: any): searchType is SearchType {
    return (
        searchType === 't' ||
        searchType === 'w' ||
        searchType === 'c' ||
        searchType === 'tc' ||
        searchType === undefined
    );
}

export function convertStringToSearchType(value: string) {
    return isSearchType(value) ? value : '';
}

export function parseToNumber(value: string | null | undefined) {
    return value ? parseInt(value) : undefined;
}

export function isJoinForm(form: LoginForm | JoinForm): form is JoinForm {
    return (form as JoinForm).nickname !== undefined;
}

export function isUserPostItem(
    data: UserPostItem[] | UserReply[]
): data is UserPostItem[] {
    return (data as UserPostItem[])[0].title !== undefined;
}

export function isLocationFromState(state: unknown): state is LocationFromState {
    return (state as LocationFromState).from !== undefined;
}
