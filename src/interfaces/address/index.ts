export interface IAddressRequest {
  district: string
  zipCode: string
  number: number
  city: string
  state: string
}

export interface IAddressUpdate {
  city?: string
  state?: string
  district?: string
  number?: number
  zipCode?: string
}
