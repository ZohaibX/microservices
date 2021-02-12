import joi from 'joi';

export const validateInput = (requestBody: {
  token: string;
  orderId: string;
}) => {
  const schema = joi.object({
    token: joi.string().required(),
    orderId: joi.string().required(),
  });
  const validation = schema.validate(requestBody);

  if (validation.error) return validation.error.details[0].message;
  return null;
};
