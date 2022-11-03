import { date } from "yup"
import { IDoctor } from "../doctor"
import { IUser } from "../user"

export interface IScheduleRequest {
    hour: Date
    date: Date
    type: string
    description: string
    doctorsID: string
}

export interface ISchedule {
    id: string
    hour: Date
    date: Date
    type: string
    description: string
    userId: string
    doctorId: string
    createdAt: Date
    updatedAt: Date
}

