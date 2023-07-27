import { IPatientBill } from "./patient-bill"
import { IClinic } from "./clinic"
import { IClinician } from "./clinician"
import { IDay } from "./day"
import { IInsurancePlan } from "./insurance-plan"
import { IPatient } from "./patient"
import { IUser } from "./user"
import { IVisit } from "./visit"

export interface IConsultation {
    id              : any
    status          : string
    paymentType     : string
    membershipNo    : string

    patient         : IPatient
    bill            : IPatientBill
    clinician       : IClinician
    clinic          : IClinic
    visit           : IVisit
    insurancePlan   : IInsurancePlan
    
    createdBy       : IUser
    createdOn       : IDay
    createdAt       : Date
}