export function formatValidationEmail(email: string) {
  if (
    !email.match(
      /^[a-z][a-zA-Z0-9]*((_|\-|\.)[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/,
    )
  ) {
    alert("Formato de email inválido");
    return false;
  }
  return true;
}

export function formatValidationURL(url: string) {
  if (!url.match(/^https?:\/\/[a-zA-Z0-9][a-zA-Z0-9\_\-\.]+$/)) {
    alert("Formato de url inválido");
    return false;
  }
  return true;
}
