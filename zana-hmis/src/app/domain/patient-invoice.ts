import { IDay } from "./day"
import { IInsurancePlan } from "./insurance-plan"
import { IUser } from "./user"

export interface IPatientInvoice {
    id              : any
    no              : string
    status          : string

    insurancePlan : IInsurancePlan
    
    createdBy       : IUser
    createdOn       : IDay
    createdAt       : Date
}