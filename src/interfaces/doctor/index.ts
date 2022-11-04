import { IAddressRequest, IAddressUpdate } from "../address"
import { ISpecialtyRequest, ISpecialtyUpdate } from "../specialty"

export interface IDoctorRequest {
    name: string
    email: string
    password: string
    age: number
    CRM: string
    sex: string
    specialtiesId: string
    address: IAddressRequest
}

export interface IDoctor{
    id: string
    name: string
    email: string
    age: number
    CRM: string
    sex: string
    isActive: boolean
    specialtiesId: string
    createdAt: Date
    updatedAt: Date
    address: IAddressRequest
}

export interface IDoctorUpdate {
    name?: string
    email?: string
    password?: string
    age?: number
    sex?: string
    specialtiesId?: string
    address?: IAddressUpdate
}