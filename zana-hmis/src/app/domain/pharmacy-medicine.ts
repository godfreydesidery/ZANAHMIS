import { IMedicine } from "./medicine"
import { IPharmacy } from "./pharmacy"

export interface IPharmacyMedicine{
    id          : any
    stock       : number
    pharmacy    : IPharmacy
    medicine    : IMedicine
}