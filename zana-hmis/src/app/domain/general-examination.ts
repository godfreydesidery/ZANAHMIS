import { IDay } from "./day"
import { IUser } from "./user"
import { IConsultation } from "./consultation"

export interface IGeneralExamination {
    id                  : any
    bodyMassIndex       : string
    bodySurfaceArea     :string
    height              : string
    pressure            : string
    pulseRate           : string
    respiratoryRate     : string
    saturationOxygen    : string
    temparature         : string
    weight              : string
    description         : string

    consultation        : IConsultation

    
    createdBy           : IUser
    createdOn           : IDay
    createdAt           : Date

}