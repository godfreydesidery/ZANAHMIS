import { IPharmacyToStoreRODetail } from "./pharmacy-to-store-r-o-detail"

export interface IPharmacyToStoreRO {
    id            : any
    no            : string
    orderDate     : Date
    validUntil    : Date
    status        : string

    pharmacyToStoreRODetails : IPharmacyToStoreRODetail[]

    
    created     : string
    verified    : string
    approved    : string
}