import validator from 'validator';

export const loginValidator = formData => {
  const { email, password } = formData;

  const errors = [];

  if (!validator.isEmail(email)) {
    errors.push(-3);
  }

  if (!validator.isLength(password, { min: 4 })) {
    errors.push(-4);
  }

  if (errors.length > 0) return errors;
  else return 0;
};