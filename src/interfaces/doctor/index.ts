import { IAddressRequest } from "../address"
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
    createdAt: Date
    updatedAt: Date
}

export interface IDoctorUpdate {
    name?: string
    email?: string
    password?: string
    age?: number
    CRM?: string
    sex?: string
    isActive?: boolean
    specialty?: ISpecialtyRequest
    Address?: IAddressRequest
}