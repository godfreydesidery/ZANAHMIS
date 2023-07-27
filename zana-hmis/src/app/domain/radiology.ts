import { Byte } from '@angular/compiler/src/util';
import { IAdmission } from "./admission"
import { IPatientBill } from "./patient-bill"
import { IConsultation } from "./consultation"
import { IDay } from "./day"
import { INonConsultation } from "./non-consultation"
import { IPatient } from "./patient"
import { IRadiologyType } from "./radiology-type"
import { IUser } from "./user"

export interface IRadiology {
    id          : any
    result      : string
    diagnosis   : string
    description : string
    attachment  : Byte[]

    patient         : IPatient
    consultation    : IConsultation
    nonConsultation : INonConsultation
    admission       : IAdmission
    bill            : IPatientBill
    radiologyType   : IRadiologyType
    
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