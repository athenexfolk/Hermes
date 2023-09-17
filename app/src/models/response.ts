export interface LoginSuccessResponse {
    tokenType: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number | string;
}

export interface ErrorResponse {
    error: string;
    msg: string | null;
}
