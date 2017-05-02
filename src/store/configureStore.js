import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


export default function configureStore(initialState) {
    const logger = createLogger();
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk, logger)),
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
