import { IItem } from "./item";
import { IStore } from "./store";

export interface IStoreItem{
    store : IStore
    item : IItem
    stock : number

    minimumInventory : number
    maximumInventory : number
    defaultReorderQty : number
    defaultReorderLevel : number

    active : boolean

    sn : number

    
}