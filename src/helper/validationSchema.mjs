import Joi from "joi";

 const validation = (schemaValidation) => {
return async (req,res,next) => {
    try {
      await schemaValidation.validateAsync(req.body);
      next();
    }
    catch(erorr) {
      res.status(400).send(erorr.message)
    }
  }}

const userSchemaValidation = Joi.object({
    username : Joi.string().min(3).required(),
    email    : Joi.string().min(6).required().email(),
    password : Joi.string().min(6).required(),
});

const postSchemaValidation = Joi.object({
    title   :  Joi.string().min(3),
    content :  Joi.string().min(5),
    userId  :  Joi.number(),
})

const commentSchemaValidation = Joi.object({
    title   :  Joi.string().min(3),
    content :  Joi.string().min(5),
    userId  :  Joi.number(),
    postId  :  Joi.number(),
})

export {
    userSchemaValidation,
    postSchemaValidation,
    commentSchemaValidation,
    validation
}