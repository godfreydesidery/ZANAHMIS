import { IDay } from "./day"
import { IUser } from "./user"

export interface IPharmacy {
    id              : any
    code            : string
    name            : string
    description     : string
    category        : string
    active          : boolean
    
    createdBy       : IUser
    createdOn       : IDay
    createdAt       : Date
}