
import { RegistrationState, UPDATE_SUBJECTS, SystemActionTypes } from './types'

export function updateSubjects(newSubjects: RegistrationState): SystemActionTypes {
    return {
        type: UPDATE_SUBJECTS,
        payload: newSubjects
    }
}
