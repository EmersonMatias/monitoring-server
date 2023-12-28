var EmailExist = {
    message: "Login alredy exist",
    status: 409
};
var EmailDoesntExist = {
    message: "Login doesn´t exist",
    status: 404
};
var IncorrectPassword = {
    message: "Password is incorrect",
    status: 401
};
export var Errors = {
    EmailExist: EmailExist,
    EmailDoesntExist: EmailDoesntExist,
    IncorrectPassword: IncorrectPassword
};
