import { IAdmission } from "./admission"
import { IPatientBill } from "./patient-bill"
import { IConsultation } from "./consultation"
import { IDay } from "./day"
import { INonConsultation } from "./non-consultation"
import { IPatient } from "./patient"
import { IProcedureType } from "./procedure-type"
import { IUser } from "./user"

export interface IProcedure {
    id      : any
    note    : string
    status  : string

    patient         : IPatient
    consultation    : IConsultation
    nonConsultation : INonConsultation
    admission       : IAdmission
    bill            : IPatientBill
    procedureType   : IProcedureType
    
    createdBy       : IUser
    createdOn       : IDay
    createdAt       : Date

    acceptedBy       : IUser
    acceptedOn       : IDay
    acceptedAt       : Date

    rejectedBy       : IUser
    rejectedOn       : IDay
    rejectedAt       : Date
    rejectComment    : string

    verifiedBy       : IUser
    verifiedOn       : IDay
    verifiedAt       : Date
}