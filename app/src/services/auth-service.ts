import { ErrorResponse, LoginSuccessResponse } from "../models/response";
import { API_SERVER } from "../value-object";
import { getItemFromLocalStorage, setItemToLocalStorage } from "./local-storage-service";

const TOKEN_KEY = 'athlikents';

export async function login(username: string, password: string) {
    return fetch(`${API_SERVER}/account/login?username=${username}&password=${password}`)
        .then(isOk)
        .then(loginSuccessHandler);
}

function loginSuccessHandler(data: LoginSuccessResponse) {
    setItemToLocalStorage(TOKEN_KEY, data);
}

async function isOk(res: Response){
    const data = await res.json();
    if(res.ok) return data
    else throw data as ErrorResponse;
}

export async function logout() {
    localStorage.removeItem(TOKEN_KEY);
}

export function isLoggedIn() {
    return getItemFromLocalStorage<LoginSuccessResponse>(TOKEN_KEY)
}

