export function checkEmail(value: string) {
  // eslint-disable-next-line no-useless-escape
  const emailRegex =
    /^[a-zA-Z0-9]([a-zA-Z0-9]|[\.\-_][a-zA-Z0-9])+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9]{2,}){1,2}$/;
  return emailRegex.test(value);
}
