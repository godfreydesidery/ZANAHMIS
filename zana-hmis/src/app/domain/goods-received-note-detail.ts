import { IGoodsReceivedNote } from "./goods-received-note"
import { IItem } from "./item"

export interface IGoodsReceivedNoteDetail {
    id            : any

    goodsReceivedNote : IGoodsReceivedNote
    
    item    : IItem
    orderedQty  : number
    receivedQty : number
    price : number
    status : string

    created     : string
    verified    : string
    approved    : string
}