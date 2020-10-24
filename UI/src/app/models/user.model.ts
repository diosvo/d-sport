export interface UserModelServer {
    id: number
    email: string
    password: string
    firstname: string
    lastname: string
    dob: Date,
    gender: string,
    role: string,
    auth: boolean
    accessToken?: string, 
    refreshToken: string,
    role: string,
    month: string,
    year: number
}

export interface ServerResponse {
    count: number;
    users: UserModelServer[];
} 