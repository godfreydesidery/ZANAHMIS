import { IMedicine } from "./medicine"
import { IPharmacyToPharmacyRO } from "./pharmacy-to-pharmacy-r-o"
import { IPharmacyToPharmacyTO } from "./pharmacy-to-pharmacy-t-o"

export interface IPharmacyToPharmacyTODetail {
    id                  : any
    pharmacyToPharmacyTO   : IPharmacyToPharmacyTO
    medicine            : IMedicine

    orderedQty       : number
	transferedQty    : number

    //pharmacyToPharmacyBatches : IStoreToPharmacyBatch[]

    receivedQty : number

    created     : string
    verified    : string
    approved    : string
}