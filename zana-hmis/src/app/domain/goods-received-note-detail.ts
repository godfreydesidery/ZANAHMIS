import { IGoodsReceivedNote } from "./goods-received-note"
import { IItem } from "./item"

export interface IGoodsReceivedNoteDetail {
    id            : any

    goodsReceivedNote : IGoodsReceivedNote
    
    item    : IItem
    qty  : number

    created     : string
    verified    : string
    approved    : string
}