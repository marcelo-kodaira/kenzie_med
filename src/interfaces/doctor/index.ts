import { IAddressRequest, IAddressUpdate } from "../address"
import { ISpecialtyRequest } from "../specialty"

export interface IDoctorRequest {
    name: string
    email: string
    password: string
    age: number
    crm: string
    sex: string
    specialty: ISpecialtyRequest
    address: IAddressRequest
}

export interface IDoctor{
    id: string
    name: string
    email: string
    age: number
    crm: string
    sex: string
    isActive: boolean
    specialtiesId: number
    createdAt: Date
    updatedAt: Date
}

export interface IDoctorUpdate {
    name?: string
    email?: string
    password?: string
    age?: number
    sex?: string
    specialtiesId?: number
    address?: IAddressUpdate
}