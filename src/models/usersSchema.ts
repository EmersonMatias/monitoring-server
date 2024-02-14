import Joi from "joi";

export const signupVigilantSchema = Joi.object({
    name: Joi.string().required().min(3).max(150),
    dateOfBirth:Joi.date().required(),
    rg: Joi.string().length(9).required(),
    cpf: Joi.string().length(11).required(),
    entryTime: Joi.date().required(),
    departureTime: Joi.date().required(),
    workOnSaturday: Joi.boolean().required(),
    workOnSunday: Joi.boolean().required(),
    agencyId: Joi.number().required(),
    frequency: Joi.number().required(),
    login: Joi.string().required().min(5).max(150),
    password: Joi.string().required().min(8).max(150),
    accountType: Joi.string().valid('user', 'admin').required(),
})

export const updateVigilantScema = Joi.object({
    name: Joi.string().required().min(3).max(150),
    dateOfBirth:Joi.date().required(),
    rg: Joi.string().length(9).required(),
    cpf: Joi.string().length(11).required(),
    entryTime: Joi.date().required(),
    departureTime: Joi.date().required(),
    workOnSaturday: Joi.boolean().required(),
    workOnSunday: Joi.boolean().required(),
    agencyId: Joi.number().required(),
    frequency: Joi.number().required(),
    login: Joi.string().required().min(5).max(150),
})

export const signinVigilantSchema = Joi.object({
    login: Joi.string().required().min(5).max(150),
    password: Joi.string().required().min(8).max(150),
})

export const dateSchema = Joi.date().required()

export const dateTimeSchema = Joi.date()

