import { signupVigilantSchema } from "../models/usersSchema.js";
export function validateSignUpData(req, res, next) {
    var signupData = req.body;
    console.log(signupData);
    if (!Object.keys(signupData).length)
        return res.sendStatus(400);
    var error = signupVigilantSchema.validate(signupData, { abortEarly: false }).error;
    if (error)
        return res.status(400).send(error.details);
    next();
}
