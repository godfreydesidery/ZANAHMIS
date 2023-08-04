import { IDay } from "./day"
import { ILabTestTypeRange } from "./lab-test-type-range"
import { IUser } from "./user"

export interface ILabTestType {
    id          : any
    code        : string
    name        : string
    description : string
    price       : number
    uom         : string
    active      : boolean

    labTestTypeRanges : ILabTestTypeRange[]
    
    createdBy       : IUser
    createdOn       : IDay
    createdAt       : Date
}