import { ErrorResponse } from "../models/response";
import { User } from "../models/user";
import { API_SERVER } from "../value-object";

interface ProfileResponse {
    username: string;
    avatar: string;
    displayname: string;
}

export function addPrivateChat() {}

export async function getProfile(id: string) {
    return fetch(`${API_SERVER}/profile/${id}`)
        .then(isOk)
        .then(handleSuccessProfile)
}

async function isOk(res: Response){
    const data = await res.json();
    if(res.ok) return data as ProfileResponse;
    else throw data as ErrorResponse;
}

async function handleSuccessProfile(profile: ProfileResponse) {
    console.log(profile);
    const user: User = {
        _id: profile.username,
        avatar: profile.avatar,
        displayName: profile.displayname
    }
    return user;
}

