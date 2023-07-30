import { IAdmission } from "./admission"
import { IPatientBill } from "./patient-bill"
import { IConsultation } from "./consultation"
import { IDay } from "./day"
import { ILabTestType } from "./lab-test-type"
import { INonConsultation } from "./non-consultation"
import { IPatient } from "./patient"
import { IUser } from "./user"

export interface ILabTest {
    id      : any
    result  : string    
    range   : string
    level   : string
    unit    : string
    status  : string

    patient         : IPatient
    consultation    : IConsultation
    nonConsultation : INonConsultation
    admission       : IAdmission
    patientBill     : IPatientBill
    labTestType     : ILabTestType

    created : string
    ordered : string
    accepted : string
    rejected : string
    rejectComment : string
    collected : string
    verified : string
    
    /*createdBy       : IUser
    createdOn       : IDay
    createdAt       : Date

    orderedBy       : IUser
    orderedOn       : IDay
    orderedAt       : Date

    acceptedBy       : IUser
    acceptedOn       : IDay
    acceptedAt       : Date

    rejectedBy       : IUser
    rejectedOn       : IDay
    rejectedAt       : Date
    rejectComment    : string

    collectedBy       : IUser
    collectedOn       : IDay
    collectedAt       : Date

    verifiedBy       : IUser
    verifiedOn       : IDay
    verifiedAt       : Date*/
}