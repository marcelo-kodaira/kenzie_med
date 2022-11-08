import { IAddressRequest, IAddressUpdate } from "../address"

export interface IUserRequest {
  name: string
  email: string
  age: number
  password: string
  CPF: string
  sex: string
  img: string
  isAdmin?: boolean
  address: IAddressRequest
}

export interface IUser {
  id: string
  name: string
  email: string
  age: number
  CPF: string
  sex: string
  img: string
  isAdmin: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  address: IAddressRequest
}

export interface IUserUpdate {
  name?: string
  email?: string
  password?: string
  age?: number
  sex?: string
  img?: string
  address?: IAddressUpdate
}
