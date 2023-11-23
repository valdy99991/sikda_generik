import { Coding, Telecom, Identifier, Address, Issuer, Period } from './global';


export interface Practitioner {
    id?: string
    nik: string
    sisdmkId: string
    name: string
    birthDate: any
    nationality: string
    gender: string
    fhirGender?: Coding
    sipNumber: string
    sipIssuer: string
    position: number
    ktpAddress: Address
    ktpAddressDetail?: Address
    residenceAddress: Address
    residenceAddressDetail?: Address
    practitionerFaskes?: PractitionerFaskes[]
    contactDetail: ContactDetail
    isSameKTPResidence: boolean
    isActive: boolean
}

export interface ContactDetail {
    phone: string
    email: string
}

export interface Position {
    id: string
    code: string
    name: string
}

export interface Faskes {
    code: string
    name: string
}

export interface PractitionerFaskes {
    faskes: Faskes;
    position: Position;
    sipIssuer: string;
    sipNumber: string;
}
