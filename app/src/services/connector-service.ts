import { ErrorResponse } from "../models/response";
import { User } from "../models/user";
import { API_SERVER } from "../value-object";
import { isLoggedIn } from "./auth-service";

interface ProfileResponse {
    username: string;
    avatar: string;
    displayname: string;
}

export async function getMyProfile() {
    const token = isLoggedIn();

    if (token) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + token.accessToken);

        return fetch(`${API_SERVER}/profile`, { headers: headers })
            .then((res) => res.json())
            .then(
                (r) =>
                    ({
                        _id: r.username,
                        avatar: r.avatar,
                        displayName: r.displayname,
                    } as User)
            );
    } else {
        throw new Error("Unauthorized");
    }
}

export async function addPrivateChat(user: User) {
    const token = isLoggedIn();
    // console.log(token);

    if (token != null) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token.accessToken);

        const raw = JSON.stringify({
            type: "private",
            to: [user._id],
            // chatName: "hello",
            // image: "img",
            // color: "red",
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        return fetch(API_SERVER + "/chats", requestOptions)
            .then((res) => {
                if (res.ok) return res.json();
                else throw res.json();
            })
            .then((result) => console.log(result));
    } else {
        throw new Error("Unauthorized");
    }
}

export async function getProfile(id: string) {
    return fetch(`${API_SERVER}/profile/${id}`)
        .then(isOk)
        .then(handleSuccessProfile)
        .then(async (user) => {
            const usr = await getMyProfile();
            if (usr._id !== user._id) {
                return user;
            }else {
                throw new Error("Searching user is yourself")
            }
        });
}

async function isOk(res: Response) {
    const data = await res.json();
    if (res.ok) return data as ProfileResponse;
    else throw data as ErrorResponse;
}

async function handleSuccessProfile(profile: ProfileResponse) {
    const user: User = {
        _id: profile.username,
        avatar: profile.avatar,
        displayName: profile.displayname,
    };
    return user;
}
