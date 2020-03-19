export interface RegistrationState {
    subjects: []
}

export const UPDATE_SUBJECTS = 'UPDATE_SUBJECTS';

interface UpdateRegistrationAction {
    type: typeof UPDATE_SUBJECTS
    payload: RegistrationState
}

export type SystemActionTypes = UpdateRegistrationAction
