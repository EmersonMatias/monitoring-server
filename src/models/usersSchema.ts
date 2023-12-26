import Joi from "joi";

export const signupVigilantSchema = Joi.object({
    name: Joi.string().required().min(3).max(150),
    login: Joi.string().required().min(5).max(150),
    password: Joi.string().required().min(8).max(150),
    rg: Joi.string().length(9).required(),
    cpf: Joi.string().length(11).required(),
    agency: Joi.string().required(),
    hour: Joi.string().pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/).required(),
    accountType: Joi.string().required()
})

export const signupAdminSchema = Joi.object({
    name: Joi.string().required().min(3).max(150),
    login: Joi.string().required().min(5).max(150),
    password: Joi.string().required().min(8).max(150),
})

