import { IGoodsReceivedNoteDetail } from "./goods-received-note-detail"
import { ILocalPurchaseOrder } from "./local-purchase-order"

export interface IGoodsReceivedNote {
    id            : any
    no            : string
    status        : string
    statusDescription : string

    orderedQty : number
    receivedQty : number

    localPurchaseOrder : ILocalPurchaseOrder

    goodsReceivedNoteDetails : IGoodsReceivedNoteDetail[]

    created     : string
    verified    : string
    approved    : string
}
    