import { IDay } from "./day"
import { IInsurancePlan } from "./insurance-plan"
import { IPatient } from "./patient"
import { IUser } from "./user"
import { IVisit } from "./visit"
import { IWard } from "./ward"

export interface IAdmission {
    id      : any
    bedNo   : string
    status  : string

    patient         : IPatient
    visit           : IVisit
    ward            : IWard
    insurancePlan   : IInsurancePlan

    
    createdBy       : IUser
    createdOn       : IDay
    createdAt       : Date

    dischargedBy       : IUser
    dischargedOn       : IDay
    dischargedAt       : Date
}