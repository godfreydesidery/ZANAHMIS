import { IDay } from "./day"
import { IUser } from "./user"

export interface IItem {
	id                  : any
	code                : string
    barcode             : string
	name         : string
	shortName    : string
	commonName          : string
	vat                 : number
	uom                 : string
	packSize            : number
	stock               : number
	minimumInventory    : number
	maximumInventory    : number
	defaultReorderQty   : number
	defaultReorderLevel : number
	active              : boolean
	ingredients         : string

    createdBy           : IUser
    createdOn           : IDay
    createdAt           : Date
}