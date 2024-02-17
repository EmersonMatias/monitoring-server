
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