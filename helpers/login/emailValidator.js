export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email || email.length <= 0) return "Error: Email can't be empty"
  if (!re.test(email)) return 'Error: Wrong email format'
  return ''
}
