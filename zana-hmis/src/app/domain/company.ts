//import { Byte } from '@angular/compiler/src/util';

export interface ICompany {
    name            : string
    //logo            : Byte[]
    contactName     : string
    vrn             : string
    tin             : string
    physicalAddress : string
    postalAddress   : string
    postCode        : string
    telephone       : string
    fax             : string
    email           : string
    website         : string

    bankName        : string
    bankAccountNo   : string
    bankAccountName : string

    registrationFee : number
}