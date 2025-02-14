export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const PASSWORD_REGEX_ERROR =
  'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
