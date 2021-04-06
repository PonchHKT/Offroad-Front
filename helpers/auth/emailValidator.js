export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email || email.length <= 0) return "Erreur: Champs non rempli"
  if (!re.test(email)) return 'Erreur: Mauvais format de votre Email'
  return ''
}
