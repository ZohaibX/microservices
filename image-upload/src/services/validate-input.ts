import joi from 'joi';

export const validateAuthInput = (requestBody: {
  title: string;
  price: number;
}) => {
  const schema = joi.object({
    title: joi.string().max(50).min(5).required(),
    price: joi.number().integer().max(50).min(1).required(),
  });
  const validation = schema.validate(requestBody);

  if (validation.error) return validation.error.details[0].message;
  return null;
};
