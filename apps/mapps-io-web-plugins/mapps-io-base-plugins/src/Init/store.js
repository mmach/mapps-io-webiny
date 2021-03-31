import { applyMiddleware, compose, createStore,combineReducers } from "redux";
import { createLogger } from "redux-logger";

import thunk from "redux-thunk";
let finalCreateStore = null;

if (window.env && window.env.DEBUG != 0) {
    finalCreateStore = compose(
        applyMiddleware(
            createLogger(),

            thunk
        )
        //persistState()
    )(createStore);
} else {
    finalCreateStore = compose(
        applyMiddleware(thunk)
        //persistState()
    )(createStore);
}

export default function configureStore(reducers) {
    return finalCreateStore(
        combineReducers(reducers),
        //   initialState
        window.env.DEBUG != 0
            ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            : undefined
    );
}
