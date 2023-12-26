export type SignUp = {
    name: string,
    login: string,
    password: string
    rg: string,
    agency: string,
    cpf: string,
    hour: string,
    account_type: "admin" | "user"
}