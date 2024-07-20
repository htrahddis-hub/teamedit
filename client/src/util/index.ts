export function validateEmail(email: string): boolean {
  const regexp = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return regexp.test(email);
}

export function validatePassword(password: string): boolean {
  const regexp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
  return regexp.test(password);
}

export function validateName(name: string): boolean {
  if (name.length > 0)
    return true;
  else
    return false;
}