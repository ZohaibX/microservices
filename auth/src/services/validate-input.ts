import joi from 'joi';

export const validateAuthInput = (requestBody: {
  email: string;
  password: string;
}) => {
  const schema = joi.object({
    email: joi.string().max(50).min(5).required(),
    password: joi.string().max(50).min(5).required(),
  });
  const validation = schema.validate(requestBody);

  if (validation.error) return validation.error.details[0].message;
  return null;
};
