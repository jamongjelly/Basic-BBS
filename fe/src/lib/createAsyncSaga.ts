import { push, replace } from 'connected-react-router';
import { call, put } from 'redux-saga/effects';
import { REDIRECT_URL } from 'src/constants';
import { AsyncActionCreatorBuilder, PayloadAction } from 'typesafe-actions';

type PromiseCreatorFunction<P, T> = ((payload: P) => Promise<T>) | (() => Promise<T>);

function isPayloadAction<P>(action: any): action is PayloadAction<string, P> {
    return action.payload !== undefined;
}

export default function createAsyncSaga<T1, P1, T2, P2, T3, P3>(
    asyncActionCreator: AsyncActionCreatorBuilder<
        [T1, [P1, undefined]],
        [T2, [P2, undefined]],
        [T3, [P3, undefined]]
    >,
    promiseCreator: PromiseCreatorFunction<P1, P2>,
    callbackFunc?: Function
) {
    return function* (action: ReturnType<typeof asyncActionCreator.request>) {
        try {
            const response: P2 = isPayloadAction<P1>(action)
                ? yield call(promiseCreator, action.payload)
                : yield call(promiseCreator);
            yield put(asyncActionCreator.success(response));
            if (callbackFunc) {
                yield callbackFunc();
            }
        } catch (e) {
            yield put(asyncActionCreator.failure(e));
        }
    };
}

export function createRouteAsyncSaga<T1, P1, T2, P2, T3, P3>(
    asyncActionCreator: AsyncActionCreatorBuilder<
        [T1, [P1, undefined]],
        [T2, [P2, undefined]],
        [T3, [P3, undefined]]
    >,
    promiseCreator: PromiseCreatorFunction<P1, P2>,
    type: 'PUSH' | 'REPLACE' = 'PUSH',
    callbackFunc?: Function
) {
    return function* (action: ReturnType<typeof asyncActionCreator.request>) {
        try {
            const response: P2 = isPayloadAction<P1>(action)
                ? yield call(promiseCreator, action.payload)
                : yield call(promiseCreator);
            yield put(asyncActionCreator.success(response));

            if (callbackFunc) {
                yield callbackFunc();
            }

            const path = localStorage.getItem(REDIRECT_URL) || '/';
            yield put(type === 'PUSH' ? push(path) : replace(path));
        } catch (e) {
            yield put(asyncActionCreator.failure(e));
        }
    };
}
