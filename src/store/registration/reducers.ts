import { RegistrationState, SystemActionTypes, UPDATE_SUBJECTS } from './types'

const initialState: RegistrationState = {
    subjects: []
};

export function registrationReducer(
    state = initialState,
    action: SystemActionTypes
): RegistrationState {
    switch (action.type) {
        case UPDATE_SUBJECTS: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}
