import { IDay } from "./day"
import { IInsurancePlan } from "./insurance-plan"
import { IUser } from "./user"

export interface IRegistrationInsurancePlan {
    id      : any
    price   : number

    insurancePlan : IInsurancePlan
    
    createdBy       : IUser
    createdOn       : IDay
    createdAt       : Date
}