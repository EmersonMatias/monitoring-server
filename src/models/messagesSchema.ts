import Joi from "joi";

export const createMessageSchema = Joi.object({
    userId: Joi.number().required(),
    agencyId: Joi.number().required(),
    message: Joi.string().required(),
    dateTime: Joi.date().required()
})

export const updateMessageSchema = Joi.object({
    response: Joi.string().required()
})