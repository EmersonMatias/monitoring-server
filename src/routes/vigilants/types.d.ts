import { ContingencyResponse } from "../contingency/type"

export interface Vigilant {
    name: string
    dateOfBirth: Date
    rg: string
    cpf: string
    entryTime: Date
    departureTime: Date
    workOnSaturday: boolean
    workOnSunday: boolean
    agencyId: number
    login: string
    password: string
    accountType: "user" | "admin"
}


export interface VigilantBody extends Vigilant {
    frequency: number
}

export type UpdateVigilantBody = Omit<VigilantBody, 'password' | 'accountType'>

// *******************************************************************
export type VigilantResponse = {
    id: number
    name: string
    dateOfBirth: string
    rg: string
    cpf: string
    entryTime: string
    departureTime: string
    workOnSaturday: boolean
    workOnSunday: boolean
    agencyId: number
    login: string
    password: string
    accountType: "user" | "admin"
    contingency: ContingencyResponse
}

export type VigilantQuery = {
    id: number
    name: string
    dateOfBirth: Date
    rg: string
    cpf: string
    entryTime: Date
    departureTime: Date
    workOnSaturday: boolean
    workOnSunday: boolean
    agencyId: number
    login: string
    password: string
    accountType: "user" | "admin"
}
