export type MessagesFilters = {
    agencyId: number | undefined,
    dayGte: number | undefined,
    dayLte: number | undefined,
    monthGte: number | undefined,
    monthLte: number | undefined,
    yearGte: number | undefined,
    yearLte: number | undefined,
}

export type CreateMessagesData = {
    userId: number,
    message: string
}

export type MessagesQueries = {
    agencyId: string,
    dayGte: string,
    dayLte: string,
    monthGte: string,
    monthLte: string,
    yearGte: string,
    yearLte: string,
}
