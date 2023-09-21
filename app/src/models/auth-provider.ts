import { User } from "./user";

export interface IAuthProvider {
    user: User | null,
    setUser: () => void,
    loginStatus: boolean
}
