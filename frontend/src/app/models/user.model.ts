export interface UserModelServer {
    id: number
    email: string
    password: string
    firstname: string
    lastname: string
    dob: Date,
    auth: boolean
    accessToken: string, 
    refreshToken: string
}