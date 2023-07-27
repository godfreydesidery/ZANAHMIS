import { IDay } from "./day"
import { IInsurancePlan } from "./insurance-plan"
import { IProcedureType } from "./procedure-type"
import { IUser } from "./user"

export interface IProcedureTypeInsurancePlan {
    id      : any
    price   : number

    procedureType : IProcedureType
    insurancePlan : IInsurancePlan
    
    createdBy       : IUser
    createdOn       : IDay
    createdAt       : Date
}