import joi from 'joi';

const envSchema = joi
  .object({
    PORT: joi.number().default(3000),
    DB_URI: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),
  })
  .unknown(true);

const { value, error } = envSchema.validate(process.env, { abortEarly: false });

if (error) {
  const errorMessages = error.details
    .map((detail) => detail.message)
    .join(',\n');

  throw new Error(`Config validation error: ${errorMessages}`);
}

export const envs = {
  port: value.PORT,
  dbUri: value.DB_URI,
  jwtSecret: value.JWT_SECRET,
  jwtExpiresIn: value.JWT_EXPIRES_IN,
};
