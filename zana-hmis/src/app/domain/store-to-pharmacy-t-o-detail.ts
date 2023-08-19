import { IItem } from "./item"
import { IMedicine } from "./medicine"
import { IPharmacyToStoreRO } from "./pharmacy-to-store-r-o"
import { IStoreToPharmacyTO } from "./store-to-pharmacy-t-o"

export interface IStoreToPharmacyTODetail {
    id                  : any
    storeToPharmacyTO   : IStoreToPharmacyTO
    medicine            : IMedicine
    item                : IItem

    orderedPharmacySKUQty       : number
	transferedPharmacySKUQty    : number
	transferedStoreSKUQty       : number

    orderedQty  : number
    receivedQty : number

    created     : string
    verified    : string
    approved    : string
}