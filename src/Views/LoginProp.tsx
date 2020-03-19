import {History} from "history";
import {SystemState} from "../store/system/types";
import { updateSession } from "../store/system/actions";
import {RegistrationState} from "../store/registration/types";

export default interface LoginProp {
    history: History
    updateSession: typeof updateSession;
    system: SystemState;
    registration: RegistrationState;
    thunkLoadSubjects: any;
    thunkSendMessage: any;
}
