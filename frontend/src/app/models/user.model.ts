export interface UserModelServer {
    id: number
    email: string
    password: string
    firstname: string
    lastname: string
    dob: Date
}

export interface ServerResponse {
    users: UserModelServer[];
} 