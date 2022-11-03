import { IAddressRequest } from "../address"

export interface IUserRequest {
    name: string
    email: string
    age: number
    password: string
    CPF: string
    sex: string
    isAdmin: boolean
    Address: IAddressRequest
}

export interface IUser {
    id: string
    name: string
    email: string
    age: number
    CPF: string
    sex: string
    isAdmin: boolean
    createdAt: Date
    updatedAt: Date
    Address: IAddressRequest
}

export interface IUserUpdate {
    name?: string
    email?: string
    password?: string
    age?: number
    CPF?: string
    sex?: string
    isAdmin?: boolean
    isActive?: boolean
    Address?: IAddressRequest
}
