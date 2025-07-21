import type { User } from "../types/User"
import { api } from "../utils/api"

const GetUsersAsync = async () => {
    return api.get<User[]>('/users')
        .then(res => res.data)
        .catch(err => console.log(err));
}

const AddUserAsync = async (user: Partial<User>) => {
    return api.post('/users', user)
        .then(res => res.data)
        .catch(err => console.log(err));
}

const UpdateUserAsync = async (userID: number, User: Partial<User>) => {
    return api.put(`/users/${userID}`, User)
        .then(res => res.data)
        .catch(err => console.log(err));
}

const DeleteUserAsync = async (userID: number) => {
    return api.delete(`/users/${userID}`)
        .then(res => res.data)
        .catch(err => console.log(err));
}

export {
    GetUsersAsync,
    AddUserAsync,
    UpdateUserAsync,
    DeleteUserAsync
}