import { SystemState, SystemActionTypes, UPDATE_SESSION } from './types'

const initialState: SystemState = {
    loggedIn: false,
    session: '',
    userName: 'empty',
    message: '',
    isLoading: false
};

export function systemReducer(
    state = initialState,
    action: SystemActionTypes
): SystemState {
    switch (action.type) {
        case UPDATE_SESSION: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}
