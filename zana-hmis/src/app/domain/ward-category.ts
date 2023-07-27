import { IDay } from "./day"
import { IUser } from "./user"

export interface IWardCategory {
    id      : any
    name    : string
    gender  : string
    type    : string
    
    createdBy       : IUser
    createdOn       : IDay
    createdAt       : Date
}