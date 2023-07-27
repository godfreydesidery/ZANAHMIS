import { IDay } from "./day"
import { IUser } from "./user"
import { IWardCategory } from "./ward-category"

export interface IWard {
    id      : any
    code    : string
    name    : string
    price   : string
    status  : string
    active  : boolean

    wardCategory : IWardCategory
    
    createdBy       : IUser
    createdOn       : IDay
    createdAt       : Date
}