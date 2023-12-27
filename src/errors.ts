const EmailExist = {
    message: "Login alredy exist",
    status: 409
}

const EmailDoesntExist = {
    message: "Login doesn´t exist",
    status: 404
}

const IncorrectPassword = {
    message: "Password is incorrect",
    status: 401
}

export const Errors = {
    EmailExist,
    EmailDoesntExist,
    IncorrectPassword
}


