import Joi from "joi";

export const updateContingencyUpdate = Joi.object({
    active: Joi.boolean().required(),
    situation: Joi.string().valid('OK', 'PANIC').required(),
    frequency: Joi.number()
})
