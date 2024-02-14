export type CreateContingency = {
    userId: number
    timestamp: string | Date
}

export type ContingencyResponse = {
    id: number,
    active: boolean,
    timestamp: Date,
    frequency: number,
    situation: "OK" | "PANIC",
    userId: number
}