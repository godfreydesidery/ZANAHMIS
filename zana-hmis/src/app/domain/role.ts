import { IDay } from "./day"
import { IUser } from "./user"

export interface IRole {
    id      : any
    name    : string
    granted : boolean
    active  : boolean
    
    createdBy       : IUser
    createdOn       : IDay
    createdAt       : Date
}