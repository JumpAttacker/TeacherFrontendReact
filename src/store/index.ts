import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import {systemReducer} from "./system/reducers";
import {registrationReducer} from "./registration/reducers";
// import { chatReducer } from "./chat/reducers";

const rootReducer = combineReducers({
    system: systemReducer,
    registration: registrationReducer
    // chat: chatReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middleware = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middleware);

    return createStore(
        rootReducer,
        composeWithDevTools(middleWareEnhancer)
    );
}
