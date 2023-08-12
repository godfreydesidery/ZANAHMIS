import { IAdmission } from "./admission"
import { IPatientBill } from "./patient-bill"
import { IConsultation } from "./consultation"
import { IDay } from "./day"
import { ILabTestType } from "./lab-test-type"
import { INonConsultation } from "./non-consultation"
import { IPatient } from "./patient"
import { IUser } from "./user"
import { IDiagnosisType } from "./diagnosis-type"

export interface ILabTest {
    id      : any
    result  : string
    report  : string 
    description   : string   
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
    diagnosisType   : IDiagnosisType

    created : string
    ordered : string
    accepted : string
    rejected : string
    rejectComment : string
    collected : string
    verified : string
}