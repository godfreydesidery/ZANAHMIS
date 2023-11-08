import { IItem } from "./item"
import { ILocalPurchaseOrder } from "./local-purchase-order"

export interface ILocalPurchaseOrderDetail {
    id            : any

    localPurchaseOrder : ILocalPurchaseOrder
    
    item    : IItem
    qty  : number

    created     : string
    verified    : string
    approved    : string
}