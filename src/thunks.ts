import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {updateSession} from "./store/system/actions";
import {updateSubjects} from "./store/registration/actions";
import {AppState} from "./store";
import axios from "axios";

export const thunkSendMessage = (
    message: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    console.log(message);
    const asyncResp = await exampleAPI();
    // dispatch(
    //     updateSession({
    //         loggedIn: true,
    //         userName: asyncResp,
    //         session: message,
    //         message: 'message'
    //     })
    // );
};

export const thunkLogin = (
    email: string,
    password: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    try {
        dispatch(
            updateSession({
                loggedIn: false,
                userName: '',
                session: '',
                message: '',
                isLoading: true
            })
        );
        console.log(`starting to login with ${email} & ${password}`);
        const response = await axios.get(
            `https://localhost:5001/api/Login?email=${email}&password=${password}`
        );
        const {login, token, error} = response.data;
        if (error) {
            dispatch(
                updateSession({
                    loggedIn: false,
                    userName: '',
                    session: '',
                    message: error,
                    isLoading: false
                })
            );
            console.log(error);
            return;
        }
        console.log(response);
        dispatch(
            updateSession({
                loggedIn: true,
                userName: login,
                session: token,
                message: 'Успешный вход',
                isLoading: false
            })
        );
        localStorage.Login = login;
        localStorage.Token = token;
        axios.defaults.headers.common.Authorization = "Bearer " + token;
    } catch (e) {
        dispatch(
            updateSession({
                loggedIn: false,
                userName: '',
                session: '',
                message: 'Ошибка при выполнение запроса',
                isLoading: false
            })
        );
        console.log("error -> ", e);
    }

};

export const thunkLogout = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch(
        updateSession({
            loggedIn: false,
            userName: '',
            session: '',
            message: '',
            isLoading: true
        })
    );
};

export const thunkLoadSubjects = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    try {
        const response = await axios.get(
            `https://localhost:5001/api/Data/GetSubjects`
        );
        console.log('thunkLoadSubjects', response);
        // const subjects: [] =response.data.map((item: string, index: number)=>
        //     <li key={item.id}>{item.name}</li>
        // );
        dispatch(
            updateSubjects({
                subjects: response.data
            })
        );
    } catch (e) {
        alert("Ошибка при выполнение запроса");
        console.log("error -> ", e);
    }

};


function exampleAPI() {
    return Promise.resolve("Async Bot");
}
