import { IDay } from "./day"
import { IUser } from "./user"

export interface ILabTestType {
    id          : any
    code        : string
    name        : string
    description : string
    price       : string
    uom         : string
    active      : boolean
    
    createdBy       : IUser
    createdOn       : IDay
    createdAt       : Date
}