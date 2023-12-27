export type SignUp = {
    name: string,
    dateofbirth: string,
    login: string,
    password: string
    rg: string,
    agency: string,
    cpf: string,
    entryTime: string,
    departureTime: string,
    account_type: "admin" | "user"
}