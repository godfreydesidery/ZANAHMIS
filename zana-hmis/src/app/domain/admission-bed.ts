import { IAdmission } from "./admission"
import { IPatientBill } from "./patient-bill"
import { IDay } from "./day"
import { IPatient } from "./patient"
import { IUser } from "./user"
import { IWard } from "./ward"

export interface IAdmissionBed {
    id : any

    patient     : IPatient
    ward        : IWard
    bill        : IPatientBill
    admission   : IAdmission


    openedBy       : IUser
    openedOn       : IDay
    openedAt       : Date

    closedBy       : IUser
    closedOn       : IDay
    closedAt       : Date
}