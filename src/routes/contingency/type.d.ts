export type CreateContingency = {
    userId: number
    timestamp: string | Date
}

export type UpdateContingencyBody = {
    active: boolean,
    situation: 'OK' | 'PANIC',
    frequency?: number
}