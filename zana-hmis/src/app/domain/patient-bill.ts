import { IDay } from "./day"
import { IPatient } from "./patient"
import { IUser } from "./user"

export interface IPatientBill {
    id          : any
    description : string
    qty         : number
    amount      : number
    paid        : number
    balance     : number
    status      : string

    patient : IPatient
    
    created : string
}