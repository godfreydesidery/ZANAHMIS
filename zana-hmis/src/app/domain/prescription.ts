import { IAdmission } from "./admission"
import { IPatientBill } from "./patient-bill"
import { IConsultation } from "./consultation"
import { IDay } from "./day"
import { IMedicine } from "./medicine"
import { INonConsultation } from "./non-consultation"
import { IPatient } from "./patient"
import { IUser } from "./user"

export interface IPrescription {
    id          : any
    unit        : string
    dosage      : string
    frequency   : string
    route       : string
    days        : string
    price       : number
    qty         : number
    status      : string

    patient         : IPatient
    consultation    : IConsultation
    nonConsultation : INonConsultation
    admission       : IAdmission
    patientBill            : IPatientBill
    medicine        : IMedicine
    
    created : string
    ordered : string
    accepted : string
    rejected : string
    rejectComment : string
    collected : string
    verified : string
}