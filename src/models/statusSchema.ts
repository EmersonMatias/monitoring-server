import Joi from "joi";



export const updateStatusSchema = Joi.object({
    situation: Joi.string().valid('OK', 'PANIC').required(),
})