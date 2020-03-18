import { systemReducer } from './system/reducers'
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    system: systemReducer,
});

export type RootState = ReturnType<typeof rootReducer>
