import { IDay } from "./day"
import { IUser } from "./user"

export interface IInsuranceProvider {
    id      : any
    code    : string
    name    : string
    address : string
    phone   : string
    fax     : string
    email   : string
    website : string

    
    createdBy       : IUser
    createdOn       : IDay
    createdAt       : Date
}