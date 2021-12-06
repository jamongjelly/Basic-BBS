import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import App from 'src/App';
import store, { customHistory } from 'src/redux/store';
import { ConnectedRouter } from 'connected-react-router';

ReactDOM.render(
    <ReduxProvider store={store}>
        <ConnectedRouter history={customHistory}>
            <App />
        </ConnectedRouter>
    </ReduxProvider>,
    document.getElementById('root')
);
