import { IAdmission } from "./admission"
import { IPatientBill } from "./patient-bill"
import { IConsultation } from "./consultation"
import { IDay } from "./day"
import { IMedicine } from "./medicine"
import { INonConsultation } from "./non-consultation"
import { IPatient } from "./patient"
import { IUser } from "./user"
import { IInsurancePlan } from "./insurance-plan"

export interface IPrescription {
    id          : any
    unit        : string
    dosage      : string
    frequency   : string
    route       : string
    days        : string
    qty         : number
    issued      : number
    balance     : number
    stock       : number
    checked     : boolean
    status      : string

    patient         : IPatient
    consultation    : IConsultation
    nonConsultation : INonConsultation
    admission       : IAdmission
    patientBill            : IPatientBill
    medicine        : IMedicine

    insurancePlan   : IInsurancePlan
    
    created : string
    ordered : string
    accepted : string
    rejected : string
    rejectComment : string
    collected : string
    verified : string
}