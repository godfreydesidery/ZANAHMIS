import { IClinic } from "./clinic"
import { IDay } from "./day"
import { IInsurancePlan } from "./insurance-plan"
import { IUser } from "./user"

export interface IConsultationInsurancePlan {
    id      : any
    price   : number

    clinic : IClinic
    insurancePlan : IInsurancePlan
    
    createdBy       : IUser
    createdOn       : IDay
    createdAt       : Date
}