export const enum UserErrorMessage {
  NAME_IS_STRING = 'Name must be a string',
  NAME_IS_NOT_EMPTY = 'Username must not be empty',
  AGE_IS_INTEGER = 'Age must be a number',
  MIN_AGE = 'Min age is 1 year old',
  MAX_AGE = 'Max age is 120 year old',
  EMAIL_INVALID = 'Email is invalid',
  DESCRIPTION_IS_STRING = 'Description must be a string',
}

export const enum AuthErrorMessage {
  USERNAME_IS_STRING = 'Username must be a string',
  USERNAME_IS_NOT_EMPTY = 'Username must not be empty',
  PASSWORD_IS_STRING = 'Password must be a string',
  PASSWORD_IS_NOT_EMPTY = 'Password must not be empty',
  UNAUTHORIZED = 'Unauthorized',
}
