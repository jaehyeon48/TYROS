import validator from 'validator';

export const signUpValidator = formData => {
  const { firstName, lastName, email, password } = formData;

  const errors = [];

  if (firstName.trim() === '') {
    errors.push(-1);
  }

  if (lastName.trim() === '') {
    errors.push(-2);
  }

  if (!validator.isEmail(email)) {
    errors.push(-3);
  }

  if (!validator.isLength(password, { min: 4 })) {
    errors.push(-4);
  }

  if (errors.length > 0) return errors;
  else return 0;
};