import { IDay } from "./day"
import { IUser } from "./user"
import { IWard } from "./ward"
import { IInsurancePlan } from "./insurance-plan"

export interface IWardInsurancePlan {
    id      : any
    price   : number

    ward : IWard
    insurancePlan : IInsurancePlan
    
    createdBy       : IUser
    createdOn       : IDay
    createdAt       : Date
}