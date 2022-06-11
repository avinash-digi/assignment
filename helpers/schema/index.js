import Joi from "joi";

// Validation Cases
export const validationSchema = (action) => {
  switch (action) {
    case "SIGNUP": {
      return {
        name: Joi.string().required(),
        password: Joi.string().required(),
      };
    }
    case "LOGIN": {
      return {
        name: Joi.string().required(),
        password: Joi.string().required(),
      };
    }
  }
  return {};
};
