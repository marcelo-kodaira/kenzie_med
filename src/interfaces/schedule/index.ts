export interface IScheduleRequest {
  hour: string
  date: string
  type: string
  description: string
  doctorsID: string
}

export interface ISchedule {
  id: string
  hour: string
  date: string
  type: string
  description: string
  userId: string
  doctorId: string
  createdAt: Date
  updatedAt: Date
}

export interface IscheduleEdit {
  hour?: string
  date?: string
  type?: string
  description?: string
}
