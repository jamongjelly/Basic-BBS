import { applyMiddleware, createStore } from 'redux';
import rootReducer, { rootSaga } from 'src/redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const customHistory = createBrowserHistory();

const sagaMiddleWare = createSagaMiddleware({
    context: {
        history: customHistory,
    },
});

const middlewares = [sagaMiddleWare, routerMiddleware(customHistory)];

const store = createStore(
    rootReducer(customHistory),
    composeWithDevTools(applyMiddleware(...middlewares))
);
sagaMiddleWare.run(rootSaga);

export default store;
