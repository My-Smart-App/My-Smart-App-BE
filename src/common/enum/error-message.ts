export const enum UserErrorMessage {
  NAME_IS_STRING = 'name_must_be_string',
  NAME_IS_NOT_EMPTY = 'name_must_not_be_empty',
  AGE_IS_INTEGER = 'age_must_be_a_number',
  MIN_AGE = 'min_age_is_one_year_old',
  MAX_AGE = 'mmx_age_is_120_year_old',
  EMAIL_INVALID = 'email_is_invalid',
  DESCRIPTION_IS_STRING = 'discription_must_be_string',
}

export const enum AuthErrorMessage {
  USERNAME_IS_STRING = 'username_must_be_string',
  USERNAME_IS_NOT_EMPTY = 'username_must_not_be_empty',
  PASSWORD_IS_STRING = 'password_must_be_string',
  PASSWORD_IS_NOT_EMPTY = 'password_must_not_be_empty',
  UNAUTHORIZED = 'unauthorized',
}
